# 🚀 GUIDE DE REPRISE AU BUREAU — KREATIV'PULSE

Ce guide vous explique exactement comment récupérer le projet et **reprendre la discussion avec Antigravity sans perdre aucun fil ni aucune mémoire**, une fois arrivé à votre bureau.

---

## ⚡ En 3 étapes simples :

### Étape 1 : Récupérer le projet sur l'ordinateur du bureau
Ouvrez un terminal (PowerShell, Git Bash ou CMD) sur votre machine du bureau et lancez :
```bash
git clone https://github.com/Diack-stack/kreativpulse.git
cd kreativpulse
```

### Étape 2 : Lancer le serveur local (optionnel pour prévisualiser)
Installez les quelques dépendances locales et démarrez le serveur :
```bash
npm install
npm start
```
> Le site s'ouvre automatiquement dans votre navigateur sur **`http://localhost:3000`**.

### Étape 3 : Ouvrir le projet dans Antigravity
1. Lancez **Antigravity** sur votre ordinateur de bureau.
2. Allez dans **File > Open Folder** (Fichier > Ouvrir le dossier) et sélectionnez le dossier `kreativpulse`.
3. C'est tout ! **Antigravity lit automatiquement `AGENTS.md` et `.agents/rules/` dès l'ouverture du dossier**.

---

## 💬 Quoi taper pour relancer la discussion ?

Dès que vous ouvrez le chat Antigravity sur l'ordinateur du bureau, tapez simplement :

> **« Salut ! On continue le projet Kreativ'Pulse là où on s'est arrêté. »**

Antigravity a déjà en mémoire :
- ✅ Votre statut de stagiaire graphiste et votre relation avec le responsable IT & Digital.
- ✅ L'objectif de la refonte (dépasser l'ancien WordPress, effet WOW pour la direction).
- ✅ La charte graphique complète (Thème Dark `#08090C`, Orange signature `#FF7500`, néons, cyan `#00F2FE`).
- ✅ L'adresse officielle validée : `Sicap Liberté 5/C Immeuble Adja Binta Ndiaye n° 5656`.
- ✅ L'intégration des 15 vrais projets avec la visionneuse lightbox multi-images.
- ✅ L'intégration des 16 vrais logos partenaires transparents dans le ruban défilant.
- ✅ Le Studio Brief interactif glassmorphic 100% traduit en français.
- ✅ L'historique complet de nos 8 cycles de modifications et l'intégralité du transcript (`docs/session_history/transcript.jsonl`).

---

## 📁 Où se trouvent les fichiers de mémoire dans le dépôt ?

| Fichier | Emplacement | Rôle |
| :--- | :--- | :--- |
| **`AGENTS.md`** | Racine du projet | Mémoire principale chargée automatiquement par Antigravity |
| **`GEMINI.md`** | Racine du projet | Directive complémentaire pour l'agent IA |
| **`.agents/rules/`** | Dossier racine | Règle système workspace toujours active |
| **`docs/PROJECT_MEMORY.md`** | Dossier `docs/` | Synthèse ultra-détaillée de tout le projet et des décisions |
| **`docs/session_history/`** | Dossier `docs/` | Sauvegarde complète du fichier d'historique `transcript.jsonl` |
