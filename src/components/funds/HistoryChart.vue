<template>
  <div>
    <!-- Perf badge -->
    <div class="mb-3 flex items-center justify-between text-sm">
      <span class="text-gray-500">
        {{ subset[0]?.date }} → {{ subset[subset.length - 1]?.date }}
      </span>
      <span
        class="rounded-md px-2.5 py-1 text-sm font-bold"
        :class="
          perf >= 0
            ? 'bg-emerald-500/15 text-emerald-400 light:bg-emerald-50 light:text-emerald-700'
            : 'bg-red-500/15 text-red-400 light:bg-red-50 light:text-red-700'
        "
      >
        {{ perf >= 0 ? '+' : '' }}{{ perf.toFixed(2) }} %
      </span>
    </div>

    <!-- SVG -->
    <svg width="100%" :viewBox="`0 0 ${W} ${H}`" class="block">
      <defs>
        <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" :stop-color="lineColor" stop-opacity="0.18" />
          <stop offset="100%" :stop-color="lineColor" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Grid -->
      <g v-for="(tick, i) in yTicks" :key="`y${i}`">
        <line
          :x1="PAD.left" :x2="W - PAD.right"
          :y1="toY(tick)" :y2="toY(tick)"
          stroke="currentColor"
          class="text-white/8 light:text-gray-100"
          stroke-width="0.8"
        />
        <text
          :x="PAD.left - 6" :y="toY(tick) + 4"
          text-anchor="end" font-size="10" font-family="Inter, sans-serif"
          fill="currentColor" class="text-gray-500"
        >{{ fmtTick(tick) }}{{ currSymbol }}</text>
      </g>

      <!-- Area + Line -->
      <path :d="areaPath" fill="url(#cg)" />
      <path :d="linePath" fill="none" :stroke="lineColor" stroke-width="2" stroke-linejoin="round" />

      <!-- X labels -->
      <text
        v-for="({ i, label }) in xLabels"
        :key="`x${i}`"
        :x="toX(i)" :y="H - 5"
        text-anchor="middle" font-size="10" font-family="Inter, sans-serif"
        fill="currentColor" class="text-gray-500"
      >{{ label }}</text>
    </svg>

    <p class="mt-2 text-center text-xs text-gray-600 light:text-gray-400">
      * Données simulées — démonstration UX
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  fund: { type: Object, required: true },
  period: { type: String, default: '1y' },
})

const W = 680
const H = 210
const PAD = { top: 10, right: 10, bottom: 24, left: 58 }
const iW = W - PAD.left - PAD.right
const iH = H - PAD.top - PAD.bottom

const currSymbol = computed(() => (props.fund.currency === 'USD' ? '$' : '€'))

const subset = computed(() => {
  const n = { '1m': 1, '3m': 3, '1y': 12, '3y': 36, '5y': 60 }[props.period] || 12
  return props.fund.history.slice(-n - 1)
})

const vals = computed(() => subset.value.map((d) => d.close))
const minVal = computed(() => Math.min(...vals.value) * 0.98)
const maxVal = computed(() => Math.max(...vals.value) * 1.02)
const range = computed(() => maxVal.value - minVal.value || 1)

const toX = (i) => PAD.left + (i / (vals.value.length - 1)) * iW
const toY = (v) => PAD.top + iH - ((v - minVal.value) / range.value) * iH

const perf = computed(() => {
  const v = vals.value
  if (v.length < 2) return 0
  return ((v[v.length - 1] - v[0]) / v[0]) * 100
})

const lineColor = computed(() => (perf.value >= 0 ? '#10B981' : '#EF4444'))

const linePath = computed(() =>
  vals.value.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' '),
)

const areaPath = computed(() => {
  const n = vals.value.length
  return (
    linePath.value +
    ` L ${toX(n - 1).toFixed(1)} ${(PAD.top + iH).toFixed(1)}` +
    ` L ${PAD.left.toFixed(1)} ${(PAD.top + iH).toFixed(1)} Z`
  )
})

const yTicks = computed(() => {
  const steps = 4
  return Array.from({ length: steps + 1 }, (_, i) => minVal.value + ((maxVal.value - minVal.value) / steps) * i)
})

const xLabels = computed(() => {
  const n = vals.value.length
  const step = Math.ceil(n / 5)
  const labels = []
  for (let i = 0; i < n; i += step) labels.push({ i, label: subset.value[i]?.date || '' })
  if (labels[labels.length - 1]?.i !== n - 1)
    labels.push({ i: n - 1, label: subset.value[n - 1]?.date || '' })
  return labels
})

const fmtTick = (v) => {
  if (v >= 10000) return (v / 1000).toFixed(0) + 'k'
  if (v >= 1000) return v.toLocaleString('fr-FR', { maximumFractionDigits: 0 })
  if (v >= 10) return v.toFixed(1)
  return v.toFixed(2)
}
</script>
