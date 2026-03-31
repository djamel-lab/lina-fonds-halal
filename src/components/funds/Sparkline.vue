<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    style="overflow: visible; display: block"
  >
    <defs>
      <linearGradient :id="`sg-${uid}`" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" :stop-color="color" stop-opacity="0.22" />
        <stop offset="100%" :stop-color="color" stop-opacity="0" />
      </linearGradient>
    </defs>
    <polygon :points="areaPoints" :fill="`url(#sg-${uid})`" />
    <polyline
      :points="linePoints"
      fill="none"
      :stroke="color"
      stroke-width="1.5"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: { type: Array, required: true },
  positive: { type: Boolean, default: true },
  width: { type: Number, default: 100 },
  height: { type: Number, default: 44 },
})

const uid = Math.random().toString(36).slice(2, 8)
const color = computed(() => (props.positive ? '#10B981' : '#EF4444'))

const coords = computed(() => {
  const vals = props.data.map((d) => d.close)
  if (vals.length < 2) return []
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const range = max - min || 1
  return vals.map((v, i) => ({
    x: (i / (vals.length - 1)) * props.width,
    y: props.height - ((v - min) / range) * props.height,
  }))
})

const linePoints = computed(() =>
  coords.value.map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' '),
)

const areaPoints = computed(() => {
  if (!coords.value.length) return ''
  const line = coords.value.map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  return `0,${props.height} ${line} ${props.width},${props.height}`
})
</script>
