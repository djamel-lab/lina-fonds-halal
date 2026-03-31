<template>
  <div class="flex items-center gap-0.5">
    <div
      v-for="i in 7"
      :key="i"
      class="h-1.5 w-3.5 rounded-sm transition-colors duration-200"
      :class="i <= value ? 'bg-amber-400 light:bg-amber-500' : 'bg-white/12 light:bg-gray-200'"
    />
  </div>
</template>

<script setup>
defineProps({
  value: { type: Number, required: true },
})
</script>
