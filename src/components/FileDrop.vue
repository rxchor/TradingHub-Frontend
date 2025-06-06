<template>
    <div>
      <h1 class="text-left font-semibold mb-4 text-crimson-500">Imagenes</h1>
      <div
        ref="dropzone"
        class="bg-midnight-850 p-8 text-center rounded-lg border-dashed border-2 border-midnight-950 hover:border-crimson-600 hover:border-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
        :class="{ 'border-4 border-crimson-600 scale-105 shadow-md' : isDragging }"
        @dragover.prevent="onDragOver"
        @dragenter.prevent="onDragEnter"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
      >
        <label for="fileInput" class="cursor-pointer flex flex-col items-center space-y-2">
          <svg class="w-16 h-16 text-midnight-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span class="text-midnight-50">Arrastra y suelta tus imagenes aquí</span>
          <span class="text-midnight-50 text-sm">(o clica para seleccionar)</span>
        </label>
        <!-- Accept only images -->
        <input type="file" id="fileInput" ref="fileInput" class="hidden" multiple accept="image/*" @change="onFileChange" />
      </div>
      <div class="mt-6 text-center">
        <div class="text-midnight-50" v-for="file in files" :key="file.name">
          {{ file.name }} ({{ formatBytes(file.size) }})
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

// Emit event to parent
const emit = defineEmits(['update:modelValue'])

const dropzone = ref(null)
const fileInput = ref(null)
const files = ref([])


const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

const isDragging = ref(false)
let dragCounter = 0

const onDragOver = () => {
  // Solo necesario para permitir drop
}

const onDragEnter = () => {
  dragCounter++
  isDragging.value = true
}

const onDragLeave = () => {
  dragCounter--
  if (dragCounter === 0) {
    isDragging.value = false
  }
}

const onDrop = (event) => {
  dragCounter = 0
  isDragging.value = false
  handleFiles(event.dataTransfer.files)
}

const onFileChange = (event) => {
  handleFiles(event.target.files)
}

function handleFiles(fileList) {
  const validFiles = Array.from(fileList).filter(file => ACCEPTED_TYPES.includes(file.type))
  files.value = validFiles
  emit('update:modelValue', validFiles) // Cambio aquí
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>
