# BricoSearch — Moteur de recherche outils bricolage

![Phase 1 — Mock Data](https://img.shields.io/badge/Phase%201-Mock%20Data%20✅-blue?style=flat-square)
![Démo Live](https://img.shields.io/badge/Démo%20Live-🌐%20Vercel-brightgreen?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square&logo=typescript)

**BricoSearch** est un moteur de recherche et comparateur d'outils de bricolage affilié Amazon.fr.
Il permet aux bricoleurs de comparer perceuses, visseuses, meuleuses et bien plus — avec prix, avis et liens directs Amazon.
Conçu pour être mis en production en Phase 2 avec l'API officielle Amazon PA-API 5.

**Démo live : [https://bricolage-affiliation.vercel.app](https://bricolage-affiliation.vercel.app)**

---

## Stack technique

| Technologie        | Rôle                                          |
|--------------------|-----------------------------------------------|
| Next.js 15         | Framework App Router, Server Components, RSC  |
| TypeScript strict  | Typage bout en bout, zéro any                 |
| Tailwind CSS 4     | Design system utilitaire, responsive          |
| next-mdx-remote    | Blog en MDX — articles compilés côté serveur  |
| Lucide React       | Icônes cohérentes et accessibles              |
| Vercel             | Déploiement continu, Edge Network             |
| Amazon PA-API 5    | Données produits en temps réel (Phase 2)      |

---

## Fonctionnalités principales

### Moteur de recherche produits
- Recherche instantanée par mot-clé (perceuse, Bosch, visseuse sans fil…)
- Filtres par catégorie et fourchette de prix
- Tri par pertinence, prix ou avis clients
- Affichage des produits en cards avec note, prix et lien affilié Amazon

### Blog MDX
- Articles rédigés en Markdown enrichi (MDX)
- Rendu serveur via `next-mdx-remote` — SEO optimisé
- Sitemap dynamique généré automatiquement (`/sitemap.xml`)
- Metadata Open Graph par article

### API interne
- Route `/api/search?q=bosch` retourne du JSON
- En Phase 1 : données mock réalistes (ASINs Amazon réels)
- En Phase 2 : proxy vers Amazon PA-API 5 avec signature AWS4

### SEO & conformité
- Metadata `title` + `description` par page
- `robots.txt` + `sitemap.xml` dynamique
- Disclosure affiliation Amazon sur toutes les pages
- Mentions légales conformes Programme Partenaires EU

---

## Structure des dossiers

```
bricolage-affiliation/
├── src/
│   ├── app/
│   │   ├── (site)/               # Layout public (Header, Footer)
│   │   │   ├── page.tsx          # Accueil
│   │   │   ├── recherche/        # Moteur de recherche
│   │   │   ├── blog/             # Liste articles + [slug]
│   │   │   ├── about/            # À propos
│   │   │   └── mentions-legales/ # Mentions légales
│   │   ├── api/search/           # API Route — proxy PA-API
│   │   └── sitemap.ts            # Sitemap dynamique
│   ├── components/               # Composants réutilisables
│   ├── lib/                      # Logique métier (search, mdx, mock)
│   ├── content/blog/             # Articles MDX
│   └── types/                    # Types TypeScript partagés
├── public/
│   └── robots.txt
└── .env.local                    # Variables d'environnement (non versionnées)
```

---

## Installation locale

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-compte/bricolage-affiliation.git
cd bricolage-affiliation

# 2. Installer les dépendances
npm install

# 3. Créer le fichier d'environnement
cp .env.example .env.local
# Éditez .env.local (voir tableau ci-dessous)

# 4. Lancer en développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) — la Phase 1 fonctionne sans aucune clé API.

---

## Variables d'environnement

| Variable                    | Description                              | Phase 1       | Phase 2       |
|-----------------------------|------------------------------------------|---------------|---------------|
| `NEXT_PUBLIC_AFFILIATE_TAG` | Tag d'affiliation Amazon (ex: bricoshop00-21) | Requis    | Requis        |
| `MOCK_MODE`                 | `true` = données simulées                | `true`        | `false`       |
| `AMAZON_ACCESS_KEY`         | Clé d'accès PA-API                       | —             | Requis        |
| `AMAZON_SECRET_KEY`         | Clé secrète PA-API                       | —             | Requis        |
| `AMAZON_ASSOCIATE_TAG`      | Tag associé PA-API (identique au tag)    | —             | Requis        |

---

## Passer en Phase 2 (PA-API Amazon)

La Phase 2 connecte le moteur de recherche aux données Amazon en temps réel.

**Prérequis :** avoir réalisé 3 ventes qualifiées via le Programme Partenaires Amazon pour débloquer l'accès PA-API.

```bash
# 1. Obtenir les clés PA-API 5 dans votre espace Partenaires Amazon
# 2. Mettre à jour .env.local
MOCK_MODE=false
AMAZON_ACCESS_KEY=votre_access_key
AMAZON_SECRET_KEY=votre_secret_key
AMAZON_ASSOCIATE_TAG=votre-tag-21
```

**Fichiers à implémenter :**

| Fichier                         | Action                                         |
|---------------------------------|------------------------------------------------|
| `src/lib/paapi.ts`              | Client PA-API 5 avec signature AWS4            |
| `src/app/api/search/route.ts`   | Remplacer les mock data par `paapi.searchItems()` |
| `src/lib/mock-data.ts`          | Peut être supprimé ou conservé en fallback     |

---

## Guide repreneur

Checklist pour prendre en main le projet ou le livrer à un client :

- [ ] Cloner le dépôt et lancer `npm run dev` — doit fonctionner sans configuration
- [ ] Vérifier la démo live sur Vercel
- [ ] Mettre à jour `NEXT_PUBLIC_AFFILIATE_TAG` avec votre propre tag Amazon
- [ ] Personnaliser le contenu des articles dans `src/content/blog/`
- [ ] Adapter les mock data dans `src/lib/mock-data.ts` selon votre niche
- [ ] Mettre à jour les mentions légales avec vos coordonnées
- [ ] Connecter un domaine personnalisé sur Vercel
- [ ] Implémenter PA-API 5 après 3 ventes qualifiées (Phase 2)
- [ ] Activer Google Search Console et soumettre le sitemap

---

## Coût estimé

| Poste                    | Coût annuel estimé |
|--------------------------|--------------------|
| Hébergement Vercel (Hobby) | Gratuit          |
| Domaine (.fr)            | ~10 €/an           |
| Amazon Partenaires       | Gratuit            |
| PA-API 5                 | Gratuit (inclus)   |
| **Total**                | **< 15 €/an**      |

En optant pour un domaine .com ou des services premium (analytics, CDN images), le budget reste **sous 100 €/an**.

---

## Conformité affiliation

Ce site participe au **Programme Partenaires d'Amazon EU**, un programme d'affiliation conçu pour permettre à des sites de percevoir une rémunération grâce à la création de liens vers Amazon.fr.
En tant que Partenaire Amazon, BricoSearch réalise des bénéfices sur les achats remplissant les conditions requises.
