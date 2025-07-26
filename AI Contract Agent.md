# AI Contract Agent

## Description

AI Contract Agent est une application web conversationnelle qui aide les développeurs juniors et les récents diplômés à trouver et signer des opportunités de contrats plus rapidement, en évitant les offres d'emploi non pertinentes et en automatisant certaines parties du processus de recherche et de candidature.

## Fonctionnalités principales

### 🧠 Intelligence de profil
- Saisie de données via CV, LinkedIn, GitHub ou enquêtes d'intégration courtes
- L'IA construit un profil basé sur les données structurées
- Validation et amélioration du profil via chat

### 🔍 Découverte intelligente d'emplois
- L'IA fait correspondre le profil utilisateur aux contrats d'emploi sélectionnés
- Opportunités affichées sous forme de cartes (emploi, compétences, entreprise, % de correspondance)
- Apprentissage des préférences après 2-3 sélections d'emplois

### 📊 Analyse des lacunes
- L'IA signale les compétences ou critères manquants pour les rôles souhaités
- Feuille de route d'amélioration avec actions à court terme

### 🎯 Fonctionnalités de l'interface
- Interface de chat conversationnel comme zone principale d'entrée/sortie
- Cartes de correspondance d'emplois avec titre, entreprise, compétences et % de correspondance
- Boutons : Postuler, Sauvegarder, Passer, Demander des détails
- Flux d'entrée et d'édition du profil utilisateur
- Vue statut/historique pour suivre les progrès et les emplois sauvegardés

## Technologies utilisées

- **Frontend**: React 18 avec Vite
- **Styling**: Tailwind CSS
- **Composants UI**: shadcn/ui
- **Icônes**: Lucide React
- **Animations**: Framer Motion
- **Déploiement**: Manus Platform

## Structure du projet

```
ai-contract-agent/
├── src/
│   ├── components/
│   │   ├── ui/              # Composants UI de base (shadcn/ui)
│   │   ├── ChatInterface.jsx # Interface de chat principal
│   │   ├── JobCard.jsx      # Carte d'affichage des emplois
│   │   ├── ProfileSetup.jsx # Configuration du profil utilisateur
│   │   ├── Header.jsx       # En-tête de l'application
│   │   └── JobHistory.jsx   # Historique et emplois sauvegardés
│   ├── App.jsx              # Composant principal
│   ├── App.css              # Styles globaux
│   └── main.jsx             # Point d'entrée
├── public/                  # Assets statiques
└── dist/                    # Build de production
```

## Fonctionnalités implémentées

### ✅ Interface utilisateur
- [x] Design responsive (mobile-first)
- [x] Mode sombre/clair avec basculement
- [x] Interface de chat conversationnel
- [x] Cartes d'emplois interactives
- [x] Système de navigation par onglets
- [x] Animations fluides et micro-interactions

### ✅ Gestion du profil
- [x] Configuration initiale du profil
- [x] Ajout/suppression de compétences
- [x] Édition du profil
- [x] Intégration GitHub/LinkedIn (optionnel)

### ✅ Système d'emplois
- [x] Génération automatique de correspondances d'emplois
- [x] Système de pourcentage de correspondance
- [x] Actions : Postuler, Sauvegarder, Passer, Détails
- [x] Historique des candidatures et emplois sauvegardés

### ✅ Fonctionnalités IA simulées
- [x] Chat conversationnel avec réponses automatiques
- [x] Génération de correspondances d'emplois basée sur les compétences
- [x] Apprentissage des préférences utilisateur

## Installation et développement

```bash
# Cloner le projet
git clone <repository-url>
cd ai-contract-agent

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

## Déploiement

L'application est déployée sur : **https://hvqwltkk.manus.space**

## Objectifs atteints

L'application V1 est :
- ✅ **Légère et rapide** : Interface optimisée avec Vite et React
- ✅ **Profondément personnalisée** : Système de profil et correspondances intelligentes
- ✅ **Construite pour les développeurs** : Interface intuitive et workflow optimisé

## Améliorations futures

- Intégration d'une vraie API LLM (OpenAI, Claude, etc.)
- Connexion à de vraies bases de données d'emplois
- Système d'authentification complet
- Module de candidature automatique
- Alertes de correspondance d'emplois
- Modules voix-texte/TTS
- Analytics et métriques de performance

