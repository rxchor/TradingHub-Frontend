<template>
  <div
    @click="$emit('card-click', producto.id)"
    class="group cursor-pointer bg-midnight-800 border-2 border-midnight-950 rounded-xl shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-xs relative"
  >
    <!-- Imagen con botones de navegación -->
    <div class="relative w-full aspect-square bg-gray-100 overflow-hidden">
      <img
        :src="'http://localhost:8081/images/' + producto.fotos[0]"
        :alt="producto.nombre"
        class="w-full h-full object-cover object-center"
      />

    </div>

    <!-- Contenido textual -->
    <div class="p-5">
      <h3 class="text-midnight-50 text-lg font-semibold mb-1 truncate">{{ producto.nombre }}</h3>
      <p class="text-crimson-500 text-md font-medium mb-2">{{ producto.categoria }}</p>
      <p class="text-midnight-100 text-sm line-clamp-3">{{ producto.descripcion }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  producto: { type: Object, required: true },
})
</script>
