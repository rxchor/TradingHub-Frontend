<template>
  <div class="min-h-screen bg-midnight-900 text-midnight-50 flex items-center justify-center px-6 py-12">
    <div class="w-full max-w-2xl bg-midnight-800 border-4 border-midnight-950 rounded-2xl p-10 shadow-2xl">
      <h2 class="text-3xl font-bold mb-6">Formulario de Reporte</h2>

      <p class="mb-4 text-midnight-200">
        Estás reportando un
        <span class="font-semibold text-crimson-400">{{ tipo }}</span>
      </p>

      <form @submit.prevent="enviarReporte">

        <div class="mb-6">
          <TextField
            name="titulo"
            label="Titulo del reporte"
            v-model="titulo"
            placeholder="Introducir el título"
          ></TextField>
        </div>

        <div class="mb-6">
          <TextField
            name="motivo"
            label="Motivo del reporte"
            v-model="motivo"
            placeholder="Describe el problema..."
            multiline
          ></TextField>
        </div>

        <button
          type="submit"
          class="w-full bg-crimson-600 hover:bg-crimson-700 text-white font-semibold py-3 rounded-xl transition"
        >
          Enviar reporte
        </button>
      </form>

      <div v-if="enviado" class="mt-6 text-green-400 font-medium">
        ¡Reporte enviado con éxito!
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import TextField from '@/components/TextField.vue'
import { useReporteStore} from '@/stores/ReporteStore.js'
import AuthService from '@/services/AuthService.js'
import ReporteService from '@/services/ReporteService.js'
import AlertService from '@/services/AlertService.js'
import UsuarioService from '@/services/UsuarioService.js'

const store = useReporteStore()
const tipo = computed(() => store.tipo)
const idItem = computed(() => store.idItem)
const idReportado = computed(() => store.idReportado)

const titulo = ref('')
const motivo = ref('')
const enviado = ref(false)

const enviarReporte = async () => {
  try {
    // Aquí puedes usar tu servicio de reportes real
    console.log('Enviando reporte:', { tipo, idItem, motivo: motivo.value })

    const usuarioReportante = await UsuarioService.getById(AuthService.getUserIdFromToken())
    const usuarioReportado = await UsuarioService.getById(idReportado.value)

    const payload = {
      idUsuarioReportante: usuarioReportante.data.id,
      usernameReportante: usuarioReportante.data.username,
      idUsuarioReportado: usuarioReportado.data.id,
      usernameReportado: usuarioReportado.data.username,
      titulo: titulo.value,
      descripcion: motivo.value,
      tipoItem: tipo.value,
      idItem: idItem.value,
      fechaCreacion: new Date()
    }

    const response = await ReporteService.save(payload)
    console.log('Reporte enviado:', response.data)

    titulo.value = ''
    motivo.value = ''

    await AlertService.showAlert("Reporte enviado", "El reporte ha sido enviado correctamente", 'success')
  } catch (error) {
    console.error('Error al enviar reporte:', error)
    await AlertService.showAlert("Error al enviar reporte", error.response.data.messages.join('\n'), 'error')
  }
}
</script>
