// ─── Génération d'historique fictif ──────────────────────────────────────────
function genHistory(seed, months, startPrice, annualTrend, annualVol) {
  const points = []
  let price = startPrice
  let rng = seed
  const pseudo = () => {
    rng = (Math.imul(rng, 1664525) + 1013904223) | 0
    return (rng >>> 0) / 0xffffffff
  }
  const now = new Date(2026, 2, 1)
  const monthlyTrend = annualTrend / 12
  const monthlyVol = annualVol / Math.sqrt(12)
  for (let i = months; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const shock = (pseudo() - 0.5) * 2 * monthlyVol
    price = Math.max(price * (1 + monthlyTrend + shock), 0.01)
    points.push({ date: d.toISOString().slice(0, 7), close: Math.round(price * 100) / 100 })
  }
  return points
}

// ─── 17 fonds halal certifiés (données mockées) ───────────────────────────────
export const FUNDS = [
  {
    id: 'damanis', name: 'Compte Damanis – Banque Chaabi', isin: '', sri: 1,
    type: 'monetaire', enveloppes: [],
    description: 'Compte de dépôt islamique sans intérêt (Riba). Capital garanti, liquidité totale. Rémunération via partage des bénéfices bancaires (Moudharaba).',
    nav: 1.00, currency: 'EUR', changePct: 0.00,
    perfYtd: 0.8, perf1y: 2.1, perf3y: 5.2, perf5y: 8.4, vol: 0.2,
    history: genHistory(1, 60, 1.00, 0.021, 0.004),
    comite: [{ name: 'Dr. Hassan Moussaoui', role: 'Président du Comité Charia', org: 'Banque Chaabi' }],
  },
  {
    id: 'future-life', name: 'Fonds Infrastructure Future Life', isin: '', sri: 2,
    type: 'infra', enveloppes: ['AV Luxembourg'],
    description: "Fonds d'infrastructure investissant dans des projets concrets (énergie renouvelable, transport, social) en Europe et Amérique latine. Conforme par screening sectoriel.",
    nav: 118.45, currency: 'EUR', changePct: 0.12,
    perfYtd: 2.3, perf1y: 5.8, perf3y: 14.2, perf5y: 22.1, vol: 5.1,
    history: genHistory(2, 60, 90, 0.058, 0.05),
    comite: [{ name: 'Sheikh Yusuf DeLorenzo', role: 'Président', org: 'AAOIFI' }],
  },
  {
    id: 'ncap', name: 'SCPI Ncap Éducation Santé', isin: '', sri: 3,
    type: 'immobilier', enveloppes: [],
    description: "SCPI thématique investissant dans l'immobilier d'éducation et de santé en France et en Europe. Actifs conformes par nature (secteurs éthiques).",
    nav: 192.00, currency: 'EUR', changePct: 0.00,
    perfYtd: 1.1, perf1y: 4.2, perf3y: 10.5, perf5y: null, vol: 3.8,
    history: genHistory(3, 36, 175, 0.042, 0.03),
    comite: [{ name: 'Dr. Karim Laïdouni', role: 'Superviseur Charia', org: 'COFRAC' }],
  },
  {
    id: 'franklin-sukuk', name: 'Franklin Global Sukuk Fund', isin: 'LU0923115975', sri: 3,
    type: 'obligations', enveloppes: ['AV Luxembourg', 'AV France', 'Capitalisation'],
    description: "Fonds obligataire islamique (Sukuk) diversifié à l'échelle mondiale. Exposition Moyen-Orient (45 %) et Asie (30 %). Notation moyenne BB+.",
    nav: 10.24, currency: 'EUR', changePct: -0.18,
    perfYtd: 1.4, perf1y: 4.6, perf3y: 8.9, perf5y: 16.3, vol: 4.2,
    history: genHistory(4, 60, 8.5, 0.046, 0.044),
    comite: [
      { name: 'Sheikh Nizam Yaqoobi', role: 'Président', org: 'Franklin Templeton' },
      { name: 'Dr. Abdul Sattar Abu Ghuddah', role: 'Membre', org: 'AAOIFI' },
    ],
    certificateur: 'Franklin Templeton Charia Board', certifDate: 'Juillet 2024',
  },
  {
    id: 'bnp-hilal', name: 'BNP Paribas Islamic Hilal Income', isin: 'LU2374587298', sri: 3,
    type: 'obligations', enveloppes: ['AV Luxembourg', 'AV France', 'Capitalisation'],
    description: 'Fonds Sukuk géré par BNP Paribas AM. Allocation Moyen-Orient (55 %) et Asie (25 %). Distribution trimestrielle.',
    nav: 98.72, currency: 'EUR', changePct: 0.09,
    perfYtd: 1.9, perf1y: 5.1, perf3y: 10.2, perf5y: 18.7, vol: 4.8,
    history: genHistory(5, 60, 82, 0.051, 0.048),
    comite: [
      { name: 'Dr. Mohamed Daud Bakar', role: 'Président', org: 'BNP Paribas Islamic' },
      { name: 'Sheikh Essam Khalaf', role: 'Membre', org: 'BNP Paribas Islamic' },
    ],
    certificateur: 'BNP Paribas Islamic Advisory Board', certifDate: 'Octobre 2024',
  },
  {
    id: 'hsbc-equity', name: 'HSBC Islamic Global Equity', isin: 'LU0806931092', sri: 5,
    type: 'actions', enveloppes: ['AV Luxembourg', 'AV France', 'Capitalisation'],
    description: 'Fonds actions mondiales conformes Charia. Forte exposition Amérique du Nord (81 %). Réplication MSCI World Islamic avec filtrage sectoriel actif.',
    nav: 34.18, currency: 'EUR', changePct: 1.24,
    perfYtd: 4.7, perf1y: 18.3, perf3y: 42.1, perf5y: 98.4, vol: 16.2,
    history: genHistory(6, 60, 17, 0.183, 0.17),
    comite: [
      { name: 'Sheikh Muhammad Al-Tayyeb', role: 'Superviseur', org: 'HSBC Amanah' },
      { name: 'Dr. Aznan Hasan', role: 'Conseiller', org: 'HSBC Amanah' },
    ],
    certificateur: 'HSBC Amanah Charia Committee', certifDate: 'Novembre 2024',
  },
  {
    id: 'hsbc-em-etf', name: 'HSBC MSCI EM Islamic ETF', isin: 'IE0009BC6K22', sri: 4,
    type: 'etf', enveloppes: ['AV France', 'CTO'],
    description: "ETF répliquant l'indice MSCI Emerging Markets Islamic. Exposition Asie (65 %). TER : 0,60 %.",
    nav: 8.42, currency: 'EUR', changePct: 0.67,
    perfYtd: 3.2, perf1y: 12.1, perf3y: 18.4, perf5y: 31.6, vol: 13.4,
    history: genHistory(7, 60, 6.1, 0.121, 0.13),
    comite: [{ name: 'HSBC Amanah Committee', role: 'Comité Charia Groupe', org: 'HSBC' }],
  },
  {
    id: 'hsbc-eu-etf', name: 'HSBC MSCI Europe Islamic ETF', isin: 'IE000AGFZM58', sri: 4,
    type: 'etf', enveloppes: ['CTO'],
    description: 'ETF actions européennes conformes Charia. France 27 %, reste Europe 67 %. TER : 0,50 %.',
    nav: 12.88, currency: 'EUR', changePct: 0.33,
    perfYtd: 5.1, perf1y: 9.8, perf3y: 22.3, perf5y: null, vol: 12.1,
    history: genHistory(8, 36, 10.2, 0.098, 0.12),
    comite: [{ name: 'HSBC Amanah Committee', role: 'Comité Charia Groupe', org: 'HSBC' }],
  },
  {
    id: 'hsbc-world-etf', name: 'HSBC MSCI World Islamic ETF', isin: 'IE000X9FTI22', sri: 4,
    type: 'etf', enveloppes: ['CTO'],
    description: 'ETF mondial islamique. Amérique du Nord 65 %, Europe 15 %, Asie 10 %. TER : 0,50 %.',
    nav: 9.14, currency: 'USD', changePct: 0.88,
    perfYtd: 3.9, perf1y: 14.2, perf3y: 28.7, perf5y: null, vol: 14.8,
    history: genHistory(9, 36, 7.2, 0.142, 0.145),
    comite: [{ name: 'HSBC Amanah Committee', role: 'Comité Charia Groupe', org: 'HSBC' }],
  },
  {
    id: 'ishares-world', name: 'iShares MSCI World Islamic ETF', isin: 'IE00B27YCN58', sri: 4,
    type: 'etf', enveloppes: ['CTO'],
    description: 'ETF iShares répliquant MSCI World Islamic. USA 64 %. Géré par BlackRock. TER : 0,60 %.',
    nav: 46.21, currency: 'USD', changePct: 0.95,
    perfYtd: 4.1, perf1y: 15.8, perf3y: 31.4, perf5y: 72.3, vol: 15.1,
    history: genHistory(10, 60, 27.8, 0.158, 0.155),
    comite: [{ name: 'BlackRock Islamic Advisory Board', role: 'Comité Charia', org: 'BlackRock' }],
  },
  {
    id: 'ishares-usa', name: 'iShares MSCI USA Islamic ETF', isin: 'IE00B296QM64', sri: 4,
    type: 'etf', enveloppes: ['CTO'],
    description: 'ETF concentré sur actions américaines conformes Charia. 100 % Amérique du Nord. TER : 0,50 %.',
    nav: 58.74, currency: 'USD', changePct: 1.12,
    perfYtd: 5.3, perf1y: 19.4, perf3y: 38.9, perf5y: 87.6, vol: 16.8,
    history: genHistory(11, 60, 33.2, 0.194, 0.175),
    comite: [{ name: 'BlackRock Islamic Advisory Board', role: 'Comité Charia', org: 'BlackRock' }],
  },
  {
    id: 'ishares-em', name: 'iShares MSCI EM Islamic ETF', isin: 'IE00B27YCP72', sri: 4,
    type: 'etf', enveloppes: ['CTO'],
    description: 'ETF marchés émergents islamiques. Asie (76 %), Amérique latine (7 %). TER : 0,85 %.',
    nav: 22.15, currency: 'USD', changePct: 0.41,
    perfYtd: 2.8, perf1y: 11.3, perf3y: 15.6, perf5y: 28.9, vol: 13.9,
    history: genHistory(12, 60, 15.8, 0.113, 0.135),
    comite: [{ name: 'BlackRock Islamic Advisory Board', role: 'Comité Charia', org: 'BlackRock' }],
  },
  {
    id: 'bnp-equity', name: 'BNP Paribas Islamic Equity Optimiser', isin: 'LU0245286777', sri: 4,
    type: 'actions', enveloppes: ['AV Luxembourg'],
    description: 'Fonds actions mondiales islamiques géré par BNP Paribas AM. Sélection optimisée via score qualité financière et ESG.',
    nav: 42.80, currency: 'USD', changePct: 0.76,
    perfYtd: 3.5, perf1y: 13.7, perf3y: 29.4, perf5y: 61.2, vol: 13.5,
    history: genHistory(13, 60, 26.5, 0.137, 0.133),
    comite: [{ name: 'Dr. Mohamed Daud Bakar', role: 'Président', org: 'BNP Paribas Islamic' }],
  },
  {
    id: 'invesco-dj', name: 'Invesco DJ Islamic Global ETF', isin: 'IE000UOXRAM8', sri: 4,
    type: 'etf', enveloppes: ['CTO'],
    description: 'ETF Dow Jones Islamic certifié par Amanie Advisors. Amérique du Nord 80 %, audit annuel conforme. TER : 0,40 %.',
    nav: 11.58, currency: 'USD', changePct: 0.84,
    perfYtd: 4.4, perf1y: 16.1, perf3y: 33.8, perf5y: null, vol: 15.6,
    history: genHistory(14, 36, 8.8, 0.161, 0.158),
    comite: [
      { name: 'Dr. Osama Al Dereai', role: 'Membre du Conseil Charia', org: 'Amanie Advisors' },
      { name: 'Idris Mojaddidi', role: 'Directeur Audit & Conformité', org: 'Amanie Advisors Ltd.' },
    ],
    certificateur: 'Amanie Advisors Ltd.', certifDate: '21 décembre 2024',
  },
  {
    id: 'templeton', name: 'Templeton Shariah Global Equity', isin: 'LU0792757196', sri: 4,
    type: 'actions', enveloppes: ['AV Luxembourg'],
    description: 'Fonds actions mondiales Charia Franklin Templeton. USA 44 %, Europe 19 %, Asie 17 %. Approche value.',
    nav: 18.91, currency: 'USD', changePct: 0.52,
    perfYtd: 2.7, perf1y: 11.9, perf3y: 25.1, perf5y: 54.8, vol: 12.8,
    history: genHistory(15, 60, 12.1, 0.119, 0.124),
    comite: [{ name: 'Sheikh Nizam Yaqoobi', role: 'Président', org: 'Franklin Templeton' }],
    certificateur: 'Franklin Templeton Charia Board', certifDate: 'Juillet 2024',
  },
  {
    id: 'gold', name: 'iShares Physical Gold ETC', isin: 'IE00B4ND3602', sri: 4,
    type: 'matieres', enveloppes: ['CTO'],
    description: "ETC adossé à de l'or physique. Valeur refuge dans un portefeuille halal. L'or est une réserve de valeur largement admise.",
    nav: 44.62, currency: 'USD', changePct: -0.31,
    perfYtd: 8.2, perf1y: 28.4, perf3y: 45.9, perf5y: 82.1, vol: 11.4,
    history: genHistory(16, 60, 25.1, 0.284, 0.115),
    comite: [{ name: 'BlackRock Islamic Advisory Board', role: 'Comité Charia', org: 'BlackRock' }],
  },
  {
    id: 'btc', name: 'Bitcoin', isin: 'BTC', sri: 7,
    type: 'crypto', enveloppes: ['CTO'],
    description: 'Cryptomonnaie décentralisée. Volatilité très élevée (SRI 7). Avis divergents sur la conformité Charia — certains scholars admettent, d\'autres prohibent.',
    nav: 82450, currency: 'USD', changePct: 2.14,
    perfYtd: 12.4, perf1y: 68.2, perf3y: 210.4, perf5y: 890.3, vol: 68.4,
    history: genHistory(17, 60, 15000, 0.682, 0.56),
    comite: [],
  },
]

export const TYPE_LABELS = {
  actions: 'Actions', obligations: 'Sukuk', etf: 'ETF',
  immobilier: 'SCPI / Immobilier', monetaire: 'Monétaire',
  crypto: 'Crypto', matieres: 'Matières premières', infra: 'Infrastructure',
}

export const TYPE_COLORS = {
  actions: '#3B82F6', obligations: '#8B5CF6', etf: '#10B981',
  immobilier: '#F59E0B', monetaire: '#6B7280', crypto: '#F97316',
  matieres: '#EAB308', infra: '#06B6D4',
}

export const ALL_ENVELOPES = ['AV Luxembourg', 'AV France', 'CTO', 'Capitalisation']
