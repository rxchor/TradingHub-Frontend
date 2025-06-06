<script setup>
import { ref } from 'vue'
import AuthService from '@/services/AuthService';
import TextField from '@/components/TextField.vue';
import { useRouter } from 'vue-router';
import AlertService from '@/services/AlertService.js'

const email = ref('');
const password = ref('');

const router = useRouter();

const showPassword = ref(false);

const onSubmit = async () => {
  try {
    let loginData = {
      email: email.value,
      password: password.value,
    }
    console.log('Login data:', loginData)

    const response = await AuthService.login(loginData)

    console.log('Login successful:', response.data);

    await router.push('/')

  } catch (error) {
    console.error('Error al iniciar sesión:', error)

    AlertService.showAlert("Error al iniciar sesión", error.response.data.messages.join('\n'), 'error')
  }

}
</script>

<template>
  <div class="min-h-screen flex fle-col items-center justify-center bg-midnight-900">
    <div class="py-6 px-4">
      <div class="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        <div
          class="border-4 border-midnight-950 bg-midnight-800 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto"
        >
          <form @submit.prevent="onSubmit" class="space-y-6">
            <div class="mb-12">
              <h3 class="text-crimson-500 text-3xl font-semibold">Iniciar sesión</h3>
              <p class="text-midnight-50 text-sm mt-6 leading-relaxed colo">
                Inicia sesión en TradingHub para acceder a tu cuenta y disfrutar de todas las
                funcionalidades que ofrecemos.
              </p>
            </div>
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


              <div class="!mt-12">
                <button
                  type="submit"
                  class="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-midnight-50 bg-crimson-700 hover:bg-crimson-800 focus:outline-none"
                >
                  Iniciar sesión
                </button>
                <p class="text-sm !mt-6 text-center text-midnight-50">
                  ¿No tienes cuenta?
                  <router-link
                    to="/register"
                    class="text-crimson-500 font-medium hover:underline ml-1 whitespace-nowrap"
                  >
                    Registrarse aquí
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
</template>
