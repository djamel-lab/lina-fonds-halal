import { defineStore } from 'pinia'
import { FUNDS } from '../data/fonds'

export const useFondsStore = defineStore('fonds', {
  state: () => ({
    funds: FUNDS,
    filterType: '',
    filterEnveloppe: '',
    filterRisk: '',
    searchQuery: '',
    selectedFund: null,
  }),

  getters: {
    filteredFunds: (state) =>
      state.funds.filter((f) => {
        if (state.filterType && f.type !== state.filterType) return false
        if (state.filterEnveloppe && !f.enveloppes.includes(state.filterEnveloppe)) return false
        if (state.filterRisk) {
          const [lo, hi] = state.filterRisk.split('-').map(Number)
          if (f.sri < lo || f.sri > hi) return false
        }
        if (state.searchQuery) {
          const q = state.searchQuery.toLowerCase()
          if (!f.name.toLowerCase().includes(q) && !f.isin.toLowerCase().includes(q)) return false
        }
        return true
      }),

    hasActiveFilters: (state) =>
      Boolean(state.filterType || state.filterEnveloppe || state.filterRisk || state.searchQuery),
  },

  actions: {
    resetFilters() {
      this.filterType = ''
      this.filterEnveloppe = ''
      this.filterRisk = ''
      this.searchQuery = ''
    },
    selectFund(fund) {
      this.selectedFund = fund
    },
    clearSelection() {
      this.selectedFund = null
    },
  },
})
