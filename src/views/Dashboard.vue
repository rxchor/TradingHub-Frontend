<script setup>
import { ref, onMounted, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductosService from '@/services/ProductosService.js'
import SearchBar from '@/components/SearchBar.vue'
import AlertService from '@/services/AlertService'
import { useRouter } from 'vue-router'
import { useProductoStore } from '@/stores/ProductoStore.js'
import AuthService from '@/services/AuthService.js'


const {isLoggedIn} = AuthService
const router = useRouter()
// Estado reactivo para guardar los productos
const products = ref([])
// Texto reactivo que va a escribir el usuario en la barra de búsqueda
const searchQuery = ref('')
// Se ejecuta cuando se monta el componente
onMounted(() => {
  fetchProducts()
})

// Función para obtener productos
const fetchProducts = async () => {
  try {
    const response = await ProductosService.getDisponibles()
    console.log(response.data)
    products.value = response.data
  } catch (error) {
    if (!error._handled) {
      await AlertService.showAlert(
        'Error al cargar productos',
        'No se pudo cargar la lista de productos.Es posible que haya un problema en el servidor, por favor, intenta más tarde.',
        'error',
      )
    }
  }
}
// Productos filtrados según la búsqueda
const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  let filteredProductsList = products.value
    .filter((product) => !product.noDisponible)
    .filter(
      (product) =>
        product.nombre.toLowerCase().includes(query) ||
        product.categoria.toLowerCase().includes(query),
    )
  if (isLoggedIn && AuthService.getUserIdFromToken()) {
    filteredProductsList = filteredProductsList.filter((product) =>
      product.idVendedor !== AuthService.getUserIdFromToken());
  }
  return filteredProductsList;
})

const goToProductDetail = (id) => {
  const productStore = useProductoStore()
  productStore.setProducto(id)
  router.push('/producto')
}
</script>

<template>
  <div class="min-h-screen bg-midnight-900 text-midnight-50 flex flex-col">
    <!-- Main Content -->
    <main class="flex-1 p-6">
      <h2 class="text-xl font-semibold mb-6">Productos</h2>

      <!-- Barra de búsqueda -->
      <SearchBar v-model="searchQuery" />

      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :producto="product"
          @card-click="goToProductDetail"
        />
      </div>
    </main>
  </div>
</template>
