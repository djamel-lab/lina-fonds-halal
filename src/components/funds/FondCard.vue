<template>
  <div
    class="group relative cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/8 light:border-gray-200 light:bg-white light:hover:border-gray-300 light:hover:shadow-md"
    @click="emit('open')"
  >
    <!-- Halal badge -->
    <span class="absolute right-4 top-4 rounded-md bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400 light:bg-emerald-50 light:text-emerald-700">
      ✓ Halal
    </span>

    <!-- Type badge -->
    <div class="mb-2.5">
      <span
        class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold"
        :style="{ background: typeColor + '20', color: typeColor }"
      >{{ typeLabel }}</span>
    </div>

    <!-- Name & ISIN -->
    <h3 class="mb-0.5 pr-16 text-sm font-bold leading-snug text-white light:text-secondary-900">
      {{ fund.name }}
    </h3>
    <p class="mb-3 font-mono text-xs text-gray-600 light:text-gray-400">
      {{ fund.isin && fund.isin !== 'BTC' ? fund.isin : '&nbsp;' }}
    </p>

    <!-- Risk -->
    <div class="mb-4 flex items-center gap-2">
      <span class="text-xs font-semibold text-gray-400 light:text-gray-500">SRI {{ fund.sri }}/7</span>
      <RiskBars :value="fund.sri" />
    </div>

    <!-- Sparkline + NAV -->
    <div class="mb-4 flex items-end justify-between gap-3">
      <Sparkline :data="fund.history.slice(-12)" :positive="fund.perf1y >= 0" :width="100" :height="42" />
      <div class="text-right">
        <div class="text-lg font-extrabold text-white light:text-secondary-900">
          {{ fmtNav }}<small class="ml-0.5 text-xs font-medium text-gray-500">{{ currSymbol }}</small>
        </div>
        <div
          class="mt-0.5 text-xs font-bold"
          :class="fund.changePct >= 0 ? 'text-emerald-400 light:text-emerald-600' : 'text-red-400 light:text-red-600'"
        >
          {{ fund.changePct >= 0 ? '▲ +' : '▼ ' }}{{ Math.abs(fund.changePct).toFixed(2) }}%
        </div>
      </div>
    </div>

    <!-- Perf row -->
    <div class="mb-4 grid grid-cols-4 border-t border-white/8 pt-3 light:border-gray-100">
      <div v-for="p in perfItems" :key="p.label" class="text-center">
        <div
          class="text-sm font-extrabold"
          :class="
            p.value === null
              ? 'text-gray-600'
              : p.value >= 0
                ? 'text-emerald-400 light:text-emerald-600'
                : 'text-red-400 light:text-red-600'
          "
        >
          <template v-if="p.value !== null">{{ p.value >= 0 ? '+' : '' }}{{ p.value.toFixed(1) }}%</template>
          <template v-else>—</template>
        </div>
        <div class="mt-0.5 text-xs text-gray-500">{{ p.label }}</div>
      </div>
    </div>

    <!-- Envelopes -->
    <div v-if="fund.enveloppes.length" class="flex flex-wrap gap-1.5">
      <span
        v-for="env in fund.enveloppes"
        :key="env"
        class="rounded px-1.5 py-0.5 text-xs font-semibold text-amber-400/80 ring-1 ring-amber-400/25 light:text-amber-700 light:ring-amber-300"
      >
        {{ env }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RiskBars from '../ui/RiskBars.vue'
import Sparkline from './Sparkline.vue'
import { TYPE_LABELS, TYPE_COLORS } from '../../data/fonds'

const props = defineProps({
  fund: { type: Object, required: true },
})
const emit = defineEmits(['open'])

const typeLabel = computed(() => TYPE_LABELS[props.fund.type] || props.fund.type)
const typeColor = computed(() => TYPE_COLORS[props.fund.type] || '#6B7280')
const currSymbol = computed(() => (props.fund.currency === 'USD' ? '$' : '€'))

const fmtNav = computed(() =>
  props.fund.nav >= 1000
    ? props.fund.nav.toLocaleString('fr-FR', { maximumFractionDigits: 0 })
    : props.fund.nav.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
)

const perfItems = computed(() => [
  { label: 'YTD', value: props.fund.perfYtd },
  { label: '1 an', value: props.fund.perf1y },
  { label: '3 ans', value: props.fund.perf3y },
  { label: '5 ans', value: props.fund.perf5y },
])
</script>
