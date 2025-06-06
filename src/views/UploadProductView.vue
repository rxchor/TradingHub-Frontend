<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import AuthService from '@/services/AuthService.js'
import MediaService from '@/services/MediaService.js'
import TextField from '@/components/TextField.vue'
import FileDrop from '@/components/FileDrop.vue'
import ProductosService from '@/services/ProductosService.js'
import AlertService from '@/services/AlertService'
import CategoriaService from '@/services/CategoriaService.js'

const router = useRouter()

const nombre = ref('')
const descripcion = ref('')
const fotos = ref([])
const categorias = ref([])
const categoriaSeleccionada = ref('')

onMounted(async () => {
  try {
    const response = await CategoriaService.getAll()
    categorias.value = response.data
  } catch (error) {
    AlertService.showAlert("ERROR", "Error al cargar las categorias:\n" + error.message, "error")
  }
})

const handleSubmit = async () => {
  try {
    console.log('Fotos: ', fotos.value)

    const fotosResponse = await MediaService.uploadMany(fotos.value)

    const fotosSubidas = fotosResponse.data.fotos

    const payload = {
      nombre: nombre.value,
      descripcion: descripcion.value,
      categoria: categoriaSeleccionada.value,
      fotos: fotosSubidas,
      idVendedor: AuthService.getUserIdFromToken(),
    }

    await ProductosService.save(payload)
    await AlertService.showAlert(
      'Producto registrado',
      'El producto ha sido registrado correctamente',
      'success',
    )
    await router.push('/')
  } catch (error) {
    await AlertService.showAlert(
      'Error al registrar el producto',
      error.response.data.messages.join('\n'),
      'error',
    )
  }
}

const gotodashboard = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-midnight-900">
    <div class="max-w-6xl w-full mx-auto p-10 mt-10">
      <form @submit.prevent="handleSubmit">
        <h2 class="text-4xl text-midnight-50 font-bold text-center mb-10">Formulario subida de producto</h2>


        <div
          class="border-4 bg-midnight-800 border-midnight-950 rounded-lg p-10 w-full max-w-5xl mx-auto shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] grid sm:grid-cols-2 gap-10"
        >
          <TextField
            name="nombre"
            type="text"
            label="Nombre"
            placeholder="Introducir nombre"
            v-model="nombre"
          >
          </TextField>

          <div>
            <label for="categoria" class="text-crimson-500 text-sm font-medium mb-2 block">
              Categoría
            </label>
            <div class="relative flex items-center">
              <select
                id="categoria"
                v-model="categoriaSeleccionada"
                required
                class="w-full text-sm text-midnight-50 border-2 border-midnight-950 pl-4 pr-10 py-3 rounded-lg outline-crimson-600 bg-midnight-850 placeholder-midnight-50 appearance-none"
              >
                <option disabled value="">Selecciona una categoría</option>
                <option v-for="cat in categorias" :key="cat.id" :value="cat.nombreCategoria">
                  {{ cat.nombreCategoria }}
                </option>
              </select>
              <svg
                class="absolute right-4 pointer-events-none w-4 h-4 text-midnight-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <!-- Campo Nombre centrado y más pequeño -->
          <div class="col-span-2 flex justify-center">
            <TextField
              class="w-full"
              name="descripcion"
              type="text"
              label="Descripcion"
              placeholder="Introducir descripcion"
              v-model="descripcion"
              multiline
            >
            </TextField>
          </div>

          <!-- Campo Nombre centrado y más pequeño -->
          <div class="col-span-2 flex justify-center">
            <FileDrop class="w-full" :v-model="fotos" @update:modelValue="fotos = $event" />
          </div>

          <div class="col-span-2 w-full flex justify-center gap-6 flex-wrap">
            <button
              type="submit"
              class="py-4 px-10 text-sm font-medium tracking-wider rounded text-midnight-50 bg-crimson-700 hover:bg-crimson-800 focus:outline-none"
            >
              Subir
            </button>
            <button
              type="button"
              class="py-4 px-10 text-sm font-medium tracking-wider rounded text-midnight-50 bg-crimson-700 hover:bg-crimson-800 focus:outline-none"
              @click="gotodashboard"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
