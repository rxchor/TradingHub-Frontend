<template>
  <div
    v-if="OfertaModalService.show.value"
    class="fixed inset-0 z-40 bg-black/60 flex items-center justify-center"
  >
    <div
      class="w-[90%] max-w-6xl bg-midnight-800 text-midnight-50 rounded-xl shadow-lg border border-midnight-950 overflow-hidden"
    >
      <!-- Header -->
      <div
        class="px-6 py-4 bg-midnight-900 border-b border-midnight-950 flex justify-between items-center"
      >
        <h2 class="text-xl font-semibold">Realizar Oferta</h2>
        <button @click="close" class="text-midnight-50 hover:text-white">
          ✕
        </button>
      </div>

      <div class="flex">
        <!-- Left: Inventory -->
        <div class="w-1/2 border-r border-gray-700 p-4 flex flex-col">
          <div class="flex mb-3">
            <button
              class="flex-1 py-2"
              :class="mostrarInventarioInteresado ? 'bg-crimson-800' : 'bg-crimson-700'"
              @click="mostrarInventarioInteresado = true"
            >
              Tu inventario
            </button>
            <button
              class="flex-1 py-2"
              :class="!mostrarInventarioInteresado ? 'bg-crimson-800' : 'bg-crimson-700'"
              @click="mostrarInventarioInteresado = false"
            >
              Inventario de {{ OfertaModalService.usuario_vendedor.value.username }}
            </button>
          </div>

          <div
            class="bg-midnight-950 border border-midnight-950 rounded p-2 overflow-y-auto h-[580px]"
          >
            <div class="grid grid-cols-5 gap-2">
              <!--
              <div
                v-for="producto in inventarioActual"
                :key="producto.id"
                class="aspect-square bg-[#2e2e2e] border border-gray-700 rounded flex items-center justify-center text-xs text-midnight-50 text-center p-1 cursor-pointer"
                @click.prevent="agregarProducto(producto)"
              >

                <img
                  :src="'http://localhost:8081/images/' + producto.fotos[0]"
                  :alt="producto.nombre"
                  class="w-full h-full object-cover object-center"
                />
              </div>
              -->
              <div
                v-for="producto in inventarioActual"
                :key="producto.id"
                @click.prevent="agregarProducto(producto)"
                class="relative aspect-square bg-midnight-850 border border-gray-700 rounded-lg overflow-hidden shadow cursor-pointer hover:ring-2 hover:ring-crimson-500 transition-all"
              >
                <img
                  :src="'http://localhost:8081/images/' + producto.fotos[0]"
                  :alt="producto.nombre"
                  class="w-full h-full object-cover object-center"
                />
                <div
                  class="absolute bottom-0 w-full bg-black/60 text-center text-xs text-midnight-50 py-1 px-2 truncate"
                >
                  {{ producto.nombre }}
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3 flex gap-2">
            <TextField
              no-label
              placeholder="Buscar producto..."
              class="flex-1"
              v-model="busqueda"
            />
          </div>
        </div>

        <!-- Right: Trade Areas -->
        <div class="w-1/2 p-4 flex flex-col gap-6">
          <!-- Your items -->
          <div>
            <div class="mb-1 font-medium text-crimson-500">Tu oferta</div>
            <div class="text-sm text-midnight-50 mb-2">Productos que ofreces</div>

            <div
              class="grid grid-cols-4 gap-2 bg-midnight-950 p-2 border border-gray-600 rounded h-[280px] overflow-y-auto"
            >
              <!--
              <div
                v-for="product in OfertaModalService.yourOffer.value"
                :key="product.id"
                class="aspect-square bg-[#2c2c2c] border border-gray-700 rounded cursor-pointer"
                @click.prevent="OfertaModalService.yourOffer.value = OfertaModalService.yourOffer.value.filter(p => p.id !== product.id)"
              >
                {{product.nombre}}
              </div>
              -->

              <div
                v-for="producto in OfertaModalService.yourOffer.value"
                :key="producto.id"
                @click.prevent="
                  OfertaModalService.yourOffer.value = OfertaModalService.yourOffer.value.filter(
                    (p) => p.id !== producto.id,
                  )
                "
                class="relative aspect-square bg-midnight-850 border border-gray-700 rounded-lg overflow-hidden shadow cursor-pointer hover:ring-2 hover:ring-crimson-500 transition-all"
              >
                <img
                  :src="'http://localhost:8081/images/' + producto.fotos[0]"
                  :alt="producto.nombre"
                  class="w-full h-full object-cover object-center"
                />
                <div
                  class="absolute bottom-0 w-full bg-black/60 text-center text-xs text-midnight-50 py-1 px-2 truncate"
                >
                  {{ producto.nombre }}
                </div>
              </div>
            </div>
          </div>

          <!-- Their items -->
          <div>
            <div class="mb-1 font-medium text-crimson-500">
              Oferta de
              {{ OfertaModalService.usuario_vendedor.value.username }}
            </div>
            <div class="text-sm text-midnight-50 mb-2">Productos que recibes</div>

            <div
              class="grid grid-cols-4 gap-2 bg-midnight-950 p-2 border border-gray-600 rounded h-[280px] overflow-y-auto"
            >
              <!--
              <div
                v-for="product in OfertaModalService.theirOffer.value"
                :key="product.id"
                class="aspect-square bg-[#2c2c2c] border border-gray-700 rounded cursor-pointer"
                @click.prevent="OfertaModalService.theirOffer.value = OfertaModalService.theirOffer.value.filter(p => p.id !== product.id)"
              >
                {{product.nombre}}
              </div>
              -->
              <div
                v-for="producto in OfertaModalService.theirOffer.value"
                :key="producto.id"
                @click.prevent="
                  OfertaModalService.theirOffer.value = OfertaModalService.theirOffer.value.filter(
                    (p) => p.id !== producto.id,
                  )
                "
                class="relative aspect-square bg-midnight-850 border border-gray-700 rounded-lg overflow-hidden shadow cursor-pointer hover:ring-2 hover:ring-crimson-500 transition-all"
              >
                <img
                  :src="'http://localhost:8081/images/' + producto.fotos[0]"
                  :alt="producto.nombre"
                  class="w-full h-full object-cover object-center"
                />
                <div
                  class="absolute bottom-0 w-full bg-black/60 text-center text-xs text-midnight-50 py-1 px-2 truncate"
                >
                  {{ producto.nombre }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-midnight-950 bg-midnight-850 flex justify-end">
        <button
          @click="sendOffer"
          class="text-midnight-50 bg-crimson-700 hover:bg-crimson-800 px-4 py-2 rounded mr-3"
        >
          Mandar oferta
        </button>
        <button
          @click="close"
          class="px-4 py-2 rounded text-midnight-50 bg-crimson-700 hover:bg-crimson-800"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import TextField from '@/components/TextField.vue'
import OfertaModalService from '@/services/OfertaModalService'
import TruequeService from '@/services/TruequeService.js'
import AlertService from '@/services/AlertService.js'

const mostrarInventarioInteresado = ref(true)
const busqueda = ref('')

// Inventario visible filtrado
const inventarioActual = computed(() => {
  let inventario = mostrarInventarioInteresado.value
    ? OfertaModalService.inventario_interesado.value
    : OfertaModalService.inventario_vendedor.value

  // quitar los items seleccionados
  const itemsSeleccionados = OfertaModalService.yourOffer.value.concat(
    OfertaModalService.theirOffer.value,
  )
  inventario = inventario.filter((p) => !itemsSeleccionados.find((i) => i.id === p.id))

  return inventario.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      p.categoria.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

function agregarProducto(producto) {
  if (mostrarInventarioInteresado.value) {
    if (!OfertaModalService.yourOffer.value.find((p) => p.id === producto.id)) {
      OfertaModalService.yourOffer.value.push(producto)
    }
  } else {
    if (!OfertaModalService.theirOffer.value.find((p) => p.id === producto.id)) {
      OfertaModalService.theirOffer.value.push(producto)
    }
  }
}

function sendOffer() {
  try {
    if (OfertaModalService.yourOffer.value.length === 0 || OfertaModalService.theirOffer.value.length === 0) {
      AlertService.showAlert('Error', 'Debes de seleccionar al menos un producto en ambas ofertas', 'error')
      return
    }

    console.log(OfertaModalService.theirOffer.value)
    const trueque = {
      idVendedor: OfertaModalService.usuario_vendedor.value.id,
      idInteresado: OfertaModalService.id_interesado.value,
      nombreTrueque: OfertaModalService.theirOffer.value[0].nombre,
      imagenPreview: OfertaModalService.theirOffer.value[0].fotos[0] || 'no_image_provided',
      idsProductosVendedor: OfertaModalService.theirOffer.value.map((p) => p.id),
      idsProductosInteresado: OfertaModalService.yourOffer.value.map((p) => p.id),
      estado: 'PENDIENTE'
    }

    console.log(trueque)

    TruequeService.save(trueque).then(
      async (response) => {
        console.log(response)
        await AlertService.showAlert("Oferta enviada", "La oferta ha sido enviada correctamente", 'success')
        close()
      }
    ).catch(
      (error) => {
        AlertService.showAlert("Error", "No se pudo enviar la oferta: \n" + error.response.data.messages.join('\n'), "error")
      }
    )
  } catch (error) {
    AlertService.showAlert("Error", "No se pudo enviar la oferta: \n" + error.message, "error")
  }
}

function close() {
  busqueda.value = ''
  mostrarInventarioInteresado.value = true
  OfertaModalService.closeModal()
}
</script>
