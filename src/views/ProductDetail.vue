<template>
  <div class="min-h-screen flex flex-col bg-midnight-900 text-midnight-50">
    <div class="max-w-7xl w-full mx-auto px-6 py-12">
      <h2 class="text-4xl font-bold text-center mb-12">Detalles del Producto</h2>

      <div
        v-if="producto"
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-midnight-800 border-4 border-midnight-950 rounded-2xl p-10 shadow-2xl"
      >
        <!-- Carrusel de imágenes -->
        <div class="relative w-full h-[500px]">
          <img
            :src="`http://localhost:8081/images/${producto.fotos[currentIndex]}`"
            :alt="producto.nombre"
            class="w-full h-full object-cover rounded-xl transition duration-300 shadow-md"
          />

          <!-- Flechas -->
          <button
            v-if="producto.fotos.length > 1 && currentIndex > 0"
            @click="prevImage"
            class="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white text-xl px-3 py-1 rounded-full"
          >
            ‹
          </button>
          <button
            v-if="producto.fotos.length > 1 && currentIndex < producto.fotos.length - 1"
            @click="nextImage"
            class="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white text-xl px-3 py-1 rounded-full"
          >
            ›
          </button>
        </div>

        <!-- Información -->
        <div class="flex flex-col justify-between">
          <div class="space-y-6">
            <div>
              <h3 class="text-4xl font-bold text-white mb-2">{{ producto.nombre }}</h3>
            </div>

            <!-- Descripción con label -->
            <div>
              <p class="text-sm font-semibold uppercase text-crimson-500 tracking-wide mb-1">Descripción:</p>
              <p class="text-lg leading-relaxed text-midnight-100 bg-midnight-850 p-4 rounded-xl shadow-inner">
                {{ producto.descripcion }}
              </p>
            </div>

            <!-- Categoría con label -->
            <div>
              <p class="text-sm font-semibold uppercase text-crimson-500 tracking-wide mb-3">Categoría:</p>
              <p class="text-base text-midnight-50 font-medium bg-crimson-700 p-2 px-4 inline-block rounded-full shadow-sm">
                {{ producto.categoria }}
              </p>
            </div>
          </div>

          <!-- Acciones -->
          <div class="flex flex-col gap-5 mt-10">
            <div class="w-full">
              <button
                v-if="isLoggedIn && !isProductFromLoggedUser()"
                class="w-full bg-crimson-600 hover:bg-crimson-700 text-white text-lg font-semibold py-3 rounded-xl shadow transition"
                @click="OfertaModalService.showModal(producto)"
              >
                Ofertar
              </button>
              <!--
              <div
                v-else
                class="w-full bg-crimson-600 text-white text-lg font-semibold py-3 rounded-xl flex items-center justify-center cursor-not-allowed opacity-60"
                title="No puedes ofertar por tu propio producto"
              >
                No puedes ofertar por tu propio producto
              </div>
              -->

              <button
                v-else
                class="w-full bg-crimson-600 hover:bg-crimson-700 text-white text-lg font-semibold py-3 rounded-xl shadow transition"
                @click="borrarProducto()"
              >
                Borrar producto
              </button>
            </div>
            <a v-if="isLoggedIn && !isProductFromLoggedUser()" @click="reportarProducto" class="text-sm text-crimson-500 hover:underline text-right cursor-pointer">
              Reportar producto
            </a>
          </div>
        </div>

      </div>
      <div v-else class="text-center py-10">
        <p class="text-lg text-midnight-50">Cargando producto...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductoStore } from '@/stores/ProductoStore.js'
import ProductosService from '@/services/ProductosService'
import OfertaModalService from '@/services/OfertaModalService'
import AuthService from '@/services/AuthService.js'
import { useReporteStore } from '@/stores/ReporteStore.js'
import AlertService from '@/services/AlertService.js'

const store = useProductoStore()
const id = computed(() => store.id)

const router = useRouter()
const producto = ref(null)
const currentIndex = ref(0)

const { isLoggedIn } = AuthService

const isProductFromLoggedUser = () => {
  if (isLoggedIn && producto) {
    return producto.value.idVendedor === AuthService.getUserIdFromToken()
  }
  return false
}

onMounted(async () => {
  try {
    const response = await ProductosService.getById(id.value)
    producto.value = response.data
  } catch (err) {
    console.error('Error al cargar producto:', err)
  }
})

const reportarProducto = () => {
  const store = useReporteStore()
  store.setReporte('producto', producto.value.id, producto.value.idVendedor)
  router.push('/reportar')
}

const nextImage = () => {
  if (producto.value && currentIndex.value < producto.value.fotos.length - 1) {
    currentIndex.value++
  }
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const borrarProducto = () => {
  AlertService.showConfirm('Borrado de producto', '¿Estás seguro de que desea borrar el producto?\n esta acción es irreversible.')
    .then( (confirmed) => {
        if (confirmed) {
          ProductosService.changeDisponible(producto.value.id, false)
          .then(() => {
            AlertService.showAlert('Borrado', 'Producto borrado con éxito', 'success')
              .then(() => {
                router.push('/mis-productos');
              })
          })
        }
      }
    )
}
</script>
