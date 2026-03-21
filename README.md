# BricoSearch — Outils de bricolage au meilleur prix

![Phase 1 — Mock Data](https://img.shields.io/badge/Phase-1%20Mock%20Data-blue)

Moteur de recherche et site d'affiliation Amazon dédié à l'outillage bricolage. Comparez perceuses, visseuses, meuleuses et bien plus — avec prix et avis Amazon en temps réel (Phase 2).

Construit avec Next.js 14 App Router, TypeScript strict et Tailwind CSS.

---

## Stack technique

| Technologie       | Rôle                                      |
|-------------------|-------------------------------------------|
| Next.js 14        | Framework (App Router, Server Components) |
| TypeScript        | Typage strict                             |
| Tailwind CSS      | Styles utilitaires                        |
| Lucide React      | Icônes                                    |
| next-mdx-remote   | Articles de blog en MDX (Phase 2)         |
| Amazon PA-API 5   | Données produits en temps réel (Phase 2)  |

---

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-compte/bricolage-affiliation.git
cd bricolage-affiliation

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Éditez .env.local selon vos besoins

# 4. Lancer en développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## Variables d'environnement

| Variable                   | Description                              | Valeur par défaut    |
|----------------------------|------------------------------------------|----------------------|
| `NEXT_PUBLIC_AFFILIATE_TAG`| Tag d'affiliation Amazon                 | `bricomaison-21`     |
| `MOCK_MODE`                | `true` = données simulées (Phase 1)      | `true`               |
| `AMAZON_ACCESS_KEY`        | Clé d'accès PA-API (Phase 2)             | —                    |
| `AMAZON_SECRET_KEY`        | Clé secrète PA-API (Phase 2)             | —                    |
| `AMAZON_ASSOCIATE_TAG`     | Tag associé PA-API (Phase 2)             | —                    |

---

## Structure des dossiers

```
src/
├── app/
│   ├── (site)/           # Pages publiques avec Header/Footer
│   │   ├── page.tsx      # Accueil
│   │   ├── recherche/    # Moteur de recherche
│   │   ├── blog/         # Articles MDX
│   │   ├── about/
│   │   └── mentions-legales/
│   └── api/search/       # API Route proxy PA-API
├── components/           # Composants réutilisables
├── lib/                  # Logique métier (search, utils, mock)
├── content/              # Articles MDX (Phase 2)
└── types/                # Types TypeScript partagés
```

---

## Routes disponibles

| Route                        | Description                         |
|------------------------------|-------------------------------------|
| `/`                          | Page d'accueil                      |
| `/recherche`                 | Moteur de recherche produits        |
| `/blog`                      | Liste des articles                  |
| `/blog/[slug]`               | Article individuel                  |
| `/about`                     | À propos                            |
| `/mentions-legales`          | Mentions légales                    |
| `/api/search?q=bosch`        | API JSON de recherche produits      |

---

## Passer en Phase 2 (données Amazon réelles)

1. Obtenir vos clés PA-API 5 via le Programme Partenaires Amazon
2. Renseigner `.env.local` :
   ```env
   MOCK_MODE=false
   AMAZON_ACCESS_KEY=votre_cle
   AMAZON_SECRET_KEY=votre_secret
   AMAZON_ASSOCIATE_TAG=votre-tag-21
   ```
3. Implémenter `src/lib/paapi.ts` avec le client PA-API
4. Mettre à jour `src/app/api/search/route.ts` pour utiliser `paapi.searchItems()`

---

## Démo live

🌐 Démo live : https://bricolage-affiliation.vercel.app

---

## Mentions légales

Ce site participe au Programme Partenaires d'Amazon EU.
