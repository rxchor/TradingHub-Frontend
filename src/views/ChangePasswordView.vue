<script setup>
import { reactive } from 'vue'
import TextField from '@/components/TextField.vue'
import AuthService from '@/services/AuthService.js'
import UsuarioService from '@/services/UsuarioService.js'
import AlertService from '@/services/AlertService.js'
import router from '@/router/index.js'
const user = AuthService.getUserIdFromToken()

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const goToDashboard = () => {
  router.push('/')
}

function handleSubmit() {
  try {
    if (form.newPassword.length < 6) {
      AlertService.showAlert(
        'Error al cambiar la contraseña.',
        'Verifique que la contraseña nueva tenga más de 6 caracteres',
        'error',
      )
      return
    }
    if (form.newPassword !== form.confirmPassword) {
      AlertService.showAlert(
        'Error al cambiar la contraseña.',
        'Verifique que la contraseña nueva y la confirmación coincidan.',
        'error',
      )
      return
    }

    UsuarioService.cambiarPassword(user, form.currentPassword, form.newPassword)
      .then(() => {
        AlertService.showConfirm(
          'Cambio de contraseña',
          'Se ha realizado el cambio de contraseña correctamente. ¿Deseas ir al inicio de sesión?',
        ).then((confirmed) => {
          if (confirmed) {
            AuthService.logout()
            router.push('/login')
          } else {
            AuthService.logout()
            router.push('/')
          }
        })
      })
      .catch(() => {
        AlertService.showAlert(
          'Error al cambiar la contraseña.',
          'Verifique que la contraseña actual sea correcta y que la nueva contraseña cumpla con los requisitos.',
          'error',
        )
      })
  } catch (error) {
    console.error(error)
    AlertService.showAlert(
      'Error inesperado.',
      'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.',
      'error',
    )
  }
}
</script>

<template>
  <main>
    <div class="min-h-screen flex flex-col items-center justify-center bg-midnight-900">
      <div class="py-6 px-4">
        <div class="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div
            class="border-4 bg-midnight-800 border-midnight-950 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto"
          >
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="mb-12">
                <h3 class="text-crimson-500 text-3xl font-semibold">Cambiar contraseña</h3>
                <p class="text-midnight-50 text-sm mt-6 leading-relaxed">
                  Introduce tu contraseña actual y elige una nueva para actualizar tu cuenta.
                </p>
              </div>

              <!-- Contraseña actual -->
              <TextField
                name="currentPassword"
                type="password"
                label="Contraseña actual"
                placeholder="Introduce tu contraseña actual"
                v-model="form.currentPassword"
              />

              <!-- Nueva contraseña -->
              <TextField
                name="newPassword"
                type="password"
                label="Nueva contraseña"
                placeholder="Introduce tu nueva contraseña"
                v-model="form.newPassword"
              />

              <!-- Confirmar nueva contraseña -->
              <TextField
                name="confirmPassword"
                type="password"
                label="Confirmar nueva contraseña"
                placeholder="Repite tu nueva contraseña"
                v-model="form.confirmPassword"
              />

              <div class="mt-12 flex justify-center gap-6 flex-wrap">
                <button
                  type="submit"
                  class="py-4 px-10 text-sm font-medium tracking-wider rounded text-midnight-50 bg-crimson-700 hover:bg-crimson-800 focus:outline-none"
                >
                  Cambiar contraseña
                </button>
                <button
                  type="button"
                  class="py-4 px-10 text-sm font-medium tracking-wider rounded text-midnight-50 bg-crimson-700 hover:bg-crimson-800 focus:outline-none"
                  @click="goToDashboard"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>

          <div class="max-md:mt-8 flex max-md:flex-row flex-col">
            <img
              src="https://i.imgur.com/5wwDWIk.png"
              class="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover"
              alt="password change image"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
