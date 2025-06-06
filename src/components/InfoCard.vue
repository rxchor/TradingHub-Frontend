<script setup>
defineProps({
  title: String,
  message: String,
  note: String,
  datetime: {
    type: String,
    default: null,
  },
})

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
</script>

<template>
  <div
    class="bg-midnight-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-midnight-700"
  >
    <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>

    <p class="mb-4 text-lg">Motivo:</p>
    <p v-html="message" class="mb-6 text-midnight-50 italic"></p>

    <p class="text-sm text-midnight-50 mb-2">
      <strong v-html="note"></strong>
    </p>

    <p v-if="datetime" class="text-xs text-crimson-500 font-bold">
      Su sanción se levantará el dia {{ formatDate(datetime) }}
    </p>
    <p v-else>
      Penalización permanente
    </p>
  </div>
</template>
