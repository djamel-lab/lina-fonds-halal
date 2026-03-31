# lina-fonds-halal

## Ce qu'est le projet
Prototype backoffice pour visualiser et filtrer les fonds halal certifiés de la sélection Lina Finance.
Données mockées — fonctionnalité UX à valider avant intégration dans app.lina.finance.

## Stack technique
- Front : Vue.js 3 (Composition API, `<script setup>`) + JavaScript (pas TypeScript)
- State : Pinia 3
- Styling : Tailwind CSS 4
- Build : Vite
- Déploiement : GitHub Pages via Actions

## Design
- Mode : Structure first, conventions dark/light Lina
- Variant `light:` : activé via `data-theme="light"` sur `<html>` (défini dans `src/style.css`)
- Couleurs : conventions Lina (`bg-white/5`, `text-white`, `light:bg-white`, `light:text-secondary-900`)
- Composants UI isolés dans `src/components/ui/`

## Architecture des fichiers
```
src/
  data/fonds.js              → 17 fonds mockés avec historique simulé (60 mois)
  stores/fondsStore.js       → Pinia store (filtres, sélection fonds)
  components/
    ui/
      RiskBars.vue           → Indicateur de risque SRI (7 barres)
      ThemeToggle.vue        → Toggle dark/light avec persistance localStorage
    funds/
      FondCard.vue           → Carte de fonds (sparkline, NAV, perfs, enveloppes)
      FondModal.vue          → Fiche détaillée (graphique, comité, enveloppes)
      Sparkline.vue          → Mini-graphe SVG sur les cartes
      HistoryChart.vue       → Graphe SVG plein format dans le modal
  views/
    FondsView.vue            → Page principale (grille + filtres)
  App.vue                    → Layout backoffice (nav + sidebar simulée + contenu)
```

## Règles métier
- 17 fonds halal certifiés (ETF, Actions, Sukuk, SCPI, Monétaire, Crypto, Matières, Infra)
- Chaque fonds : nom, ISIN, SRI (1-7), type, enveloppes, NAV, performances YTD/1an/3ans/5ans, volatilité, historique 5 ans
- Filtres combinables : type, enveloppe, risque SRI, recherche texte
- Modal : description, stats, graphique historique SVG, enveloppes disponibles, comité Charia

## Interdits
- Pas d'appel API réel (données mockées uniquement)
- Pas de modification des données
- Pas de comparateur multi-fonds (prévu v2)
- Pas de valeurs Tailwind arbitraires (`text-[10px]` interdit)
