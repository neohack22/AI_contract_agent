import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  fr: {
    translation: {
      // Navigation
      "chat": "Chat IA",
      "jobs": "Emplois",
      "history": "Historique",
      "profile": "Profil",
      
      // Header
      "welcome": "Bienvenue sur AI Contract Agent",
      "tagline": "Trouvez rapidement les meilleurs contrats de développement grâce à l'IA",
      "hello": "Bonjour",
      "skills": "compétences",
      "darkMode": "Mode sombre",
      "lightMode": "Mode clair",
      "editProfile": "Modifier le profil",
      "logout": "Déconnexion",
      
      // Profile Setup
      "profileSetup": "Configuration du profil",
      "profileHelp": "Aidez-nous à mieux vous connaître pour trouver les meilleures opportunités",
      "fullName": "Nom complet",
      "email": "Email",
      "technicalSkills": "Compétences techniques",
      "skillsPlaceholder": "Ex: React, Python, Node.js...",
      "addSkill": "Ajouter",
      "experience": "Expérience professionnelle",
      "experiencePlaceholder": "Décrivez brièvement votre expérience...",
      "workPreferences": "Préférences de travail",
      "preferencesPlaceholder": "Type de projets, secteurs d'activité, modalités de travail...",
      "github": "GitHub (optionnel)",
      "linkedin": "LinkedIn (optionnel)",
      "importCV": "Importer CV",
      "startSearch": "Commencer la recherche",
      "required": "*",
      
      // Chat Interface
      "chatWelcome": "Bonjour ! Je suis votre assistant IA pour trouver des contrats de développement. Parlez-moi de votre profil et de vos préférences pour commencer.",
      "chatPlaceholder": "Décrivez vos compétences, expérience ou préférences...",
      "send": "Envoyer",
      
      // Job Cards
      "match": "match",
      "apply": "Postuler",
      "save": "Sauvegarder",
      "details": "Détails",
      "skip": "Passer",
      
      // Job History
      "jobHistory": "Historique et emplois sauvegardés",
      "saved": "Sauvegardés",
      "applications": "Candidatures",
      "view": "Voir",
      "delete": "Supprimer",
      "noSavedJobs": "Aucun emploi sauvegardé pour le moment",
      "noApplications": "Aucune candidature envoyée pour le moment",
      "savedOn": "Sauvegardé le",
      "appliedOn": "Candidature envoyée le",
      
      // Features
      "conversationalInterface": "Interface conversationnelle",
      "conversationalDesc": "Discutez avec notre IA pour affiner vos préférences",
      "intelligentMatching": "Correspondances intelligentes",
      "matchingDesc": "Recevez des offres personnalisées selon votre profil",
      "recommendations": "Recommandations",
      "recommendationsDesc": "Obtenez des conseils pour améliorer votre profil",
      
      // Profile Summary
      "yourProfile": "Votre profil",
      "name": "Nom",
      "modifyProfile": "Modifier le profil",
      
      // Tips
      "tips": "Conseils",
      "tip1": "Soyez précis sur vos compétences techniques",
      "tip2": "Mentionnez vos préférences de travail",
      "tip3": "Décrivez vos projets récents",
      
      // Empty States
      "noJobsYet": "Aucune offre pour le moment",
      "noJobsDesc": "Discutez avec l'IA dans l'onglet Chat pour recevoir des recommandations personnalisées",
      "startConversation": "Commencer une conversation",
      
      // Messages
      "jobSaved": "Emploi sauvegardé",
      "applicationSent": "Candidature envoyée pour",
      "at": "chez",
      "jobDetails": "Détails pour",
      "skillsRequired": "Compétences requises",
      
      // AI Responses
      "aiResponse1": "Excellent ! Basé sur votre profil, je vais rechercher des opportunités qui correspondent à vos compétences.",
      "aiResponse2": "Je comprends vos préférences. Laissez-moi analyser les meilleures correspondances pour vous.",
      "aiResponse3": "Parfait ! Je vais maintenant chercher des contrats qui correspondent à votre expertise.",
      "aiResponse4": "Merci pour ces informations. Je prépare une liste personnalisée d'opportunités pour vous."
    }
  },
  en: {
    translation: {
      // Navigation
      "chat": "AI Chat",
      "jobs": "Jobs",
      "history": "History",
      "profile": "Profile",
      
      // Header
      "welcome": "Welcome to AI Contract Agent",
      "tagline": "Find the best development contracts quickly with AI",
      "hello": "Hello",
      "skills": "skills",
      "darkMode": "Dark mode",
      "lightMode": "Light mode",
      "editProfile": "Edit profile",
      "logout": "Logout",
      
      // Profile Setup
      "profileSetup": "Profile Setup",
      "profileHelp": "Help us get to know you better to find the best opportunities",
      "fullName": "Full Name",
      "email": "Email",
      "technicalSkills": "Technical Skills",
      "skillsPlaceholder": "Ex: React, Python, Node.js...",
      "addSkill": "Add",
      "experience": "Professional Experience",
      "experiencePlaceholder": "Briefly describe your experience...",
      "workPreferences": "Work Preferences",
      "preferencesPlaceholder": "Project types, industries, work arrangements...",
      "github": "GitHub (optional)",
      "linkedin": "LinkedIn (optional)",
      "importCV": "Import CV",
      "startSearch": "Start Search",
      "required": "*",
      
      // Chat Interface
      "chatWelcome": "Hello! I'm your AI assistant for finding development contracts. Tell me about your profile and preferences to get started.",
      "chatPlaceholder": "Describe your skills, experience or preferences...",
      "send": "Send",
      
      // Job Cards
      "match": "match",
      "apply": "Apply",
      "save": "Save",
      "details": "Details",
      "skip": "Skip",
      
      // Job History
      "jobHistory": "History and saved jobs",
      "saved": "Saved",
      "applications": "Applications",
      "view": "View",
      "delete": "Delete",
      "noSavedJobs": "No saved jobs yet",
      "noApplications": "No applications sent yet",
      "savedOn": "Saved on",
      "appliedOn": "Applied on",
      
      // Features
      "conversationalInterface": "Conversational Interface",
      "conversationalDesc": "Chat with our AI to refine your preferences",
      "intelligentMatching": "Intelligent Matching",
      "matchingDesc": "Receive personalized offers based on your profile",
      "recommendations": "Recommendations",
      "recommendationsDesc": "Get advice to improve your profile",
      
      // Profile Summary
      "yourProfile": "Your Profile",
      "name": "Name",
      "modifyProfile": "Modify Profile",
      
      // Tips
      "tips": "Tips",
      "tip1": "Be specific about your technical skills",
      "tip2": "Mention your work preferences",
      "tip3": "Describe your recent projects",
      
      // Empty States
      "noJobsYet": "No jobs yet",
      "noJobsDesc": "Chat with the AI in the Chat tab to receive personalized recommendations",
      "startConversation": "Start a conversation",
      
      // Messages
      "jobSaved": "Job saved",
      "applicationSent": "Application sent for",
      "at": "at",
      "jobDetails": "Details for",
      "skillsRequired": "Skills required",
      
      // AI Responses
      "aiResponse1": "Excellent! Based on your profile, I'll search for opportunities that match your skills.",
      "aiResponse2": "I understand your preferences. Let me analyze the best matches for you.",
      "aiResponse3": "Perfect! I'll now look for contracts that match your expertise.",
      "aiResponse4": "Thank you for this information. I'm preparing a personalized list of opportunities for you."
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  })

export default i18n

