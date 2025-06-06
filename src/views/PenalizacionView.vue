<script setup>
import { ref, onMounted } from 'vue'
import InfoCard from '@/components/InfoCard.vue'
import { usePenalizacionStore } from '@/stores/PenalizacionStore.js'
import UsuarioService from '@/services/UsuarioService.js'
import AuthService from '@/services/AuthService.js'
import { useRouter } from 'vue-router'

const penalizacion = ref({})

const admin = ref({})

const mensaje = ref('')

const router = useRouter()

async function checkPenalizacion(penalizacion) {
  if (!penalizacion) return false

  // Baneo permanente
  if (penalizacion.fechaFin == null) {
    return true
  }

  const now = new Date()
  const fechaFin = new Date(penalizacion.fechaFin)

  // Penalización activa
  if (fechaFin > now) {
    return true
  }

  // Penalización expirada, eliminarla
  try {
    await UsuarioService.deletePenalizacion(AuthService.getUserIdFromToken())
  } catch (error) {
    console.error('Error eliminando penalización expirada:', error)
  }

  return false
}

onMounted(async () => {
  const penalizacionStore = usePenalizacionStore()
  penalizacion.value = penalizacionStore.penalizacion
  if (await checkPenalizacion(penalizacion.value)) {
    const adminResponse = await UsuarioService.getById(penalizacion.value.idAdmin)
    admin.value = adminResponse.data

    mensaje.value = '"' + penalizacionStore.penalizacion.motivo + '"'
  } else {
    await router.push('/')
  }
})

</script>
<template>
  <div
    v-if="penalizacion && penalizacion.idReporte && admin.username"
    class="min-h-screen bg-midnight-900 text-crimson-500 flex items-center justify-center p-4"
  >
    <InfoCard
      title="Has sido penalizado"
      :message="`${mensaje} - id de reporte: <span class='text-crimson-400 font-semibold'>${penalizacion.idReporte}</span>`"
      :note="`Decisión tomada por: ${admin.username}.<br/>Puede contactar con ${admin.email} para intentar apelar.`"
      :datetime="penalizacion.fechaFin"
    />
  </div>
  <div v-else class="text-white p-6 text-center">
    Cargando detalles de penalización...
  </div>
</template>

