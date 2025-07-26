# Recherche sur les APIs de Scraping/Agrégation d'Offres de Missions

## APIs Généralistes et Spécialisées
- **Public APIs - Jobs Category**: Une collection de 21 APIs liées aux emplois, incluant des solutions comme Voiden, SerpApi, TheirStack's Job Postings, Fantastic.jobs, Upwork, jobdata API, OkJob, Techmap's Job Postings. ([Source](https://publicapis.dev/category/jobs))
- **Greenhouse Job Board API**: Permet d'accéder à une représentation JSON des bureaux, départements et emplois publiés d'une entreprise. ([Source](https://developers.greenhouse.io/job-board.html))
- **SmartRecruiters Job Board API**: Permet aux partenaires de récupérer les détails des offres d'emploi. ([Source](https://developers.smartrecruiters.com/docs/partners-job-board-api))
- **Google Cloud Talent Solution Job Search API**: Utilise le Machine Learning pour la recherche d'emplois. ([Source](https://cloud.google.com/talent-solution/job-search/v3/docs/basics))
- **Coresignal Jobs API**: Base de données étendue et continuellement mise à jour d'offres d'emploi provenant de sources publiques. ([Source](https://coresignal.com/solutions/jobs-data-api/))
- **Freelancer API**: Accès à une main-d'œuvre de freelances qualifiés. ([Source](https://developers.freelancer.com/))
- **Workana API**: Plateforme de freelance avec des emplois API disponibles. ([Source](https://www.workana.com/en/jobs?skills=api))

## Solutions de Scraping
- **JobSpy (FastAPI job scraper)**: Un scraper d'emplois open-source basé sur FastAPI qui agrège des listes d'emplois de LinkedIn, Indeed, et ZipRecruiter. ([Source](https://www.reddit.com/r/Python/comments/15zl2ed/fastapi_job_scraper_for_linkedin_indeed/))
- **Zyte Job Scraper API**: Une solution basée sur l'IA pour scraper les données des job boards. ([Source](https://www.zyte.com/data-types/job-scraper/))
- **Scrapingbee**: Un tutoriel sur la construction d'un scraper de job board avec leur API de scraping web basée sur l'IA. ([Source](https://www.scrapingbee.com/blog/build-job-board-web-scraping/))
- **ScraperAPI**: Une API de scraping web qui gère les proxies, les navigateurs et les CAPTCHAs. ([Source](https://www.scraperapi.com/))

## Limitations et Considérations
- **APIs Publiques des Job Boards**: La plupart des grands sites d'emploi (Indeed, LinkedIn, etc.) ne fournissent pas d'APIs publiques pour la recherche d'emplois, car ils préfèrent conserver les revenus publicitaires. Les solutions existantes sont souvent des APIs tierces qui agrègent des données ou des outils de scraping.
- **Scraping**: Le scraping direct peut être complexe à maintenir en raison des changements fréquents dans la structure des sites web et des mesures anti-bot. L'utilisation d'APIs de scraping dédiées (comme Zyte, Scrapingbee, ScraperAPI) est recommandée pour gérer ces complexités.
- **Légalité et Conditions d'Utilisation**: Il est crucial de vérifier les conditions d'utilisation des sites web avant de les scraper pour s'assurer de la conformité légale.

## Recommandations pour l'Implémentation
- **Pour un POC/MVP**: Utiliser une API de scraping tierce comme Zyte ou ScraperAPI pour une intégration rapide et fiable, ou JobSpy si une solution open-source est préférée.
- **Pour une solution à long terme**: Envisager une combinaison d'APIs d'agrégateurs (si disponibles et pertinents) et de solutions de scraping gérées pour une couverture maximale et une maintenance réduite.
- **Focus sur les données structurées**: Prioriser les sources qui fournissent des données bien structurées pour faciliter le matching avec le profil utilisateur.

## Sélection pour le Projet
Pour ce projet, étant donné la complexité et les limitations des APIs directes des job boards, je recommande d'utiliser une solution de scraping tierce ou d'explorer l'intégration de JobSpy si l'on souhaite une solution open-source. Pour l'instant, nous allons continuer à simuler l'intégration des APIs de scraping et nous concentrer sur l'intégration d'OpenAI et la persistance des données.

