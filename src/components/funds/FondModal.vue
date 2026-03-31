<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
      style="background: rgba(0,0,0,0.72); backdrop-filter: blur(6px)"
      @click.self="emit('close')"
    >
      <div
        class="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#111] shadow-2xl light:border-gray-200 light:bg-white"
        style="max-height: 92vh; overflow-y: auto; animation: slideUp 0.22s ease"
      >
        <!-- ── Header ── -->
        <div class="sticky top-0 z-10 rounded-t-2xl border-b border-white/8 bg-[#0d0d0d] px-6 py-5 light:border-gray-100 light:bg-gray-50">
          <button
            class="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-gray-400 transition hover:bg-white/20 hover:text-white light:bg-gray-100 light:text-gray-500 light:hover:bg-gray-200 light:hover:text-gray-900"
            @click="emit('close')"
          >×</button>

          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="flex-1 pr-10">
              <span
                class="mb-2 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold"
                :style="{ background: typeColor + '22', color: typeColor }"
              >{{ typeLabel }}</span>
              <h2 class="text-lg font-extrabold leading-tight text-white light:text-secondary-900">
                {{ fund.name }}
              </h2>
              <p v-if="fund.isin && fund.isin !== 'BTC'" class="mt-1 font-mono text-xs text-gray-500">
                {{ fund.isin }}
              </p>
            </div>

            <!-- NAV block -->
            <div class="rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-right light:border-gray-200 light:bg-white">
              <div class="text-2xl font-extrabold text-white light:text-secondary-900">
                {{ fmtNav }}<small class="ml-0.5 text-sm font-medium text-gray-500">{{ currSymbol }}</small>
              </div>
              <div
                class="mt-1 text-sm font-bold"
                :class="fund.changePct >= 0 ? 'text-emerald-400 light:text-emerald-600' : 'text-red-400 light:text-red-600'"
              >
                {{ fund.changePct >= 0 ? '▲ +' : '▼ ' }}{{ Math.abs(fund.changePct).toFixed(2) }}% aujourd'hui
              </div>
            </div>
          </div>
        </div>

        <!-- ── Body ── -->
        <div class="space-y-6 p-6">

          <!-- Description -->
          <p class="rounded-xl border border-white/6 bg-white/4 p-4 text-sm leading-relaxed text-gray-300 light:border-gray-100 light:bg-gray-50 light:text-gray-600">
            {{ fund.description }}
          </p>

          <!-- Performances -->
          <section>
            <h3 class="mb-3 flex items-center gap-2 text-sm font-bold text-white light:text-secondary-900">
              <span>📊</span> Performances & Risque
            </h3>
            <div class="grid grid-cols-3 gap-2 sm:grid-cols-6">
              <div
                v-for="item in statsItems"
                :key="item.label"
                class="rounded-xl border border-white/8 bg-white/5 p-3 light:border-gray-100 light:bg-gray-50"
              >
                <div class="mb-1 text-xs text-gray-500">{{ item.label }}</div>
                <div
                  class="text-sm font-extrabold"
                  :class="item.neutral ? 'text-white light:text-secondary-900' : item.value >= 0 ? 'text-emerald-400 light:text-emerald-600' : 'text-red-400 light:text-red-600'"
                >
                  <template v-if="item.raw">{{ item.raw }}</template>
                  <template v-else-if="item.value !== null">
                    {{ !item.neutral && item.value >= 0 ? '+' : '' }}{{ typeof item.value === 'number' ? item.value.toFixed(item.dec ?? 2) : item.value }}{{ item.suffix || '%' }}
                  </template>
                  <template v-else><span class="text-gray-600">—</span></template>
                </div>
              </div>
            </div>
          </section>

          <!-- Chart -->
          <section v-if="fund.history && fund.history.length > 1">
            <h3 class="mb-3 flex items-center gap-2 text-sm font-bold text-white light:text-secondary-900">
              <span>📈</span> Évolution historique
            </h3>
            <!-- Period selector -->
            <div class="mb-3 flex flex-wrap gap-2">
              <button
                v-for="p in PERIODS"
                :key="p.key"
                class="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-150"
                :class="
                  activePeriod === p.key
                    ? 'bg-white/90 text-gray-900 light:bg-secondary-900 light:text-white'
                    : 'border border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white light:border-gray-200 light:bg-white light:text-gray-500 light:hover:border-gray-300 light:hover:text-gray-900'
                "
                @click="activePeriod = p.key"
              >{{ p.label }}</button>
            </div>
            <div class="rounded-xl border border-white/8 bg-white/3 p-4 light:border-gray-100 light:bg-white">
              <HistoryChart :fund="fund" :period="activePeriod" />
            </div>
          </section>

          <!-- Envelopes + Info (2 cols) -->
          <div class="grid gap-4 sm:grid-cols-2">
            <!-- Envelopes -->
            <section>
              <h3 class="mb-3 flex items-center gap-2 text-sm font-bold text-white light:text-secondary-900">
                <span>🏦</span> Enveloppes disponibles
              </h3>
              <div v-if="fund.enveloppes.length" class="space-y-2">
                <div
                  v-for="env in ALL_ENVELOPES"
                  :key="env"
                  class="flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors"
                  :class="
                    fund.enveloppes.includes(env)
                      ? 'border-amber-400/25 bg-amber-400/8 text-amber-300 light:border-amber-200 light:bg-amber-50 light:text-amber-700'
                      : 'border-white/5 bg-white/3 text-gray-600 light:border-gray-100 light:bg-gray-50 light:text-gray-400'
                  "
                >
                  <span class="text-base">{{ fund.enveloppes.includes(env) ? '✅' : '⬜' }}</span>
                  <span class="font-medium">{{ env }}</span>
                </div>
              </div>
              <p v-else class="text-sm italic text-gray-600">Aucune enveloppe renseignée</p>
            </section>

            <!-- Info table -->
            <section>
              <h3 class="mb-3 flex items-center gap-2 text-sm font-bold text-white light:text-secondary-900">
                <span>📋</span> Informations
              </h3>
              <div class="space-y-1.5">
                <div
                  v-for="row in infoRows"
                  :key="row.label"
                  class="flex items-start justify-between rounded-lg bg-white/4 px-3 py-2 light:bg-gray-50"
                >
                  <span class="text-xs text-gray-500">{{ row.label }}</span>
                  <span class="ml-3 text-right text-xs font-semibold text-white light:text-secondary-900">{{ row.value }}</span>
                </div>
              </div>
            </section>
          </div>

          <!-- Comité Charia -->
          <section v-if="fund.comite && fund.comite.length">
            <h3 class="mb-3 flex items-center gap-2 text-sm font-bold text-white light:text-secondary-900">
              <span>✅</span> Comité de Conformité Éthique
            </h3>
            <div class="grid gap-3 sm:grid-cols-2">
              <div
                v-for="(m, i) in fund.comite"
                :key="i"
                class="flex items-start gap-3 rounded-xl border border-white/8 bg-white/4 p-4 light:border-gray-100 light:bg-gray-50"
              >
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg light:bg-gray-200">👤</div>
                <div>
                  <div class="text-sm font-bold text-white light:text-secondary-900">{{ m.name }}</div>
                  <div class="text-xs text-gray-500">{{ m.role }}</div>
                  <div v-if="m.org" class="text-xs text-amber-400/70 light:text-amber-600">{{ m.org }}</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Crypto disclaimer -->
          <div
            v-if="fund.type === 'crypto'"
            class="rounded-xl border border-amber-400/20 bg-amber-400/8 p-4 text-sm text-amber-300 light:border-amber-200 light:bg-amber-50 light:text-amber-800"
          >
            ⚠️ Les avis des scholars sur la conformité Charia du Bitcoin sont divergents. Certains l'admettent comme moyen d'échange décentralisé, d'autres le prohibent en raison de la spéculation excessive. Consultez votre savant de référence avant tout investissement.
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import HistoryChart from './HistoryChart.vue'
import { TYPE_LABELS, TYPE_COLORS, ALL_ENVELOPES } from '../../data/fonds'

const props = defineProps({
  fund: { type: Object, required: true },
})
const emit = defineEmits(['close'])

const activePeriod = ref('1y')
const PERIODS = [
  { key: '1m', label: '1M' }, { key: '3m', label: '3M' }, { key: '1y', label: '1A' },
  { key: '3y', label: '3A' }, { key: '5y', label: '5A' },
]

const typeLabel = computed(() => TYPE_LABELS[props.fund.type] || props.fund.type)
const typeColor = computed(() => TYPE_COLORS[props.fund.type] || '#6B7280')
const currSymbol = computed(() => (props.fund.currency === 'USD' ? '$' : '€'))

const fmtNav = computed(() =>
  props.fund.nav >= 1000
    ? props.fund.nav.toLocaleString('fr-FR', { maximumFractionDigits: 0 })
    : props.fund.nav.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
)

const statsItems = computed(() => [
  { label: 'YTD', value: props.fund.perfYtd },
  { label: '1 an', value: props.fund.perf1y },
  { label: '3 ans', value: props.fund.perf3y },
  { label: '5 ans', value: props.fund.perf5y },
  { label: 'Volatilité', value: props.fund.vol, neutral: true },
  { label: 'SRI', raw: `${props.fund.sri} / 7`, neutral: true },
])

const infoRows = computed(() => [
  { label: 'Type', value: typeLabel.value },
  { label: 'Devise', value: props.fund.currency },
  ...(props.fund.isin && props.fund.isin !== 'BTC' ? [{ label: 'ISIN', value: props.fund.isin }] : []),
  ...(props.fund.certificateur ? [{ label: 'Certificateur', value: props.fund.certificateur }] : []),
  ...(props.fund.certifDate ? [{ label: 'Dernier audit', value: props.fund.certifDate }] : []),
])
</script>

<style scoped>
@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
