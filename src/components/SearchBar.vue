<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const searchQuery = ref(props.modelValue || '')

// Sincroniza el input con el `v-model` externo
watch(searchQuery, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div class="mb-6 flex justify-center">
    <div class="w-full max-w-xl">
      <label for="search" class="block text-sm font-medium text-crimson-500 mb-2 text-center">
        Filtrado de productos
      </label>
      <div class="relative">
        <input
          id="search"
          type="text"
          placeholder="Buscar por nombre o categoría..."
          v-model="searchQuery"
          class="w-full text-sm text-midnight-50 border-2 border-midnight-950 pl-4 pr-10 py-3 rounded-lg outline-crimson-600 bg-midnight-800 placeholder-midnight-50"
        />
        <svg
          class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-midnight-50 pointer-events-none"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
