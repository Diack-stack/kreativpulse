# KREATIV'PULSE — MÉMOIRE COMPLÈTE DU PROJET & CONTEXTE DE DÉVELOPPEMENT

> **Ce fichier est lu automatiquement par Antigravity à chaque ouverture du projet.** Il contient l'ensemble de la mémoire, de l'historique des discussions, des décisions de design et de l'architecture technique pour garantir une continuité parfaite entre les sessions de travail sur n'importe quel ordinateur.

---

## 1. Contexte & Objectif Global

- **Entreprise :** Kreativ'Pulse — Agence de communication visuelle, digitale, événementielle et audiovisuelle basée à Dakar, Sénégal.
- **Site actuel existant (à refondre) :** `https://kreativpulse.net/` (construit sous WordPress avec thème Bridge / WPBakery, jugé vieillissant, lent et peu engageant).
- **Auteur & Utilisateur :** Stagiaire en graphisme / design chez Kreativ'Pulse.
  - Maître de stage : Responsable IT & Digital de l'entreprise (développeur web).
  - Objectif : Présenter une refonte complète, ultra-moderne, dynamique et impressionnante ("effet WOW") au maître de stage et à la direction pour valoriser le savoir-faire créatif de l'agence.
- **Dépôt GitHub :** [https://github.com/Diack-stack/kreativpulse](https://github.com/Diack-stack/kreativpulse)
- **Branche active :** `main`

---

## 2. Charte Graphique & Tokens de Design

L'identité visuelle a été strictement définie et validée lors des échanges :

| Élément | Valeur / Règle | Utilisation |
| :--- | :--- | :--- |
| **Fond sombre principal** | `#08090C` / `#0B0D13` | Ambiance dark mode cinématographique premium |
| **Orange signature** | `#FF7500` (Orange Kreativ'Pulse) | Accent principal, lueurs néon (`rgba(255,117,0,0.35)`), boutons actifs, highlights |
| **Orange secondaire / dégradé** | `#FF8A00`, `#FF5500` | Dégradés dynamiques, bordures luminescentes |
| **Accent froid (contraste)** | `#00F2FE` / `#4FACFE` | Touches subtiles de cyan/teal pour faire ressortir l'orange |
| **Surfaces & Cartes** | Glassmorphism sombre | Fond `rgba(255, 255, 255, 0.03)` à `0.05`, bordure `rgba(255, 255, 255, 0.08)`, blur `16px` |
| **Typographies** | `Outfit`, `Plus Jakarta Sans`, `Inter` | Titres géométriques percutants, corps de texte lisible |
| **Langue du site** | **100% Français** | Aucun résidu d'anglais ("Get a Quote" -> "Demander un devis", "Brief Us" -> "Lancer un projet", etc.) |

---

## 3. Coordonnées Officielles de l'Agence (Validées)

- **Adresse exacte :** `Sicap Liberté 5/C Immeuble Adja Binta Ndiaye n° 5656, Dakar — Sénégal`
  *(Règle stricte : Ne jamais utiliser "Sacré-Cœur 3" ou "VDN" qui étaient des adresses de placeholder)*
- **Téléphone :** `+221 33 827 80 80` / `+221 77 000 00 00`
- **Email :** `contact@kreativpulse.net`
- **Horaires :** `Lundi – Vendredi : 08h30 – 18h00`

---

## 4. Réalisations & Composants Clés Déjà Développés

### A. Navigation & En-tête (Navbar)
- Logo officiel de marque avec les 4 barres arrondies emblématiques (Kreativ'Pulse).
- Menu fluide : *Accueil, À propos, Piliers & Services, Réalisations, Témoignages, Studio Brief / Contact*.
- Effet de verre dépoli (`backdrop-filter`) au défilement et CTA orange pulsant.
- Contrôle strict du bouton hamburger mobile (verrouillé pour ne jamais s'afficher sur desktop).

### B. Section Hero avec Défilement 3D en Arc
- Titre accrocheur avec lueur néon orange : *"Donnez du pouls à votre marque"*.
- Carrousel interactif en arc 3D inspiré des références de design modernes.
- Compteurs statistiques animés (projets livrés, années d'expertise, satisfaction client).

### C. Marquee des 16 Partenaires & Clients Officiels
- Ruban défilant continu (`infinite marquee`) présentant les **16 vrais logos transparents** :
  *SENELEC, DP World Dakar, SOGIP Diamniadio, SONAGED, Fédération Sénégalaise de Football (FSF), ANER, COSEC, DHL Express, FHS Habitat, Sentrak Logistics, SONACOS, CROUS Diamniadio, GSEF Dakar, CAF Awards, BHS Banque, SICAP SA*.

### D. Portfolio Complet : Les 15 Vrais Projets Kreativ'Pulse
Tous les 15 projets du site live ont été récupérés, structurés et intégrés dans `app.js` et `index.html` :
1. **Collé Sow Ardo** — Haute couture & Mode africaine (Identité & Shooting)
2. **GSEF Dakar 2023** — Forum Mondial Économie Sociale et Solidaire (Scénographie & Branding)
3. **SONACOS** — Leader agroalimentaire sénégalais (Campagne digitale & Packaging)
4. **Ergobit** — Solutions ergonomiques & tech (Branding & Web)
5. **Sentrak Logistics** — Logistique & fret multimodal (Identité de marque & Supports)
6. **SENELEC Woyofal** — Campagne institutionnelle d'électricité prépayée
7. **DP World Dakar Terminal** — Communication corporate & événementielle portuaire
8. **SOGIP Diamniadio** — Signalétique & communication du pôle urbain
9. **SONAGED Éco-Gestes** — Campagne nationale de salubrité et sensibilisation
10. **Lions du Sénégal (FSF)** — Campagne CAN & visuels de soutien supporters
11. **DHL Express Sénégal** — Campagnes promotionnelles B2B et retail
12. **BHS Banque de l'Habitat** — Communication digitale produits immobiliers
13. **ANER Énergies Renouvelables** — Rapport d'activité & supports de plaidoyer
14. **CROUS Diamniadio** — Signalétique campus et supports étudiants
15. **SICAP SA 70 Ans** — Événement anniversaire et livre d'or institutionnel

- **Galerie Lightbox Multi-Images :** Chaque projet supporte une galerie interactive avec navigation précédent/suivant, miniatures cliquables, zoom et description complète.

### E. Hub Interactif "Studio Brief" & Contact Glassmorphic
- Design inspiré de la maquette de référence validée par l'utilisateur.
- Sélecteur de services sous forme de pilules tactiles (Branding, Web, Audiovisuel, Événementiel, Stratégie).
- Sélecteur de budget interactif.
- Champs de saisie élégants avec focus orange néon.
- Carte d'information directe avec l'adresse officielle de Liberté 5.
- Traduction 100% française de tous les textes.

---

## 5. Architecture Technique des Fichiers

```
Kreativ'Pulse/
├── AGENTS.md                  # Mémoire globale pour Antigravity (ce fichier)
├── GEMINI.md                  # Règle miroir pour agents Gemini / Antigravity
├── .agents/
│   └── rules/
│       └── kreativpulse_memory.md # Règle de contexte workspace injectée
├── index.html                 # Structure sémantique HTML5 complète
├── style.css                  # Système de design CSS vanilla moderne & responsive
├── app.js                     # Logique interactive, données des 15 projets, lightbox, filtres
├── serve.js                   # Serveur de dev Express avec LiveReload & port fallback
├── package.json               # Dépendances (express, ws, chokidar)
├── vercel.json                # Configuration pour déploiement en production
├── assets/                    # Logos authentiques, images réelles des projets
│   ├── logos/                 # 16 logos officiels transparents + logo Kreativ'Pulse
│   └── projects/              # Médias et visuels réels des projets du portfolio
└── docs/                      # Documentation, audit UI/UX, historiques
    ├── AUDIT_UI_UX.md         # Rapport d'audit initial du site wordpress existant
    ├── PROJECT_MEMORY.md      # Documentation détaillée de reprise
    └── session_history/       # Sauvegarde des transcripts et logs de session
```

---

## 6. Guide de Reprise Rapide au Bureau

Lorsque vous arrivez au bureau :

1. **Cloner le projet :**
   ```bash
   git clone https://github.com/Diack-stack/kreativpulse.git
   cd kreativpulse
   ```
2. **Installer les dépendances et lancer :**
   ```bash
   npm install
   npm start
   ```
   *(Le site s'ouvre automatiquement sur `http://localhost:3000`)*

3. **Ouvrir dans Antigravity :**
   Ouvrez simplement le dossier `kreativpulse` dans Antigravity.
   Grâce à ce fichier `AGENTS.md` et `.agents/rules/`, Antigravity charge automatiquement toute la mémoire du projet.

4. **Premier message à taper dans Antigravity au bureau :**
   > *"Salut ! On continue le projet Kreativ'Pulse là où on s'est arrêté."*
   L'agent saura immédiatement tout ce qui a été fait et pourra enchaîner sans aucune perte d'information !
