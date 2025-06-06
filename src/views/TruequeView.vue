<template>
  <div class="flex h-screen bg-midnight-900 text-midnight-50">
    <!-- Sidebar de trueques -->
    <aside class="w-full max-w-xs border-r border-midnight-800 overflow-y-auto">
      <div class="p-4 font-bold text-crimson-500 text-xl">Trueques</div>
      <ul>
        <li
          v-for="(trueque, i) in trueques"
          :key="trueque.id"
          @click="seleccionarTrueque(trueque)"
          class="flex items-center gap-3 p-4 border-b border-crimson-800 cursor-pointer hover:bg-midnight-800 transition"
          :class="{
            'bg-midnight-800': selectedTrueque?.id === trueque.id,
            'border-t': i === 0,
          }"
        >
          <img
            :src="'http://localhost:8081/images/' + trueque.imagenPreview"
            alt="producto"
            class="w-12 h-12 object-cover rounded"
          />
          <div class="flex flex-col">
            <span class="font-semibold text-md truncate">{{
              construirNombreTrueque(trueque)
            }}</span>
            <!--
            <span class="text-xs text-midnight-200 truncate"
              >{{ trueque.ultimoMensaje }}</span
            >
            -->
          </div>
        </li>
      </ul>
    </aside>

    <!-- Sección principal con chat (centro) + productos (derecha) -->
    <section class="flex flex-1">
      <!-- Panel central con título, chat y botones -->
      <div class="flex flex-col flex-1">
        <!-- Título y estado -->
        <div
          class="p-4 border-b border-midnight-800 font-semibold flex items-center justify-between"
        >
          <span>{{ selectedTrueque?.nombreTrueque || 'Selecciona un trueque' }}</span>
          <span
            v-if="selectedTrueque"
            :class="['uppercase text-sm font-bold', estadoColor[selectedTrueque.estado]]"
          >
            {{ selectedTrueque.estado }}
          </span>
        </div>

        <!-- Chat -->
        <div class="flex-1 overflow-y-auto">
          <ChatComponent v-if="selectedTrueque" :selectedTrueque="selectedTrueque" />
        </div>
      </div>

      <!-- Panel lateral derecho con productos -->
      <aside
        v-if="selectedTrueque"
        class="w-80 border-l border-midnight-800 p-4 flex flex-col gap-6 overflow-y-auto"
      >
        <!-- Contenido scrollable -->
        <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          <div>
            <h3 class="text-crimson-500 font-bold mb-1">Tu oferta</h3>
            <p class="text-sm text-midnight-200 mb-2">Productos que ofreces</p>
            <div class="border border-midnight-700 p-2 rounded min-h-[120px]">
              <div v-if="productosOfrecidos.length" class="grid grid-cols-1 gap-3">
                <div
                  v-for="prod in productosOfrecidos"
                  :key="prod.id"
                  class="flex items-center gap-2 bg-midnight-800 p-2 rounded shadow"
                >
                  <img
                    :src="'http://localhost:8081/images/' + prod.fotos[0]"
                    alt="Producto"
                    class="w-12 h-12 object-cover rounded border border-midnight-700"
                  />
                  <span class="text-sm text-midnight-50 font-medium truncate">{{ prod.nombre }}</span>
                </div>
              </div>
              <p v-else class="text-sm text-midnight-400 italic">Cargando...</p>
            </div>
          </div>

          <div>
            <h3 class="text-crimson-500 font-bold mb-1">
              Oferta de {{ nombreOtroUsuario || 'el otro usuario' }}
            </h3>
            <p class="text-sm text-midnight-200 mb-2">Productos que recibes</p>
            <div class="border border-midnight-700 p-2 rounded min-h-[120px]">
              <div v-if="productosRecibidos.length" class="grid grid-cols-1 gap-3">
                <div
                  v-for="prod in productosRecibidos"
                  :key="prod.id"
                  class="flex items-center gap-2 bg-midnight-800 p-2 rounded shadow"
                >
                  <img
                    :src="'http://localhost:8081/images/' + prod.fotos[0]"
                    alt="Producto"
                    class="w-12 h-12 object-cover rounded border border-midnight-700"
                  />
                  <span class="text-sm text-midnight-50 font-medium truncate">{{ prod.nombre }}</span>
                </div>
              </div>
              <p v-else class="text-sm text-midnight-400 italic">Cargando...</p>
            </div>
          </div>
        </div>


        <!-- Botones condicionales según si es vendedor o interesado -->
        <div
          v-if="selectedTrueque"
          class="flex justify-center gap-4 p-4 border-t border-midnight-800"
        >
          <template v-if="soyVendedor && selectedTrueque.estado === 'PENDIENTE'">
            <button
              class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
              @click="aceptarTrueque"
            >
              Aceptar
            </button>
            <button
              class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
              @click="rechazarTrueque"
            >
              Rechazar
            </button>
          </template>
          <template v-else-if="!soyVendedor && selectedTrueque.estado === 'PENDIENTE'">
            <button
              class="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded transition"
              @click="rechazarTrueque"
            >
              Cancelar
            </button>

          </template>
        </div>
        <div class="flex justify-center">
          <a v-if="selectedTrueque" @click="reportarTrueque" class="font-bold text-crimson-500 hover:underline text-right cursor-pointer" >Reportar trueque</a>
        </div>


      </aside>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import TruequeService from '@/services/TruequeService'
import AuthService from '@/services/AuthService.js'
import ChatComponent from '@/components/ChatComponent.vue'
import ProductoService from '@/services/ProductosService'
import UsuarioService from '@/services/UsuarioService.js'
import AlertService from '@/services/AlertService.js'
import { useReporteStore } from '@/stores/ReporteStore.js'
import router from '@/router/index.js'
const estadoColor = {
  ACEPTADO: 'text-green-500',
  PENDIENTE: 'text-yellow-400',
  RECHAZADO: 'text-red-500',
}

const productosOfrecidos = ref([])
const productosRecibidos = ref([])
const soyVendedor = ref(false)
const nombreOtroUsuario = ref('')
const trueques = ref([])
const selectedTrueque = ref(null)

const idOtroVendedor = ref('')

watch(selectedTrueque, async (nuevo) => {
  productosOfrecidos.value = []
  productosRecibidos.value = []
  nombreOtroUsuario.value = ''

  if (!nuevo) return

  soyVendedor.value = nuevo.idVendedor === userId

  const idsOfrecidos = soyVendedor.value ? nuevo.idsProductosVendedor : nuevo.idsProductosInteresado
  const idsRecibidos = soyVendedor.value ? nuevo.idsProductosInteresado : nuevo.idsProductosVendedor
  idOtroVendedor.value = soyVendedor.value ? nuevo.idInteresado : nuevo.idVendedor
  const response = await UsuarioService.getById(idOtroVendedor.value).then((res) => res.data)

  nombreOtroUsuario.value = response.username

  productosOfrecidos.value = await Promise.all(
    idsOfrecidos.map((id) => ProductoService.getById(id).then((res) => res.data)),
  )
  productosRecibidos.value = await Promise.all(
    idsRecibidos.map((id) => ProductoService.getById(id).then((res) => res.data)),
  )
})

const seleccionarTrueque = (trueque) => {
  selectedTrueque.value = trueque
}

const userId = AuthService.getUserIdFromToken()

const aceptarTrueque = async () => {
  if (!selectedTrueque.value) return
  try {
    const response = await TruequeService.accept(selectedTrueque.value.id)
    selectedTrueque.value.estado = response.data.estado
    AlertService.showAlert("Aceptado", "Se ha aceptado el trueque.")
  } catch (err) {
    console.error('Error al aceptar trueque:', err)
  }
}

const rechazarTrueque = async () => {
  if (!selectedTrueque.value) return
  try {
    const response = await TruequeService.reject(selectedTrueque.value.id)
    selectedTrueque.value.estado = response.data.estado
    AlertService.showAlert("Rechazado", "Se ha rechazado el trueque.")
  } catch (err) {
    console.error('Error al rechazar trueque:', err)
  }
}

const reportarTrueque = () => {
  const store = useReporteStore()
  store.setReporte('trueque', selectedTrueque.value.id, idOtroVendedor.value)
  router.push('/reportar')
}

const fetchTrueques = async () => {
  try {
    const response = await TruequeService.getByUsuario(userId)
    const truequesData = response.data

    // Para cada trueque, obtenemos los nombres de los productos ofrecidos/recibidos
    for (const t of truequesData) {
      // Cargar primer producto de cada lado
      const productoVendedor = await ProductoService.getById(t.idsProductosVendedor[0]).then(
        (res) => res.data,
      )
      const productoInteresado = await ProductoService.getById(t.idsProductosInteresado[0]).then(
        (res) => res.data,
      )

      // Añadir los nombres a los objetos
      t.nombreProductoVendedor = productoVendedor?.nombre || 'Producto'
      t.nombreProductoInteresado = productoInteresado?.nombre || 'Producto'

      // Opcional: asegurarte que haya imagenPreview para mostrar en la lista
      t.imagenPreview = productoVendedor?.fotos?.[0] || productoInteresado?.fotos?.[0] || ''
    }

    trueques.value = truequesData
  } catch (err) {
    console.error('Error al obtener trueques:', err)
  }
}
const construirNombreTrueque = (trueque) => {
  const esVendedor = trueque.idVendedor === userId
  const nombreOfrecido = esVendedor
    ? trueque.nombreProductoVendedor
    : trueque.nombreProductoInteresado
  const nombreRecibido = esVendedor
    ? trueque.nombreProductoInteresado
    : trueque.nombreProductoVendedor

  return `Das: ${nombreOfrecido} → Recibes: ${nombreRecibido}`
}

onMounted(() => {
  fetchTrueques()
})

//Par debuguear la imagenPreview
/*
watchEffect(() => {
  if (trueques.value.length > 0 && trueques.value[0]?.imagenPreview) {
    console.log('Preview imagen:', trueques.value[0].imagenPreview)
  }
})
 */
</script>
