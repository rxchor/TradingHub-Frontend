<!-- src/components/AlertModal.vue -->
<template>
  <div v-if="AlertService.show.value" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="fixed inset-0 bg-black/60 transition-opacity"></div>

    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>

      <div
        class="inline-block align-bottom bg-midnight-800 border-4 border-midnight-950 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-midnight-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <!-- Iconos según tipo -->
            <div
              v-if="AlertService.tipo.value === 'error'"
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-600 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="size-7 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </div>

            <div
              v-else-if="AlertService.tipo.value === 'success'"
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-500 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="size-7 text-white"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
            </div>

            <div
              v-else-if="AlertService.tipo.value === 'warn'"
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-400 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="size-7 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                />
              </svg>
            </div>

            <div
              v-else
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-400 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="size-7 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192 512"
              >
                <path
                  fill="currentColor"
                  d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 224 32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0 0-192-32 0c-17.7 0-32-14.3-32-32z"
                />
              </svg>
            </div>

            <!-- Título y mensaje -->
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-midnight-50">
                {{ AlertService.titulo }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-midnight-50">
                  {{ AlertService.mensaje }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones -->
        <div class="bg-midnight-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            v-if="AlertService.confirmMode.value"
            @click="AlertService.confirmResponse(true)"
            type="button"
            class="w-full inline-flex justify-center rounded-md text-midnight-50 bg-crimson-700 hover:bg-crimson-800 shadow-sm px-4 py-2 text-base font-medium sm:ml-3 sm:w-auto sm:text-sm"
          >
            Aceptar
          </button>
          <button
            v-if="AlertService.confirmMode.value"
            @click="AlertService.confirmResponse(false)"
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md text-midnight-50 bg-gray-500 hover:bg-gray-600 shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancelar
          </button>
          <button
            v-if="!AlertService.confirmMode.value"
            @click="AlertService.confirmResponse(true)"
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md text-midnight-50 bg-crimson-700 hover:bg-crimson-800 shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertService from '@/services/AlertService'

export default {
  name: 'AlertModal',
  setup() {
    return { AlertService }
  },
}
</script>
