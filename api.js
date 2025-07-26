const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api'

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Profile API methods
  async generateProfile(profileData) {
    return this.request('/profile/generate', {
      method: 'POST',
      body: JSON.stringify(profileData),
    })
  }

  async updateProfile(profileId, updates) {
    return this.request('/profile/update', {
      method: 'POST',
      body: JSON.stringify({ profile_id: profileId, updates }),
    })
  }

  async chatProfile(message, currentProfile) {
    return this.request('/profile/chat', {
      method: 'POST',
      body: JSON.stringify({ 
        message, 
        current_profile: currentProfile 
      }),
    })
  }

  // Jobs API methods
  async searchJobs(profile, keywords = [], location = 'France', jobType = 'freelance') {
    return this.request('/jobs/search', {
      method: 'POST',
      body: JSON.stringify({
        profile,
        keywords,
        location,
        job_type: jobType,
      }),
    })
  }

  async applyToJob(jobId, profile, coverLetter = '') {
    return this.request('/jobs/apply', {
      method: 'POST',
      body: JSON.stringify({
        job_id: jobId,
        profile,
        cover_letter: coverLetter,
      }),
    })
  }

  async saveJob(jobId, userId) {
    return this.request('/jobs/save', {
      method: 'POST',
      body: JSON.stringify({
        job_id: jobId,
        user_id: userId,
      }),
    })
  }

  async getJobRecommendations(profile, preferences = {}) {
    return this.request('/jobs/recommendations', {
      method: 'POST',
      body: JSON.stringify({
        profile,
        preferences,
      }),
    })
  }

  // Mock methods for development (fallback when backend is not available)
  async mockGenerateProfile(profileData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const skills = []
    const text = `${profileData.cv_text || ''} ${profileData.additional_info || ''}`.toLowerCase()
    
    const commonSkills = ['React', 'JavaScript', 'Python', 'Node.js', 'TypeScript', 'Vue.js']
    commonSkills.forEach(skill => {
      if (text.includes(skill.toLowerCase())) {
        skills.push(skill)
      }
    })
    
    if (skills.length === 0) {
      skills.push('JavaScript', 'React')
    }
    
    return {
      success: true,
      profile: {
        technical_skills: skills,
        soft_skills: ['Communication', 'Teamwork', 'Problem Solving'],
        experience_projects: 'Web developer with modern technologies experience',
        education_certifications: 'Computer Science / Software Engineering',
        online_presence: {
          linkedin: profileData.linkedin_url || '',
          github: profileData.github_url || '',
        },
        freelance_potential: 8,
        career_goals: 'Freelance development career',
        personal_interests: ['Technology', 'Innovation'],
        geographic_preferences: 'Remote, France',
        summary: `Passionate developer with expertise in ${skills.slice(0, 3).join(', ')}.`
      }
    }
  }

  async mockSearchJobs(profile) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const skills = profile.technical_skills || ['JavaScript', 'React']
    const companies = ['TechStart', 'InnovateCorp', 'DigitalSolutions', 'WebAgency']
    const titles = ['Frontend Developer', 'Full Stack Developer', 'React Developer']
    
    const jobs = Array.from({ length: 8 }, (_, i) => ({
      id: `job_${i}`,
      title: titles[i % titles.length],
      company: companies[i % companies.length],
      description: 'Development of modern web application with latest technologies',
      skills_required: skills.slice(0, Math.min(skills.length, 3)),
      location: ['Paris', 'Remote', 'Lyon'][i % 3],
      contract_type: 'Freelance',
      duration: `${Math.floor(Math.random() * 12) + 1} months`,
      daily_rate: `${Math.floor(Math.random() * 500) + 300}€/day`,
      match_score: Math.floor(Math.random() * 40) + 60,
      source: 'simulation'
    }))
    
    return {
      success: true,
      jobs: jobs.sort((a, b) => b.match_score - a.match_score),
      total_found: jobs.length
    }
  }
}

export const apiService = new ApiService()

