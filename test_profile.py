import pytest
import json
from src.main import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_generate_profile_success(client):
    """Test de génération de profil réussie"""
    profile_data = {
        'linkedin_url': 'https://linkedin.com/in/test',
        'github_url': 'https://github.com/test',
        'cv_text': 'Développeur React avec 3 ans d\'expérience',
        'additional_info': 'Passionné par JavaScript et Python'
    }
    
    response = client.post('/api/profile/generate', 
                          data=json.dumps(profile_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'profile' in data
    assert 'technical_skills' in data['profile']
    assert 'summary' in data['profile']

def test_generate_profile_empty_data(client):
    """Test de génération de profil avec données vides"""
    profile_data = {}
    
    response = client.post('/api/profile/generate', 
                          data=json.dumps(profile_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] == True
    # Doit générer un profil par défaut même avec des données vides

def test_update_profile_success(client):
    """Test de mise à jour de profil réussie"""
    update_data = {
        'profile_id': 'test_profile_123',
        'updates': {
            'technical_skills': ['React', 'Node.js', 'Python'],
            'career_goals': 'Devenir développeur freelance senior'
        }
    }
    
    response = client.post('/api/profile/update', 
                          data=json.dumps(update_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'message' in data

def test_chat_profile_success(client):
    """Test de chat profil réussi"""
    chat_data = {
        'message': 'Je veux ajouter Python à mes compétences',
        'current_profile': {
            'technical_skills': ['React', 'JavaScript'],
            'freelance_potential': 7
        }
    }
    
    response = client.post('/api/profile/chat', 
                          data=json.dumps(chat_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'response' in data
    assert 'confidence' in data

def test_chat_profile_freelance_keyword(client):
    """Test de chat avec mot-clé freelance"""
    chat_data = {
        'message': 'Je veux me lancer en freelance',
        'current_profile': {
            'technical_skills': ['React'],
            'freelance_potential': 6
        }
    }
    
    response = client.post('/api/profile/chat', 
                          data=json.dumps(chat_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] == True
    # Doit suggérer une amélioration du potentiel freelance
    if 'suggested_updates' in data and 'freelance_potential' in data['suggested_updates']:
        assert data['suggested_updates']['freelance_potential'] > 6

def test_profile_api_invalid_json(client):
    """Test avec JSON invalide"""
    response = client.post('/api/profile/generate', 
                          data='invalid json',
                          content_type='application/json')
    
    assert response.status_code == 500

def test_profile_skills_detection(client):
    """Test de détection des compétences dans le CV"""
    profile_data = {
        'cv_text': 'Développeur expert en React, Node.js et Python. Expérience avec MongoDB et Docker.',
        'additional_info': 'Maîtrise de TypeScript et Vue.js'
    }
    
    response = client.post('/api/profile/generate', 
                          data=json.dumps(profile_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    skills = data['profile']['technical_skills']
    
    # Vérifier que les compétences mentionnées sont détectées
    expected_skills = ['React', 'Node.js', 'Python']
    for skill in expected_skills:
        assert skill in skills

