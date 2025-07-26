from flask import Blueprint, request, jsonify
import json
import re
import random
from datetime import datetime

profile_bp = Blueprint('profile', __name__)

# Configuration OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

@profile_bp.route('/profile/generate', methods=['POST'])
def generate_profile():
    """Génère un profil IA basé sur les données fournies"""
    try:
        data = request.get_json()
        
        # Données d'entrée
        linkedin_url = data.get('linkedin_url', '')
        github_url = data.get('github_url', '')
        cv_text = data.get('cv_text', '')
        additional_info = data.get('additional_info', '')
        
        # Prompt pour l'IA
        prompt = f"""
        Analyse les sources suivantes et génère un profil de candidat structuré :
        
        LinkedIn: {linkedin_url}
        GitHub: {github_url}
        CV: {cv_text}
        Informations supplémentaires: {additional_info}
        
        Génère un profil JSON structuré contenant :
        - technical_skills: liste des compétences techniques
        - soft_skills: liste des compétences comportementales
        - experience_projects: description de l'expérience et projets
        - education_certifications: formation et certifications
        - online_presence: présence en ligne
        - freelance_potential: potentiel freelance (score sur 10)
        - career_goals: objectifs de carrière
        - personal_interests: intérêts personnels
        - geographic_preferences: préférences géographiques
        - summary: résumé en 2-3 phrases
        
        Réponds uniquement avec un JSON valide.
        """
        
        # Simulation de réponse IA (remplacer par vraie API OpenAI si clé disponible)
        if openai.api_key:
            try:
                response = openai.chat.completions.create(
                    model="gpt-4",
                    messages=[
                        {"role": "system", "content": "Tu es un expert en analyse de profils professionnels. Réponds uniquement avec du JSON valide."},
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=1000,
                    temperature=0.7
                )
                
                profile_data = response.choices[0].message.content
                # Tenter de parser le JSON
                import json
                profile_json = json.loads(profile_data)
                
            except Exception as e:
                # Fallback vers profil simulé
                profile_json = generate_mock_profile(data)
        else:
            # Profil simulé si pas de clé API
            profile_json = generate_mock_profile(data)
        
        return jsonify({
            'success': True,
            'profile': profile_json
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

def generate_mock_profile(data: Dict[str, Any]) -> Dict[str, Any]:
    """Génère un profil simulé basé sur les données d'entrée"""
    
    # Extraire les compétences du CV ou des infos supplémentaires
    text_content = f"{data.get('cv_text', '')} {data.get('additional_info', '')}"
    
    # Compétences techniques communes
    tech_skills = []
    common_skills = ['React', 'JavaScript', 'Python', 'Node.js', 'TypeScript', 'Vue.js', 'Angular', 'Java', 'C++', 'SQL', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Git']
    
    for skill in common_skills:
        if skill.lower() in text_content.lower():
            tech_skills.append(skill)
    
    # Si aucune compétence détectée, ajouter des compétences par défaut
    if not tech_skills:
        tech_skills = ['JavaScript', 'React', 'Node.js']
    
    return {
        'technical_skills': tech_skills,
        'soft_skills': ['Communication', 'Travail en équipe', 'Résolution de problèmes', 'Adaptabilité'],
        'experience_projects': 'Développeur avec expérience en développement web moderne. Projets incluant des applications React et des APIs REST.',
        'education_certifications': 'Formation en informatique/ingénierie logicielle',
        'online_presence': {
            'linkedin': data.get('linkedin_url', ''),
            'github': data.get('github_url', ''),
            'portfolio': ''
        },
        'freelance_potential': 8,
        'career_goals': 'Développement de carrière en tant que développeur freelance, spécialisation en technologies web modernes',
        'personal_interests': ['Technologie', 'Innovation', 'Open Source'],
        'geographic_preferences': 'Télétravail, France',
        'summary': f'Développeur passionné avec expertise en {", ".join(tech_skills[:3])}. Orienté vers le freelance et les projets innovants.'
    }

@profile_bp.route('/profile/update', methods=['POST'])
def update_profile():
    """Met à jour un profil existant"""
    try:
        data = request.get_json()
        profile_id = data.get('profile_id')
        updates = data.get('updates', {})
        
        # Ici, on pourrait sauvegarder en base de données
        # Pour l'instant, on retourne simplement les données mises à jour
        
        return jsonify({
            'success': True,
            'message': 'Profil mis à jour avec succès',
            'profile': updates
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@profile_bp.route('/profile/chat', methods=['POST'])
def chat_profile():
    """Chat IA pour ajuster le profil"""
    try:
        data = request.get_json()
        message = data.get('message', '')
        current_profile = data.get('current_profile', {})
        
        # Prompt pour l'ajustement du profil
        prompt = f"""
        Profil actuel: {current_profile}
        
        Message utilisateur: {message}
        
        Basé sur ce message, suggère des améliorations ou modifications au profil.
        Réponds avec un JSON contenant:
        - response: réponse conversationnelle à l'utilisateur
        - suggested_updates: modifications suggérées au profil
        - confidence: niveau de confiance (0-1)
        """
        
        # Simulation de réponse IA
        if openai.api_key:
            try:
                response = openai.chat.completions.create(
                    model="gpt-4",
                    messages=[
                        {"role": "system", "content": "Tu es un assistant IA spécialisé dans l'optimisation de profils professionnels."},
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=500,
                    temperature=0.7
                )
                
                import json
                ai_response = json.loads(response.choices[0].message.content)
                
            except Exception as e:
                ai_response = generate_mock_chat_response(message, current_profile)
        else:
            ai_response = generate_mock_chat_response(message, current_profile)
        
        return jsonify({
            'success': True,
            'response': ai_response.get('response', ''),
            'suggested_updates': ai_response.get('suggested_updates', {}),
            'confidence': ai_response.get('confidence', 0.8)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

def generate_mock_chat_response(message: str, profile: Dict[str, Any]) -> Dict[str, Any]:
    """Génère une réponse de chat simulée"""
    
    message_lower = message.lower()
    
    if 'compétence' in message_lower or 'skill' in message_lower:
        return {
            'response': 'Je vois que vous voulez ajuster vos compétences. Quelles compétences souhaitez-vous ajouter ou modifier ?',
            'suggested_updates': {},
            'confidence': 0.9
        }
    elif 'expérience' in message_lower or 'projet' in message_lower:
        return {
            'response': 'Parfait ! Parlez-moi de vos projets récents pour que je puisse mettre à jour votre profil.',
            'suggested_updates': {},
            'confidence': 0.8
        }
    elif 'freelance' in message_lower or 'mission' in message_lower:
        return {
            'response': 'Excellent ! Je vais optimiser votre profil pour les opportunités freelance. Quel type de missions vous intéresse le plus ?',
            'suggested_updates': {
                'freelance_potential': min(10, profile.get('freelance_potential', 7) + 1)
            },
            'confidence': 0.9
        }
    else:
        return {
            'response': 'Je comprends. Pouvez-vous être plus spécifique sur ce que vous souhaitez améliorer dans votre profil ?',
            'suggested_updates': {},
            'confidence': 0.6
        }

