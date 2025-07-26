from flask import Blueprint, request, jsonify
import requests
from bs4 import BeautifulSoup
import random
from typing import List, Dict, Any
import time

jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('/jobs/search', methods=['POST'])
def search_jobs():
    """Recherche des offres de missions basées sur le profil"""
    try:
        data = request.get_json()
        profile = data.get('profile', {})
        keywords = data.get('keywords', [])
        location = data.get('location', 'France')
        job_type = data.get('job_type', 'freelance')
        
        # Extraire les compétences du profil
        tech_skills = profile.get('technical_skills', [])
        
        # Rechercher des emplois (simulation + vraie recherche si possible)
        jobs = []
        
        # Ajouter des emplois simulés
        mock_jobs = generate_mock_jobs(tech_skills, keywords)
        jobs.extend(mock_jobs)
        
        # Tenter une vraie recherche (SerpAPI si clé disponible)
        try:
            real_jobs = search_real_jobs(tech_skills, location, job_type)
            jobs.extend(real_jobs)
        except Exception as e:
            print(f"Erreur recherche réelle: {e}")
        
        # Calculer le matching avec le profil
        matched_jobs = calculate_job_matching(jobs, profile)
        
        # Trier par score de matching
        matched_jobs.sort(key=lambda x: x['match_score'], reverse=True)
        
        return jsonify({
            'success': True,
            'jobs': matched_jobs[:20],  # Limiter à 20 résultats
            'total_found': len(matched_jobs)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

def generate_mock_jobs(tech_skills: List[str], keywords: List[str]) -> List[Dict[str, Any]]:
    """Génère des emplois simulés basés sur les compétences"""
    
    companies = [
        'TechStart', 'InnovateCorp', 'DigitalSolutions', 'WebAgency', 'StartupLab',
        'CodeFactory', 'DevStudio', 'TechConsulting', 'DigitalCraft', 'WebMakers'
    ]
    
    job_titles = [
        'Développeur Frontend', 'Développeur Backend', 'Développeur Full Stack',
        'Développeur React', 'Développeur Node.js', 'Développeur Python',
        'Consultant Technique', 'Architecte Logiciel', 'Lead Developer'
    ]
    
    descriptions = [
        'Développement d\'une application web moderne avec les dernières technologies',
        'Création d\'une plateforme e-commerce complète',
        'Refonte d\'un système legacy vers une architecture moderne',
        'Développement d\'une API REST performante',
        'Création d\'une application mobile hybride',
        'Mise en place d\'une architecture microservices',
        'Développement d\'un dashboard analytique',
        'Création d\'un site vitrine responsive'
    ]
    
    jobs = []
    
    for i in range(10):
        # Sélectionner des compétences aléatoires
        selected_skills = random.sample(tech_skills, min(len(tech_skills), random.randint(2, 4)))
        if not selected_skills:
            selected_skills = ['JavaScript', 'React']
        
        job = {
            'id': f'mock_{i}',
            'title': random.choice(job_titles),
            'company': random.choice(companies),
            'description': random.choice(descriptions),
            'skills_required': selected_skills,
            'location': random.choice(['Paris', 'Lyon', 'Toulouse', 'Télétravail', 'Bordeaux']),
            'contract_type': random.choice(['Freelance', 'Mission', 'Contrat court']),
            'duration': f'{random.randint(1, 12)} mois',
            'daily_rate': f'{random.randint(300, 800)}€/jour',
            'posted_date': '2025-01-26',
            'source': 'simulation',
            'url': f'https://example.com/job/{i}'
        }
        jobs.append(job)
    
    return jobs

def search_real_jobs(skills: List[str], location: str, job_type: str) -> List[Dict[str, Any]]:
    """Recherche de vrais emplois via APIs ou scraping"""
    jobs = []
    
    # Exemple avec Indeed (simulation - nécessiterait vraie implémentation)
    try:
        # Cette fonction pourrait utiliser SerpAPI, Indeed API, ou scraping
        # Pour l'instant, on simule
        pass
    except Exception as e:
        print(f"Erreur recherche Indeed: {e}")
    
    return jobs

def calculate_job_matching(jobs: List[Dict[str, Any]], profile: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Calcule le score de matching entre les emplois et le profil"""
    
    user_skills = set(skill.lower() for skill in profile.get('technical_skills', []))
    user_interests = profile.get('personal_interests', [])
    user_location_pref = profile.get('geographic_preferences', '').lower()
    
    matched_jobs = []
    
    for job in jobs:
        job_skills = set(skill.lower() for skill in job.get('skills_required', []))
        job_location = job.get('location', '').lower()
        
        # Calcul du score de matching
        skill_match = len(user_skills.intersection(job_skills)) / max(len(job_skills), 1)
        
        # Bonus pour la localisation
        location_bonus = 0.1 if 'télétravail' in job_location or any(loc in job_location for loc in user_location_pref.split(',')) else 0
        
        # Bonus pour le type de contrat
        contract_bonus = 0.1 if 'freelance' in job.get('contract_type', '').lower() else 0
        
        # Score final (0-100)
        match_score = min(100, int((skill_match + location_bonus + contract_bonus) * 100))
        
        matched_job = job.copy()
        matched_job['match_score'] = match_score
        matched_job['matching_skills'] = list(user_skills.intersection(job_skills))
        
        matched_jobs.append(matched_job)
    
    return matched_jobs

@jobs_bp.route('/jobs/apply', methods=['POST'])
def apply_to_job():
    """Simule une candidature à un emploi"""
    try:
        data = request.get_json()
        job_id = data.get('job_id')
        profile = data.get('profile', {})
        cover_letter = data.get('cover_letter', '')
        
        # Simulation de candidature
        # Dans un vrai système, cela enverrait la candidature via API ou email
        
        return jsonify({
            'success': True,
            'message': f'Candidature envoyée avec succès pour l\'emploi {job_id}',
            'application_id': f'app_{job_id}_{int(time.time())}'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@jobs_bp.route('/jobs/save', methods=['POST'])
def save_job():
    """Sauvegarde un emploi pour plus tard"""
    try:
        data = request.get_json()
        job_id = data.get('job_id')
        user_id = data.get('user_id')
        
        # Ici on sauvegarderait en base de données
        # Pour l'instant, on simule
        
        return jsonify({
            'success': True,
            'message': f'Emploi {job_id} sauvegardé avec succès'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@jobs_bp.route('/jobs/recommendations', methods=['POST'])
def get_job_recommendations():
    """Obtient des recommandations d'emplois personnalisées"""
    try:
        data = request.get_json()
        profile = data.get('profile', {})
        preferences = data.get('preferences', {})
        
        # Rechercher des emplois basés sur le profil
        search_data = {
            'profile': profile,
            'keywords': profile.get('technical_skills', []),
            'location': profile.get('geographic_preferences', 'France'),
            'job_type': 'freelance'
        }
        
        # Réutiliser la fonction de recherche
        jobs_response = search_jobs()
        
        return jobs_response
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

