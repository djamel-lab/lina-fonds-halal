<template>
  <div class="px-4 py-8 sm:px-6">
    <div class="mx-auto max-w-7xl">

      <!-- Page header -->
      <div class="mb-6">
        <h1 class="text-2xl font-extrabold text-white light:text-secondary-900">
          Fonds <span class="text-emerald-400 light:text-emerald-600">halal</span> certifiés
        </h1>
        <p class="mt-1 text-sm text-gray-400 light:text-gray-500">
          Sélection de {{ store.funds.length }} produits conformes à la finance islamique — données mockées, démo UX
        </p>
      </div>

      <!-- Filters card -->
      <div class="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4 light:border-gray-200 light:bg-white">
        <div class="flex flex-wrap gap-3">
          <!-- Type -->
          <div class="flex min-w-36 flex-1 flex-col gap-1">
            <label class="text-xs font-bold uppercase tracking-wide text-gray-500">Type</label>
            <div class="relative">
              <select
                v-model="store.filterType"
                class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-white/8 px-3 py-2 pr-7 text-sm text-white outline-none transition focus:border-white/30 light:border-gray-200 light:bg-white light:text-secondary-900 light:focus:border-gray-400"
              >
                <option value="">Tous les types</option>
                <option v-for="[v, l] in typeOptions" :key="v" :value="v">{{ l }}</option>
              </select>
              <span class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-500">▼</span>
            </div>
          </div>

          <!-- Enveloppe -->
          <div class="flex min-w-36 flex-1 flex-col gap-1">
            <label class="text-xs font-bold uppercase tracking-wide text-gray-500">Enveloppe</label>
            <div class="relative">
              <select
                v-model="store.filterEnveloppe"
                class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-white/8 px-3 py-2 pr-7 text-sm text-white outline-none transition focus:border-white/30 light:border-gray-200 light:bg-white light:text-secondary-900 light:focus:border-gray-400"
              >
                <option value="">Toutes</option>
                <option v-for="env in ALL_ENVELOPES" :key="env" :value="env">{{ env }}</option>
              </select>
              <span class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-500">▼</span>
            </div>
          </div>

          <!-- Risque -->
          <div class="flex min-w-36 flex-1 flex-col gap-1">
            <label class="text-xs font-bold uppercase tracking-wide text-gray-500">Risque SRI</label>
            <div class="relative">
              <select
                v-model="store.filterRisk"
                class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-white/8 px-3 py-2 pr-7 text-sm text-white outline-none transition focus:border-white/30 light:border-gray-200 light:bg-white light:text-secondary-900 light:focus:border-gray-400"
              >
                <option value="">Tous les niveaux</option>
                <option value="0-2">Faible (1-2)</option>
                <option value="3-4">Modéré (3-4)</option>
                <option value="5-7">Élevé (5-7)</option>
              </select>
              <span class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-500">▼</span>
            </div>
          </div>

          <!-- Search -->
          <div class="flex min-w-44 flex-1 flex-col gap-1">
            <label class="text-xs font-bold uppercase tracking-wide text-gray-500">Rechercher</label>
            <input
              v-model="store.searchQuery"
              type="text"
              placeholder="Nom ou ISIN…"
              class="rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-white/30 light:border-gray-200 light:bg-white light:text-secondary-900 light:placeholder:text-gray-400 light:focus:border-gray-400"
            />
          </div>

          <!-- Reset -->
          <div v-if="store.hasActiveFilters" class="flex items-end">
            <button
              class="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-gray-400 transition hover:border-white/20 hover:text-white light:border-gray-200 light:bg-white light:text-gray-500 light:hover:border-gray-300 light:hover:text-gray-900"
              @click="store.resetFilters()"
            >
              ✕ Réinitialiser
            </button>
          </div>
        </div>
      </div>

      <!-- Count -->
      <p class="mb-4 text-xs font-semibold text-gray-500">
        {{ store.filteredFunds.length }} fonds affichés sur {{ store.funds.length }}
        <span v-if="store.hasActiveFilters" class="ml-1 text-emerald-500">· filtres actifs</span>
      </p>

      <!-- Grid -->
      <div
        v-if="store.filteredFunds.length"
        class="grid gap-4"
        style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))"
      >
        <FondCard
          v-for="fund in store.filteredFunds"
          :key="fund.id"
          :fund="fund"
          @open="store.selectFund(fund)"
        />
      </div>

      <!-- Empty state -->
      <div v-else class="flex flex-col items-center justify-center py-20 text-center">
        <div class="mb-4 text-4xl">🔍</div>
        <p class="text-base font-semibold text-gray-400 light:text-gray-500">Aucun fonds ne correspond à vos filtres</p>
        <button
          class="mt-4 cursor-pointer rounded-lg border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/12 light:border-gray-200 light:bg-white light:text-secondary-900"
          @click="store.resetFilters()"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <FondModal
    v-if="store.selectedFund"
    :fund="store.selectedFund"
    @close="store.clearSelection()"
  />
</template>

<script setup>
import { useFondsStore } from '../stores/fondsStore'
import FondCard from '../components/funds/FondCard.vue'
import FondModal from '../components/funds/FondModal.vue'
import { ALL_ENVELOPES, TYPE_LABELS } from '../data/fonds'

const store = useFondsStore()

const typeOptions = Object.entries(TYPE_LABELS)
</script>
