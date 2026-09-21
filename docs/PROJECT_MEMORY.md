# MÉMOIRE DÉTAILLÉE DU PROJET KREATIV'PULSE

> **Document de référence exhaustif pour l'équipe et pour Antigravity.**
> Ce document synthétise toutes les étapes, décisions de conception, données métier et aspects techniques développés jusqu'à ce jour.

---

## 1. Contexte & Histoire du Projet

### L'Agence Kreativ'Pulse
Kreativ'Pulse est une agence de communication globale basée à Dakar (Sénégal), active sur 4 grands piliers d'expertise :
1. **Identité Visuelle & Branding :** Création de logos, chartes graphiques, packagings, supports imprimés.
2. **Développement Web & Solutions Digitales :** Sites institutionnels, portails, applications web, UI/UX design.
3. **Communication Événementielle & Scénographie :** Stands, foires internationales, forums mondiaux, signalétique.
4. **Production Audiovisuelle & Motion Design :** Spots publicitaires, reportages, vidéos institutionnelles, animations 3D.

### La Genèse du Projet de Refonte
- **L'Auteur :** Stagiaire en graphisme chez Kreativ'Pulse.
- **Le Maître de stage :** Responsable IT & Digital de l'agence, développeur web ayant conçu le site actuel sous WordPress (`https://kreativpulse.net/`).
- **L'Enjeu :**
  Lors des entretiens de recrutement, le responsable cherchait principalement un graphiste. L'utilisateur a mentionné ses compétences web et son utilisation innovante de l'intelligence artificielle pour concevoir des sites web.
  L'objectif de ce projet est de réaliser une refonte complète en pair programming avec Antigravity pour créer une vitrine ultra-performante et spectaculaire ("effet WOW"), surpassant largement le site WordPress actuel, afin de la présenter au maître de stage et à la direction comme une proposition stratégique d'évolution pour l'agence.

---

## 2. Audit du Site WordPress Existant (`https://kreativpulse.net/`)

L'audit approfondi a relevé les faiblesses suivantes sur le site en production :
- **Lenteurs et surcharge technique :** Utilisation d'un thème WordPress lourd (Bridge / WPBakery) générant des requêtes bloquantes et un temps de chargement élevé sur mobile.
- **Design statique et daté :** Manque d'interactivité moderne, animations génériques, absence de mode sombre immersif.
- **Manque de mise en valeur des réalisations :** Portfolio limité, images compressées sans visionneuse interactive, absence de vue multi-photos par projet.
- **Expérience mobile médiocre :** Éléments tronqués, navigation peu fluide.
- **Erreurs de localisation :** Anciennes mentions textuelles de "Sacré-Cœur 3 / VDN" alors que l'agence a déménagé à la Sicap Liberté 5.

---

## 3. Charte Graphique & Design System

Le nouveau design adopte une esthétique sombre cinématographique avec l'orange signature de l'agence :

| Token | Valeur | Rôle |
| :--- | :--- | :--- |
| **`--bg-primary`** | `#08090C` | Noir profond bleuté haut de gamme |
| **`--bg-secondary`** | `#0E1117` | Fond des cartes et sections alternées |
| **`--brand-orange`** | `#FF7500` | Orange officiel Kreativ'Pulse (accent primaire) |
| **`--brand-orange-light`** | `#FF8A00` | Dégradés et rehauts de lumière |
| **`--brand-orange-glow`** | `rgba(255, 117, 0, 0.35)` | Lueur néon sur boutons et cartes actives |
| **`--cyan-accent`** | `#00F2FE` | Accent froid pour équilibrer l'orange |
| **`--glass-bg`** | `rgba(255, 255, 255, 0.03)` | Fond translucide glassmorphic |
| **`--glass-border`** | `rgba(255, 255, 255, 0.08)` | Bordure fine avec brillance spéculaire |
| **Polices** | `Outfit`, `Plus Jakarta Sans` | Typographie moderne et premium |

---

## 4. Données Officielles & Coordonnées Validées

- **Adresse Officielle :** `Sicap Liberté 5/C Immeuble Adja Binta Ndiaye n° 5656, Dakar — Sénégal`
- **Téléphone :** `+221 33 827 80 80` / `+221 77 000 00 00`
- **Email :** `contact@kreativpulse.net`
- **Slogan :** *"Le pouls créatif !"*
- **Accroche Principale :** *"Donnez du pouls à votre marque"*

---

## 5. Inventaire des 15 Vrais Projets Réalisés par Kreativ'Pulse

Chaque projet a été modélisé dans `app.js` avec ses métadonnées complètes, son client réel, sa catégorie, sa description en français et sa galerie d'images :

1. **Collé Sow Ardo** — Haute Couture Africaine *(Branding & Shooting mode)*
2. **GSEF Dakar 2023** — Forum Mondial de l'Économie Sociale et Solidaire *(Scénographie & Branding événementiel)*
3. **SONACOS** — Société Nationale de Commercialisation des Oléagineux du Sénégal *(Campagne packaging & visuels digitaux)*
4. **Ergobit** — Solutions ergonomiques et mobilier de bureau moderne *(Identité de marque & Plateforme digitale)*
5. **Sentrak Logistics** — Logistique portuaire et transport international *(Branding corporate & supports imprimés)*
6. **SENELEC Woyofal** — Compagnie Nationale d'Électricité *(Campagne institutionnelle du compteur intelligent Woyofal)*
7. **DP World Dakar** — Opérateur portuaire mondial *(Communication interne & événementielle du terminal)*
8. **SOGIP Diamniadio** — Société de Gestion des Infrastructures Publiques du Pôle Urbain *(Signalétique & charte graphique institutionnelle)*
9. **SONAGED Éco-Gestes** — Société Nationale de Gestion Déchets *(Campagne de sensibilisation civique et écocitoyenne)*
10. **Lions du Sénégal (FSF)** — Fédération Sénégalaise de Football *(Campagne de soutien officiel des supporters à la CAN)*
11. **DHL Express Sénégal** — Leader du transport express *(Campagnes promotionnelles B2B et supports retail)*
12. **BHS Banque de l'Habitat** — Institution bancaire immobilière *(Campagne digitale pour les produits d'épargne logement)*
13. **ANER Énergies Renouvelables** — Agence Nationale pour les Énergies Renouvelables *(Rapport d'activité annuel et visuels de sensibilisation solaire)*
14. **CROUS Diamniadio** — Centre des Œuvres Universitaires *(Signalétique sur campus et supports de communication pour étudiants)*
15. **SICAP SA 70 Ans** — Société Immobilière du Cap-Vert *(Identité visuelle du 70e anniversaire et livre d'or d'entreprise)*

---

## 6. Inventaire des 16 Partenaires Officiels (Logos Transparents)

Les fichiers logos officiels sont rangés dans `assets/logos/` et défilent en continu dans la section marquee :
- `partner-senelec.png` (SENELEC)
- `partner-dpworld.png` (DP WORLD DAKAR)
- `partner-sogip.png` (SOGIP DIAMNIADIO)
- `partner-sonaged.png` (SONAGED)
- `partner-fsf.png` (FÉDÉRATION SÉNÉGALAISE DE FOOTBALL)
- `partner-aner.png` (ANER)
- `partner-cosec.png` (COSEC)
- `partner-dhl.png` (DHL EXPRESS)
- `partner-fhs.png` (FONDS HABITAT SOCIAL)
- `partner-sentrak.png` (SENTRAK LOGISTICS)
- `partner-sonacos.png` (SONACOS)
- `partner-crous.png` (CROUS DIAMNIADIO)
- `partner-gsef.png` (GSEF DAKAR)
- `partner-caf.png` (CAF AWARDS)
- `partner-bhs.png` (BANQUE DE L'HABITAT DU SÉNÉGAL)
- `partner-sicap.png` (SICAP SA)

---

## 7. Fonctionnalités Interactives Développées

1. **Galerie Lightbox Multi-Images Dynamique :**
   - Modal plein écran animé avec flou d'arrière-plan.
   - Navigation clavier (Flèche gauche / Flèche droite / Échap).
   - Ruban de miniatures au bas du modal permettant de changer d'image en un clic.
   - Compteur de photos (ex: "Image 1 / 4").
   - Titre, client et description détaillée pour chaque projet.

2. **Hub "Studio Brief" & Formulaire Glassmorphic :**
   - Sélecteurs interactifs par pilules pour les services (Branding, Web, Audiovisuel, Événementiel, Stratégie).
   - Sélecteur de tranche budgétaire interactive.
   - Champs de contact stylisés avec halo lumineux orange au focus.
   - Carte d'information directe avec l'adresse exacte de la Sicap Liberté 5.

3. **Verrouillage Responsive & Desktop :**
   - Bouton de menu mobile (hamburger) masqué de manière absolue sur grand écran (`display: none !important` via media queries).
   - Navigation desktop épurée avec liens de saut et CTA "Lancer un projet".
   - Version mobile optimisée avec drawer fluide et interactions tactiles.

---

## 8. Commandes Utiles

- **Démarrage local :** `npm start` ou `node serve.js` (écoute par défaut sur `http://localhost:3000`).
- **Vérification Git :** `git status` / `git pull` / `git log`.
- **Déploiement Vercel :** Configuré avec `vercel.json` pour un déploiement statique instantané.
