<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '@/services/AuthService.js'
import TextField from '@/components/TextField.vue'
import AlertService from '@/services/AlertService.js'

const regexTelefono = /^[67]\d{8}$/;
const router = useRouter()

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const numeroTelefono = ref('')

const handleSubmit = async () => {
  try {
    if (!regexTelefono.test(numeroTelefono.value)) {
      AlertService.showAlert(
        "Número de teléfono inválido",
        "Debe tener 9 dígitos y comenzar por 6 o 7.",
        "warning"
      );
      return;
    }

    const payload = {
      username: username.value,
      email: email.value,
      password: password.value,
      numeroTelefono: numeroTelefono.value,
    }

    const response = await AuthService.register(payload);

    console.log('Login successful:', response.data);

    await router.push('/');

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    AlertService.showAlert("Error al intentar registrarse", error.response.data.messages.join('\n'), 'error');
  }
}
</script>

<template>
  <main>
    <div class="min-h-screen flex fle-col items-center justify-center bg-midnight-900">
      <div class="py-6 px-4">
        <div class="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div
            class="border-4 border-midnight-950 bg-midnight-800 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto"
          >
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="mb-12">
                <h3 class="text-crimson-500 text-3xl font-semibold">Registrate</h3>
                <p class="text-midnight-50 text-sm mt-6 leading-relaxed colo">
                  Registrate en TradingHub para disfrutar de todas las
                  funcionalidades que ofrecemos.
                </p>
              </div>
              <TextField
                name="username"
                type="text"
                label="Nombre Completo"
                placeholder="Introducir nombre"
                v-model="username"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    class="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </template>
              </TextField>

              <TextField
                name="email"
                type="email"
                label="Email"
                placeholder="Introducir email"
                v-model="email"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    fill="#bbb"
                    stroke="#000"
                    class="w-[18px] h-[18px] absolute right-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </template>
              </TextField>

              <TextField
                name="numeroTelefono"
                type="text"
                label="Teléfono de contacto"
                placeholder="Introducir teléfono de contacto"
                v-model="numeroTelefono"

              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    fill="#bbb"
                    stroke="#bbb"
                    class="w-[18px] h-[18px] absolute right-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </template>
              </TextField>

              <TextField
                name="password"
                :type="showPassword ? 'text' : 'password'"
                label="Contraseña"
                placeholder="Introducir contraseña"
                v-model="password"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    class="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                    @click="showPassword = !showPassword"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </template>
              </TextField>

              <TextField
                name="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                label="Confirmar contraseña"
                placeholder="Confirmar contraseña"
                v-model="confirmPassword"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    class="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </template>
              </TextField>

              <div class="!mt-12">
                <button
                  type="submit"
                  class="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-midnight-50 bg-crimson-700 hover:bg-crimson-800 focus:outline-none"
                >
                  Registrarse
                </button>
                <p class="text-sm !mt-6 text-center text-midnight-50">
                  ¿Ya tienes cuenta?
                  <router-link
                    to="/login"
                    class="text-crimson-500 font-medium hover:underline ml-1 whitespace-nowrap"
                  >
                    Inicia sesión aquí
                  </router-link>
                </p>
              </div>
            </form>
          </div>
          <div class="max-md:mt-8 flex max-md:flex-row flex-col">
            <img
              src="https://i.imgur.com/5wwDWIk.png"
              class="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover"
              alt="login img"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
