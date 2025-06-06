<script setup>
import { defineProps } from 'vue';

defineProps({
  modelValue: String,
  label: String,
  name: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  },
  multiline: {
    type: Boolean,
    default: false
  },
  noLabel: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div>
    <label v-if="!noLabel" :for="name" class="text-crimson-500 text-sm font-medium mb-2 block">{{ label }}</label>
    <div class="relative flex items-center">
      <textarea v-if="multiline"
        :id="name"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full min-h-12 text-sm text-midnight-50 border-2 border-midnight-950 pl-4 pr-10 py-3 rounded-lg outline-crimson-600 bg-midnight-850 placeholder-midnight-50"
        required
      />
      <input v-else
        :id="name"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full text-sm text-midnight-50 border-2 border-midnight-950 pl-4 pr-10 py-3 rounded-lg outline-crimson-600 bg-midnight-850 placeholder-midnight-50"
        required
      />
      <slot name="icon"></slot>
    </div>
  </div>
</template>
