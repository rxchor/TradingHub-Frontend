<script setup>
import { ref, onMounted, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductosService from '@/services/ProductosService.js'
import AlertService from '@/services/AlertService'
import { useRouter } from 'vue-router'
import AuthService from '@/services/AuthService'
import { useProductoStore } from '@/stores/ProductoStore.js'
import SearchBar from '@/components/SearchBar.vue'

const router = useRouter()
const products = ref([])
const searchQuery = ref('')

onMounted(() => {
  fetchUserProducts()
})

const fetchUserProducts = async () => {
  try {
    const response = await ProductosService.getDisponibles()
    const userId = AuthService.getUserIdFromToken()

    // Filtrar productos que pertenecen al usuario loggeado
    products.value = response.data.filter((product) => product.idVendedor === userId)
  } catch (error) {
    if (!error._handled) {
      await AlertService.showAlert(
        'Error al cargar tus productos',
        'No se pudieron cargar tus productos. Por favor, intenta más tarde.',
        'error',
      )
    }
  }
}

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  return products.value
    .filter((product) => !product.noDisponible)
    .filter(
      (product) =>
        product.nombre.toLowerCase().includes(query) ||
        product.categoria.toLowerCase().includes(query),
    )
})

const goToProductDetail = (id) => {
  const productStore = useProductoStore()
  productStore.setProducto(id)
  router.push('/producto')
}
</script>

<template>
  <div class="min-h-screen bg-midnight-900 text-midnight-50 flex flex-col">
    <main class="flex-1 p-6">
      <h2 class="text-xl font-semibold mb-6">Mis Productos</h2>

      <SearchBar v-model="searchQuery" />

      <div
        v-if="filteredProducts.length"
        class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :producto="product"
          @card-click="goToProductDetail"
        />
      </div>

      <div v-else class="text-center text-gray-400 mt-10">
        No tienes productos que coincidan con la búsqueda.
      </div>
    </main>
  </div>
</template>
