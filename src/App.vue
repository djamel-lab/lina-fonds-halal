<template>
  <div id="main-content" class="min-h-screen bg-[#0a0a0a] transition-colors duration-200 light:bg-[#f3f4f6]">

    <!-- Faux nav backoffice Lina -->
    <nav class="sticky top-0 z-40 border-b border-white/8 bg-[#0d0d0d]/95 backdrop-blur-sm light:border-gray-200 light:bg-white/95">
      <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div class="flex items-center gap-3">
          <!-- Logo Lina (placeholder) -->
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-xs font-bold text-emerald-400">L</div>
          <span class="text-sm font-bold text-white light:text-secondary-900">Lina Finance</span>
          <span class="text-white/20 light:text-gray-300">|</span>
          <span class="text-xs text-gray-500">Back-office</span>
        </div>

        <div class="flex items-center gap-3">
          <span class="hidden text-xs text-gray-600 sm:block">Prototype UX · v1</span>
          <ThemeToggle />
        </div>
      </div>
    </nav>

    <!-- Sidebar simulée (desktop) -->
    <div class="flex">
      <aside class="hidden w-52 shrink-0 border-r border-white/8 light:border-gray-200 lg:block">
        <nav class="sticky top-14 py-4">
          <div class="px-3">
            <p class="mb-1 px-3 text-xs font-bold uppercase tracking-wider text-gray-600">Investissements</p>
            <a
              v-for="item in sidebarItems"
              :key="item.label"
              href="#"
              class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors"
              :class="
                item.active
                  ? 'bg-white/8 font-semibold text-white light:bg-gray-100 light:text-secondary-900'
                  : 'text-gray-500 hover:bg-white/5 hover:text-gray-300 light:hover:bg-gray-50 light:hover:text-gray-700'
              "
              @click.prevent="item.active ? null : null"
            >
              <span>{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </a>
          </div>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="min-w-0 flex-1">
        <FondsView />
      </main>
    </div>
  </div>
</template>

<script setup>
import ThemeToggle from './components/ui/ThemeToggle.vue'
import FondsView from './views/FondsView.vue'

const sidebarItems = [
  { icon: '📊', label: 'Tableau de bord', active: false },
  { icon: '💼', label: 'Portefeuille', active: false },
  { icon: '🌙', label: 'Fonds halal', active: true },
  { icon: '📈', label: 'Performance', active: false },
  { icon: '📄', label: 'Documents', active: false },
]
</script>
