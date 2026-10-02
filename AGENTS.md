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
| **Mention des Projets** | **JAMAIS de nombre de projets** | Règle stricte : Ne jamais afficher le nombre de projets (ex: pas de "(+15 études de cas)", pas de "15 Projets", pas de "(15)"). Présenter sobrement "Découvrir toutes nos réalisations" ou "Tous les projets". |

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

### F. Nouveau : Boutique & Catalogue Publicitaire / Signalétique (Intégration du Refont)
Suite aux échanges avec le maître de stage et l'audit de `https://new.kreativpulse.net/` :
- **Catalogue de +200 références réelles** (`catalog-data.js`) :
  - *Objets publicitaires* (Coffrets, agendas, stylos, mugs, textile, high-tech, bagagerie)
  - *Décoration numérique* (Ascenseurs, habillage véhicules, vitrines, fresques murales, tableaux)
  - *Salons & événements* (Gonflables, photocalls, comptoirs, badges, trophées)
  - *Présentoirs & affichage* (Écrans totems LED, distributeurs, grands formats, enseignes)
- **Méga-Menu Navbar 4 Colonnes :** Survol fluide avec accès direct aux 28 sous-catégories.
- **Moteur de Recherche & Filtrage Avancé :** Recherche instantanée avec debouncing, onglets d'univers et pilules de sous-catégories.
- **Fiches Produits Modales :** Aperçu HD, techniques de marquage, matières, spécifications et sélecteur de quantité.
- **Panier de Devis & Commande en 2 Étapes :**
  - Gestion réactive des quantités (`localStorage` sous la clé `kp_cart`).
  - Badge avec compteur d'articles en direct sur la navbar.
  - Tunnel devis complet avec coordonnées, ville de livraison, délai, budget indicatif.
  - Bouton direct **« Transmettre sur WhatsApp »** générant un devis pré-formaté clé en main.
- **Newsletter :** Bannière moderne *"Restez branchés sur notre pouls créatif"* avec confirmation sans rechargement.

### G. Espace Gestion Frontend — Pulse Studio Manager (`admin.html`)
Un espace d'administration autonome moderne conçu pour piloter le site sans toucher au code :
- **Authentification & Sécurité :** Gatekeeper glassmorphic avec gestion personnalisée du mot de passe / code PIN (`localStorage` sous la clé `kp_admin_password`, défaut `2026`).
- **Gestionnaire du Mot de Passe Studio :** Section dédiée dans l'onglet Paramètres pour modifier le code PIN/mot de passe avec contrôle de l'ancien code, confirmation, bouton d'affichage/masquage en clair, et bouton de réinitialisation d'urgence.
- **Expérience Mobile-First Complète :**
  - **Topbar Mobile Dédiée :** En-tête compact avec bouton hamburger tactile, logo officiel, badge de la vue active et déconnexion rapide.
  - **Tiroir Latéral (Mobile Drawer) :** Sidebar transformé en tiroir coulissant fluide avec backdrop flou assombrissant, bouton de fermeture `(X)`, et auto-fermeture au choix d'un onglet.
  - **Bottom Tab Bar Mobile :** Barre tactile inférieure fixe avec 5 boutons d'accès rapide (Aperçu, Projets, Boutique, Devis Inbox avec badge dynamique, Réglages) façon application native.
  - **Modales & Tableaux Adaptatifs :** Vue plein écran sur mobile avec défilement vertical interne sans aucun débordement horizontal.
- **Gestionnaire de Portfolio & Uploader Visuel :**
  - CRUD complet (Ajouter, Modifier, Supprimer) synchronisé en temps réel avec `index.html` et `realisations.html` via `localStorage` (`kp_custom_projects`).
  - **Zone d'upload direct (Glisser-Déposer / Sélecteur de fichier) :** Import direct depuis l'ordinateur de visuels de projet (JPG, PNG, WebP).
  - **Compression & Optimisation automatique :** Canvas HTML5 client-side pour redimensionner automatiquement les photos HD (~100-200 Ko) tout en préservant un piqué exceptionnel sans saturer le stockage.
  - **Gestion de Galerie Multi-Photos :** Possibilité d'ajouter des photos secondaires pour alimenter le slider Lightbox du projet.
  - **Double mode flexible :** Choix en 1 clic entre "Fichier (Upload direct)" et "Lien / Chemin local existant".
- **Catalogue & Boutique — Gestionnaire & Uploader Dédié :**
  - CRUD complet pour les articles boutique (Ajouter, Modifier, Supprimer) synchronisé avec `catalogue.html` et le moteur de recherche public via `localStorage` (`kp_custom_catalog`).
  - **Zone d'upload direct de photo produit (Glisser-Déposer / Sélecteur de fichier) :** Import direct depuis l'ordinateur de visuels de produits (JPG, PNG, WebP).
  - **Compression automatique Canvas :** Optimisation intelligente de la photo produit (max 1200px, 0.85 qualité) sans saturer le stockage.
  - **Double mode :** "Fichier (Upload)" ou "Lien / Chemin local" avec prévisualisation en direct, remplacement et suppression rapide.
  - **Extraction et Affichage Autonome (+200 articles) :** Extraction automatique et sans dépendance depuis `catalog-data.js` avec pagination fluide par tranche de 50 articles, recherche instantanée et filtrage par univers.
  - Recherche et filtrage en direct parmi les 4 univers (+200 références de `catalog-data.js`).
- **Boîte de Réception des Briefs & Devis :** Réception automatique des demandes de devis et briefs soumis depuis les formulaires publics (`kp_leads`), avec bouton direct pour répondre au client sur WhatsApp.
- **Paramètres de l'Agence :** Éditeur des coordonnées officielles de Liberté 5 (téléphone, WhatsApp, email, horaires).
- **Sauvegarde & Restauration :** Bouton d'exportation d'un backup JSON complet en 1 clic.
- **Accès Discret :** Lien discret « Studio Admin » avec icône SVG vectorielle intégré dans le pied de page de toutes les pages.

---

## 5. Architecture Technique des Fichiers

```
Kreativ'Pulse/
├── AGENTS.md                  # Mémoire globale pour Antigravity (ce fichier)
├── GEMINI.md                  # Règle miroir pour agents Gemini / Antigravity
├── .agents/
│   └── rules/
│       └── kreativpulse_memory.md # Règle de contexte workspace injectée
├── index.html                 # Accueil & Vitrine Teaser multipage (Hero 3D, Bento, 16 logos)
├── a-propos.html              # L'Agence : Histoire depuis 2014, valeurs, équipe, siège Liberté 5
├── services.html              # Nos Prestations : Les 5 pôles d'expertise détaillés & livrables
├── realisations.html          # Nos Réalisations : 15 projets réels, filtres, lightbox interactive
├── catalogue.html             # Boutique Mandarine SN : +200 produits, recherche, filtres univers
├── panier.html                # Panier de Devis : Récapitulatif, coordonnées, génération WhatsApp
├── contact.html               # Contact & Studio Brief : Formulaire interactif et coordonnées
├── admin.html                 # Pulse Studio Manager : Espace admin autonome de gestion frontend
├── admin.css                  # Design system glassmorphic sombre pour le dashboard d'administration
├── admin.js                   # Moteur réactif de gestion de contenu, leads, portfolio et export JSON
├── style.css                  # Système de design CSS vanilla moderne, méga-menu & catalogue
├── catalog-data.js            # Base complète des 4 univers et +200 produits Mandarine
├── app.js                     # Logique interactive, moteur catalogue, panier devis, lightbox
├── serve.rb                   # Serveur local WEBrick pour macOS (sans dépendances)
├── serve.js                   # Serveur de dev Node/Express
├── package.json               # Configuration du projet
├── vercel.json                # Déploiement Vercel avec Clean URLs
├── assets/                    # Logos authentiques, images réelles des projets
│   ├── logos/                 # 16 logos officiels transparents + logo Kreativ'Pulse
│   └── portfolio/             # Médias et visuels réels des projets du portfolio
└── docs/                      # Documentation, audit UI/UX, historiques
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

---

## 7. Scores Google PageSpeed Insights & Stabilité (Validés Octobre 2026)

| Métrique | Ordinateur (Desktop) | Mobile |
| :--- | :---: | :---: |
| **Performance globale** | **94 / 100 🟢** *(FCP 0.8s, LCP 1.5s)* | **76 / 100 🟠** *(FCP 3.8s, LCP 4.1s)* |
| **Accessibilité** | **90 / 100 🟢** | **91 / 100 🟢** |
| **Bonnes Pratiques** | **100 / 100 🟢** *(Score Parfait)* | **100 / 100 🟢** *(Score Parfait)* |
| **SEO** | **100 / 100 🟢** *(Score Parfait)* | **100 / 100 🟢** *(Score Parfait)* |
| **Total Blocking Time (TBT)** | **60 ms 🟢** *(Quasi-nul)* | **0 ms 🟢** *(Parfait absolu)* |
| **Cumulative Layout Shift (CLS)** | **0.003 🟢** | **0 🟢** *(Parfait absolu)* |

- **Décision technique :** Priorité absolue à la stabilité et à la fidélité visuelle. Le site tourne sur Tailwind Play CDN + CSS personnalisé optimisé.
- **Badges flottants carrousel :** Masqués sur mobile (`hidden lg:flex` / `style.css` display: none) pour un affichage épuré.
- **Accès Studio Admin :** Retiré du pied de page public, accessible uniquement via `/admin.html`.
- **Délai initial des timers (TBT) :** Démarrage de la rotation automatique du carrousel et de l'horloge Dakar différé de 4 secondes pour garantir un thread principal libre lors du premier chargement.

