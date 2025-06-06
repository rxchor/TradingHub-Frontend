<script setup>
import { RouterLink, useRouter } from 'vue-router'
import AuthService from '@/services/AuthService'

const router = useRouter()
const { isLoggedIn } = AuthService

const gotologin = () => router.push('/login')
const gotoregister = () => router.push('/register')

const cerrarSesion = () => {
  AuthService.logout()
  router.push('/')
}
</script>

<template>
  <header
    class="fixed top-0 left-0 h-20 w-full z-20 bg-midnight-800 border-b-4 border-midnight-950 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto p-4 flex justify-between items-center"
  >
    <div class="flex items-center space-x-4">
      <!-- Deberiamos de poner otra imagen pero si, por ahora se queda asi :p -->
      <img src="/logo.png" alt="logo" class="h-20 w-auto object-cover object-center" />

      <h1 class="text-2xl font-bold text-crimson-500">Trading Hub</h1>

      <RouterLink to="/">
        <button
          class="shadow-xl px-4 py-2 text-sm font-medium tracking-wide rounded transition text-midnight-50 hover:bg-midnight-850 focus:outline-none"
        >
          Inicio
        </button>
      </RouterLink>

      <RouterLink to="/subir-producto" v-if="isLoggedIn">
        <button
          class="shadow-xl px-4 py-2 text-sm font-medium tracking-wide rounded transition text-midnight-50 hover:bg-midnight-850 focus:outline-none"
        >
          Subir Producto
        </button>
      </RouterLink>

      <RouterLink to="/trueque" v-if="isLoggedIn">
        <button
          class="shadow-xl px-4 py-2 text-sm font-medium tracking-wide rounded transition text-midnight-50 hover:bg-midnight-850 focus:outline-none"
        >
          Mis trueques
        </button>
      </RouterLink>

      <RouterLink to="/mis-productos" v-if="isLoggedIn">
        <button
          class="shadow-xl px-4 py-2 text-sm font-medium tracking-wide rounded transition text-midnight-50 hover:bg-midnight-850 focus:outline-none"
        >
          Mis productos
        </button>
      </RouterLink>
    </div>

    <!-- Contenedor derecho: botones -->
    <div class="flex items-center space-x-2">
      <button
        v-if="!isLoggedIn"
        @click="gotologin"
        class="shadow-xl px-4 py-2 text-sm font-medium tracking-wide rounded transition text-midnight-50 bg-crimson-700 hover:bg-crimson-800 focus:outline-none"
      >
        Iniciar sesión
      </button>

      <button
        v-if="!isLoggedIn"
        @click="gotoregister"
        class="shadow-xl px-4 py-2 text-sm font-medium tracking-wide rounded transition text-midnight-50 bg-crimson-700 hover:bg-crimson-800 focus:outline-none"
      >
        Registrarse
      </button>

      <RouterLink to="/change-password" v-if="isLoggedIn">
        <button
          class="shadow-xl px-4 py-2 text-sm font-medium tracking-wide rounded transition text-midnight-50 hover:bg-midnight-850 focus:outline-none"
        >
          Cambiar contraseña
        </button>
      </RouterLink>
      <button
        v-if="isLoggedIn"
        @click="cerrarSesion"
        class="shadow-xl px-4 py-2 text-sm font-medium tracking-wide rounded transition text-midnight-50 bg-crimson-700 hover:bg-crimson-800 focus:outline-none"
      >
        Cerrar sesión
      </button>
    </div>
  </header>
</template>
