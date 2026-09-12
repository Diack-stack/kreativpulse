# ⚡ Kreativ'Pulse — Refonte UI/UX & Prototype Interactif

[![Status](https://img.shields.io/badge/Status-Prototype%20Actif-FF7500.svg)](https://github.com/Diack-stack/kreativpulse)
[![Design](https://img.shields.io/badge/Design-Dark%20%2B%20Orange%20Signature-12151C.svg)](https://github.com/Diack-stack/kreativpulse)
[![Location](https://img.shields.io/badge/Location-Dakar%2C%20S%C3%A9n%C3%A9gal-00A86B.svg)](https://kreativpulse.net/)

> **Projet de refonte d'interface et d'expérience utilisateur (UI/UX) pour le site web de l'agence de communication globale & digitale Kreativ'Pulse à Dakar.**

---

## 🎯 Objectifs du Projet

1. **Sublimer l'identité visuelle** : Moderniser l'image de marque de Kreativ'Pulse avec un thème sombre élégant et dynamique, rehaussé de la couleur signature orange (`#FF7500`) et d'effets de verre dépoli (*glassmorphism*).
2. **Corriger les faiblesses ergonomiques du site existant** :
   - Élimination des chevauchements de texte et boutons sur écrans mobiles.
   - Restitution complète des cartes de services (contenu, livrables, call-to-actions).
   - Portfolio épuré et filtrable en haute définition (suppression de l'obstruction par le disque central).
   - Remplacement des faux numéros de téléphone de template par les coordonnées directes de l'agence à Dakar (`+221 33 825 09 09`).
3. **Stimuler la conversion client locale** :
   - Tiroir de discussion WhatsApp flottant avec message pré-rempli.
   - Calculateur interactif de devis express en 3 étapes.
   - Navigation fluide avec barre d'état et scroll-spy.

---

## 🎨 Inspirations Graphiques & Architecturales

- **Hero 3D Arc Deck** : Carrousel cylindrique interactif présentant les 4 piliers de l'agence (*Web*, *Branding*, *Audiovisuel*, *Événementiel*), inspiré de *Aeline* et des interfaces 3D modernes.
- **Bento Grid** : Grille modulaire mettant en scène l'histoire, la vision et les métriques clés de l'agence (**10+** ans, **150+** projets, **98%** de satisfaction).
- **Micro-interactions fluides** : Transition douce des cartes, slider de témoignages, accordéon FAQ accessible et lightbox plein écran.

---

## 🗂️ Structure du Répertoire

```bash
Kreativ'Pulse/
├── index.html          # Structure sémantique HTML5 & composants
├── style.css           # Système de design, variables de couleurs & 3D CSS
├── app.js              # Moteur interactif (Carrousel 3D, filtre portfolio, FAQ, modal devis)
├── assets/
│   └── images/         # Visuels haute résolution des 4 pôles d'expertise
├── screenshots/        # Captures comparatives avant / après
├── docs/
│   └── AUDIT_UI_UX.md  # Rapport complet d'audit ergonomique du site existant
├── .gitignore          # Fichiers exclus du versionnement
└── README.md           # Documentation du projet
```

---

## 🚀 Installation & Utilisation

Ce prototype est entièrement **autonome** et ne nécessite **aucune installation complexe** (Node, npm ou build lourd).

### Option 1 : Ouverture Directe
Double-cliquez simplement sur `index.html` pour l'ouvrir dans n'importe quel navigateur web moderne (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Option 2 : Serveur Local (Recommandé pour les assets)
Avec Python (déjà présent sur la plupart des postes) :
```bash
python -m http.server 3000
```
Puis ouvrez votre navigateur à l'adresse : `http://localhost:3000/`

---

## 💻 Poursuivre le Travail sur une Autre Machine (Bureau / Autre PC)

Pour continuer à travailler sur ce projet depuis votre poste au bureau avec **Antigravity** :

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Diack-stack/kreativpulse.git
   ```
2. Ouvrez le dossier dans **Antigravity IDE**.
3. Vous pouvez continuer immédiatement vos modifications et itérations !

---

## 📄 Licence & Crédits
- **Auteur :** Diack-stack (Stagiaire Graphiste / UI Designer)
- **Entreprise :** Kreativ'Pulse (Dakar, Sénégal)
- **Année :** 2026
