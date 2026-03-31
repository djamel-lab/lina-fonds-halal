<template>
  <button
    class="relative flex h-7 w-14 cursor-pointer items-center rounded-full border border-white/10 bg-white/8 px-0.5 transition-all duration-300 light:border-gray-200 light:bg-gray-100"
    :aria-label="isDark ? 'Passer en thème clair' : 'Passer en thème sombre'"
    @click="toggle"
  >
    <div
      class="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs transition-transform duration-300 light:translate-x-7 light:bg-gray-800"
    >
      <span>{{ isDark ? '🌙' : '☀️' }}</span>
    </div>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(true)

const toggle = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('lina-theme', theme)
}

onMounted(() => {
  const saved = localStorage.getItem('lina-theme') || 'dark'
  isDark.value = saved === 'dark'
  document.documentElement.setAttribute('data-theme', saved)
})
</script>
