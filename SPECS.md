# Version 1 — Grille fonds halal avec filtres et fiche détaillée

## Non-négociables
1. Grille de 17 fonds avec 4 filtres combinables (type, enveloppe, risque, recherche)
2. Modal de fiche détaillée avec graphique historique SVG et sélecteur de période

## Hors scope
- Connexion à l'API EODHD (cours en temps réel)
- Comparateur multi-fonds côte à côte
- Ajout / modification / suppression de fonds
- Export CSV ou PDF de la fiche

## Spécification fonctionnelle

### F1 — Carte de fonds (FondCard.vue)
- Badge type coloré (Actions=bleu, Sukuk=violet, ETF=vert, etc.)
- Badge "✓ Halal" vert en haut à droite
- Nom du fonds + ISIN en police monospace
- Indicateur de risque SRI (barres dorées sur 7)
- Sparkline SVG 12 derniers mois (vert si perf positive, rouge sinon)
- NAV avec variation journalière (▲/▼)
- Ligne de performances YTD / 1an / 3ans / 5ans
- Badges enveloppes disponibles (AV Luxembourg, AV France, CTO, Capitalisation)
- Hover : légère élévation + bordure accentuée

### F2 — Filtres (FondsView.vue)
- 4 filtres : type de produit, enveloppe, risque SRI (faible/modéré/élevé), recherche texte
- Tous combinables entre eux
- Bouton "Réinitialiser" apparaît quand un filtre est actif
- Compteur "X fonds affichés sur 17"
- État vide avec bouton de reset si aucun résultat

### F3 — Modal fiche détaillée (FondModal.vue)
- Header sticky : nom, badge type, ISIN, NAV en grand, variation journalière
- Description du fonds (bloc fond légèrement différent)
- Grille de 6 stats : YTD, 1an, 3ans, 5ans, volatilité, SRI
- Graphique historique SVG plein format avec sélecteur période 1M/3M/1A/3A/5A
- Section enveloppes : affichage avec ✅/⬜ pour chaque enveloppe
- Tableau d'informations : type, devise, certificateur, date audit
- Cartes membres du Comité Charia (avatar + nom + rôle + org)
- Disclaimer crypto si fund.type === 'crypto'
- Fermeture : clic backdrop, bouton ×, touche Escape

### F4 — Dark/Light theme
- Toggle dans la navbar (lune/soleil)
- Persistance en localStorage sous la clé 'lina-theme'
- Toutes les conventions Lina : `bg-white/5 light:bg-white`, etc.

## Critères d'acceptation
- [ ] Les 17 fonds s'affichent en grille responsive
- [ ] Les 4 filtres fonctionnent et se combinent
- [ ] Le modal s'ouvre au clic sur une carte
- [ ] Le graphique affiche les données selon la période sélectionnée
- [ ] Le toggle dark/light fonctionne et persiste après rechargement
- [ ] Aucune erreur console sur Chrome/Firefox
- [ ] Responsive mobile (colonne unique)
