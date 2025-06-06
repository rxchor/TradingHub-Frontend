import { createRouter, createWebHistory } from 'vue-router'
import AuthService from '@/services/AuthService.js'
import UsuarioService from '@/services/UsuarioService.js'
import { usePenalizacionStore } from '@/stores/PenalizacionStore.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/SignUpView.vue'),
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import('../views/ChangePasswordView.vue'),
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/subir-producto',
      name: 'subir-producto',
      component: () => import('../views/UploadProductView.vue'),
    },
    {
      path: '/trueque',
      name: 'trueque',
      component: () => import('../views/TruequeView.vue'),
    },
    {
      path: '/producto',
      name: 'product-detail',
      component: () => import('../views/ProductDetail.vue'),
    },
    {
      path: '/reportar',
      name: 'report-form',
      component: () => import('../views/ReporteView.vue'),
    },
    {
      path: '/penalizacion',
      name: 'penalizacion-notify',
      component: () => import('../views/PenalizacionView.vue'),
    },
    {
      path: '/mis-productos',
      name: 'mis-productos',
      component: () => import('../views/MisProductosView.vue'),
    },
  ],
})

// Global guard
router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login', '/register', '/forgot-password', '/']
  const authRequired = !publicPages.includes(to.path)

  if (to.path !== '/penalizacion' && await isUserBanned()) {
    return next('/penalizacion')
  }

  // Ya que el login es publico hay que hacer la comprobación ya que
  // segun el usuario esté logado o no, la pagina interactua de una forma u otra
  if (to.path === '/') {
    if (!isTokenValid()) {
      AuthService.logout()
    }
  }

  // para los demas
  if (authRequired && !isTokenValid()) {
    AuthService.logout()
    return next('/login')
  }

  next()
})

function isTokenValid() {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const now = Math.floor(Date.now() / 1000)

    return payload.exp && payload.exp > now
  } catch {
    return false
  }
}


async function isUserBanned() {
  if (!isTokenValid()) return false

  const penalizacionStore = usePenalizacionStore()
  const localPenalizacion = penalizacionStore.penalizacion

  if (await checkPenalizacion(localPenalizacion)) {
    return true
  }

  try {
    const response = await UsuarioService.getById(AuthService.getUserIdFromToken())
    const serverPenalizacion = response.data.penalizacion

    if (await checkPenalizacion(serverPenalizacion)) {
      penalizacionStore.setPenalizacion(serverPenalizacion)
      return true
    }
  } catch (error) {
    console.error('Error comprobando penalización:', error)
  }

  return false
}

async function checkPenalizacion(penalizacion) {
  if (!penalizacion) return false

  const now = new Date()

  // Baneo permanente
  if (penalizacion.fechaFin == null) {
    return true
  }

  const fechaFin = new Date(penalizacion.fechaFin)

  // Penalización activa
  if (fechaFin > now) {
    return true
  }

  // Penalización expirada, eliminarla
  try {
    await UsuarioService.deletePenalizacion(AuthService.getUserIdFromToken())
  } catch (error) {
    console.error('Error eliminando penalización expirada:', error)
  }

  return false
}

export default router
