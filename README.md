# Portfolio — Mohamed Adnane Larhrissi

Portfolio personnel single-page d'ingénieur en systèmes embarqués.
Site statique, dark-mode par défaut, optimisé pour la performance et le SEO.

**Stack** : Next.js 14 (App Router) · TypeScript strict · Tailwind CSS · Framer Motion · lucide-react.

---

## Démarrage

### Prérequis

- Node.js ≥ 18.17 (Next.js 14 requirement)
- npm, pnpm ou yarn

### Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
# → http://localhost:3000

# 3. Build de production
npm run build

# 4. Lancer le build localement
npm start
```

### Scripts

| Script | Description |
|---|---|
| `npm run dev` | Serveur dev avec HMR |
| `npm run build` | Build de production (statique) |
| `npm start` | Sert le build localement |
| `npm run lint` | Lint via ESLint |
| `npm run typecheck` | Vérifie les types (tsc --noEmit) |

---

## Personnalisation

Tout le contenu vit dans `/data/`. Les types sont déclarés dans `lib/types.ts`
— modifier les données = TypeScript te crie dessus si tu casses la forme.

### 1. Profil et coordonnées

**`data/profile.ts`** — nom, titre, email, téléphone, liens sociaux, chemin du CV.

```ts
export const profile: Profile = {
  name: "...",
  email: "...",
  github: "monhandle",
  githubUrl: "https://github.com/monhandle",
  // ...
};
```

> **CV PDF** : place ton CV compilé sous `public/cv.pdf`. Le bouton "Télécharger mon CV" pointe sur `/cv.pdf` par défaut (cf. `profile.cvPath`).

### 2. Projets

**`data/projects.ts`** — un tableau de `Project`. Chaque projet a :

- `slug` : utilisé dans l'URL `/projects/<slug>`
- `title`, `tagline`, `summary` : affichés sur la carte de la home
- `stack` : badges techno
- `highlights` : bullets courts (page deep-dive)
- `deepDive.problem` / `architecture` / `decisions` / `learnings` : sections de la page projet
- `deepDive.codeSnippet` : extrait de code stylisé (optionnel)
- `deepDive.diagram` : composant React qui rend un SVG (optionnel)

**Ajouter un projet** :
1. Si besoin, créer le diagramme SVG dans `components/projects/diagrams/MonProjetDiagram.tsx` (s'inspirer des existants — `BootloaderDiagram`, `RiscvDiagram`, `WeatherDiagram` — qui sont entièrement thémés via les CSS variables).
2. Ajouter une entrée dans `projects` :

```ts
{
  slug: "mon-projet",
  title: "...",
  tagline: "...",
  // ...
  deepDive: {
    problem: "...",
    architecture: "...",
    decisions: [{ title: "...", body: "..." }],
    learnings: ["..."],
    codeSnippet: { language: "c", title: "src/main.c", code: "..." },
    diagram: MonProjetDiagram,
  },
}
```

La page `/projects/mon-projet` est générée automatiquement (SSG via `generateStaticParams`), pas de routing supplémentaire à faire.

### 3. Expériences

**`data/experiences.ts`** — tableau ordonné (le plus récent en premier).

### 4. Compétences

**`data/skills.ts`** — groupes de badges. Chaque groupe a un `label` et un tableau d'`items`.

### 5. Formation

**`data/education.ts`** — entrées simples (école, diplôme, période, lieu).

---

## Couleurs et thème

Le thème est piloté par des CSS variables HSL dans `app/globals.css`.

```css
.dark {
  --background: 240 6% 5%;     /* fond */
  --foreground: 210 20% 96%;    /* texte */
  --accent: 217 91% 60%;        /* IBM blue */
  /* ... */
}
```

Pour **changer l'accent** (par exemple passer en vert terminal `142 76% 47%` ou en ambre `27 96% 61%`), édite la valeur de `--accent` dans `.dark` et `:root`. Toute l'UI suit automatiquement.

Le toggle clair/sombre est géré par `next-themes` (cf. `components/shared/ThemeProvider.tsx`).

---

## Typographie

- **Sans-serif** : Inter (variable, self-hosted via `next/font/google`)
- **Monospace** : JetBrains Mono (idem)

Pour changer la police, édite `app/layout.tsx` :

```ts
import { Inter, JetBrains_Mono } from "next/font/google";
// → remplacer par Geist, Roboto Mono, etc.
```

---

## Structure du projet

```
.
├── app/
│   ├── layout.tsx                      # Root layout, fonts, metadata, theme
│   ├── page.tsx                        # Home (composition des sections)
│   ├── globals.css                     # Tailwind + variables CSS theme
│   ├── not-found.tsx                   # 404
│   ├── sitemap.ts                      # /sitemap.xml dynamique
│   ├── robots.ts                       # /robots.txt
│   └── projects/[slug]/page.tsx        # Pages deep-dive (SSG)
│
├── components/
│   ├── sections/                       # Hero, About, Projects, Experience, ...
│   ├── projects/                       # ProjectCard, ProjectDeepDive, TechBadge
│   │   └── diagrams/                   # 3 diagrammes SVG inline
│   ├── shared/                         # Navbar, Footer, ThemeToggle, CodeBlock, ...
│   └── ui/                             # Primitives (button, badge, card, separator)
│
├── data/                               # Source unique du contenu — tout est typé
│   ├── profile.ts
│   ├── projects.ts
│   ├── experiences.ts
│   ├── skills.ts
│   └── education.ts
│
├── lib/
│   ├── types.ts                        # Types partagés (Project, Experience, ...)
│   └── utils.ts                        # cn() helper
│
├── public/                             # /cv.pdf, /favicon.ico, /og.png, ...
│
└── (config) package.json, tsconfig.json, tailwind.config.ts, next.config.mjs, ...
```

---

## SEO

- **Metadata** : `app/layout.tsx` définit `title`, `description`, `openGraph`, `twitter`, `keywords`.
- **Sitemap** : `app/sitemap.ts` génère `/sitemap.xml` automatiquement (home + chaque projet).
- **Robots** : `app/robots.ts` autorise l'indexation.
- **URL canonique** : configurable via la variable d'environnement `NEXT_PUBLIC_SITE_URL` (par défaut `https://larhrissi.dev`).

### OG image

Pour générer une vraie image OG (1200×630), tu peux :
1. Soit déposer une image statique sous `public/og.png` et la référencer dans `app/layout.tsx → openGraph.images`.
2. Soit créer une route `app/opengraph-image.tsx` avec `ImageResponse` de `next/og` (cf. doc Next.js).

---

## Déploiement Vercel

1. Pousser le code sur GitHub.
2. Sur [vercel.com](https://vercel.com), **New Project** → importer le repo.
3. Pas de variables d'environnement obligatoires.
   - Recommandé : `NEXT_PUBLIC_SITE_URL=https://ton-domaine.dev` pour que le sitemap et l'OG pointent vers la bonne URL.
4. **Deploy**. C'est tout — pas de build setting custom à toucher.

Le site est entièrement statique (SSG) : tous les pages projet sont pré-générées au build, zéro runtime serveur.

### Domaine custom

Dans **Settings → Domains** sur Vercel, ajouter ton domaine. Vercel gère le HTTPS automatiquement.

---

## Performance

Cibles atteintes par défaut (à vérifier après ton premier deploy avec Lighthouse / PageSpeed) :

- ✅ Pas de JS bloquant — Next.js statique
- ✅ Fonts auto-hébergées via `next/font` — zéro layout shift
- ✅ CSS minimal — Tailwind compile uniquement ce qui est utilisé
- ✅ Pas d'images bitmap — diagrammes en SVG inline
- ✅ Animations Framer Motion limitées au scroll-into-view (lazy)
- ✅ Compression gzip activée

---

## Accessibilité

- HTML sémantique : `<main>`, `<section>`, `<article>`, `<nav>`, `<ol>` avec `aria-label`.
- Contrastes WCAG AA en thème sombre comme clair.
- Navigation clavier complète : tous les liens et boutons sont focusables avec un ring visible.
- `aria-label` sur les boutons d'icône (theme toggle, social links).
- `prefers-reduced-motion` respecté par Framer Motion par défaut.

---

## Maintenance courante

| Action | Fichier |
|---|---|
| Changer mon titre / accroche | `data/profile.ts` |
| Ajouter une expérience | `data/experiences.ts` |
| Ajouter un projet | `data/projects.ts` (+ optionnellement un diagramme dans `components/projects/diagrams/`) |
| Modifier les compétences | `data/skills.ts` |
| Mettre à jour le CV | déposer `public/cv.pdf` |
| Changer la couleur d'accent | `--accent` dans `app/globals.css` |
| Ajouter une section | composant dans `components/sections/`, importer dans `app/page.tsx`, ajouter au nav dans `components/shared/Navbar.tsx` |

---

## License

MIT — utilise et adapte librement.
