import pytest
import json
from src.main import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture
def sample_profile():
    return {
        'technical_skills': ['React', 'JavaScript', 'Node.js'],
        'soft_skills': ['Communication', 'Teamwork'],
        'experience_projects': 'Développeur web avec 3 ans d\'expérience',
        'freelance_potential': 8,
        'geographic_preferences': 'Paris, Télétravail'
    }

def test_search_jobs_success(client, sample_profile):
    """Test de recherche d'emplois réussie"""
    search_data = {
        'profile': sample_profile,
        'keywords': ['React', 'Frontend'],
        'location': 'Paris',
        'job_type': 'freelance'
    }
    
    response = client.post('/api/jobs/search', 
                          data=json.dumps(search_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'jobs' in data
    assert 'total_found' in data
    assert len(data['jobs']) > 0

def test_search_jobs_matching_scores(client, sample_profile):
    """Test que les scores de matching sont calculés"""
    search_data = {
        'profile': sample_profile,
        'keywords': ['React'],
        'location': 'France'
    }
    
    response = client.post('/api/jobs/search', 
                          data=json.dumps(search_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    
    for job in data['jobs']:
        assert 'match_score' in job
        assert 0 <= job['match_score'] <= 100
        assert 'matching_skills' in job

def test_search_jobs_sorted_by_match(client, sample_profile):
    """Test que les emplois sont triés par score de matching"""
    search_data = {
        'profile': sample_profile,
        'keywords': ['React']
    }
    
    response = client.post('/api/jobs/search', 
                          data=json.dumps(search_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    
    jobs = data['jobs']
    if len(jobs) > 1:
        # Vérifier que les emplois sont triés par score décroissant
        for i in range(len(jobs) - 1):
            assert jobs[i]['match_score'] >= jobs[i + 1]['match_score']

def test_apply_to_job_success(client, sample_profile):
    """Test de candidature à un emploi réussie"""
    apply_data = {
        'job_id': 'test_job_123',
        'profile': sample_profile,
        'cover_letter': 'Je suis très intéressé par cette opportunité'
    }
    
    response = client.post('/api/jobs/apply', 
                          data=json.dumps(apply_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'application_id' in data
    assert 'message' in data

def test_save_job_success(client):
    """Test de sauvegarde d'emploi réussie"""
    save_data = {
        'job_id': 'test_job_456',
        'user_id': 'test_user_789'
    }
    
    response = client.post('/api/jobs/save', 
                          data=json.dumps(save_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'message' in data

def test_get_job_recommendations_success(client, sample_profile):
    """Test de recommandations d'emplois réussie"""
    recommendations_data = {
        'profile': sample_profile,
        'preferences': {
            'remote_work': True,
            'contract_duration': '3-6 months'
        }
    }
    
    response = client.post('/api/jobs/recommendations', 
                          data=json.dumps(recommendations_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] == True

def test_search_jobs_empty_profile(client):
    """Test de recherche avec profil vide"""
    search_data = {
        'profile': {},
        'keywords': []
    }
    
    response = client.post('/api/jobs/search', 
                          data=json.dumps(search_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] == True
    # Doit retourner des emplois même avec un profil vide

def test_job_matching_algorithm(client):
    """Test de l'algorithme de matching"""
    # Profil avec compétences React
    profile_react = {
        'technical_skills': ['React', 'JavaScript'],
        'geographic_preferences': 'Paris'
    }
    
    search_data = {
        'profile': profile_react,
        'keywords': ['React']
    }
    
    response = client.post('/api/jobs/search', 
                          data=json.dumps(search_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # Les emplois avec React devraient avoir un meilleur score
    react_jobs = [job for job in data['jobs'] if 'React' in job.get('skills_required', [])]
    if react_jobs:
        # Au moins un emploi React devrait avoir un score élevé
        max_score = max(job['match_score'] for job in react_jobs)
        assert max_score >= 70  # Score minimum attendu pour une correspondance exacte

def test_jobs_api_invalid_json(client):
    """Test avec JSON invalide"""
    response = client.post('/api/jobs/search', 
                          data='invalid json',
                          content_type='application/json')
    
    assert response.status_code == 500

