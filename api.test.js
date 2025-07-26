import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiService } from '../../services/api'

describe('ApiService', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('generateProfile', () => {
    it('should generate profile successfully', async () => {
      const mockResponse = {
        success: true,
        profile: {
          technical_skills: ['React', 'JavaScript'],
          summary: 'Test developer'
        }
      }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const profileData = {
        cv_text: 'React developer with experience',
        linkedin_url: 'https://linkedin.com/in/test'
      }

      const result = await apiService.generateProfile(profileData)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/profile/generate'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(profileData)
        })
      )

      expect(result).toEqual(mockResponse)
    })

    it('should handle API errors', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      const profileData = { cv_text: 'test' }

      await expect(apiService.generateProfile(profileData)).rejects.toThrow()
    })
  })

  describe('searchJobs', () => {
    it('should search jobs successfully', async () => {
      const mockResponse = {
        success: true,
        jobs: [
          {
            id: 'job1',
            title: 'React Developer',
            match_score: 85
          }
        ],
        total_found: 1
      }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const profile = { technical_skills: ['React'] }
      const result = await apiService.searchJobs(profile)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/jobs/search'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            profile,
            keywords: [],
            location: 'France',
            job_type: 'freelance'
          })
        })
      )

      expect(result).toEqual(mockResponse)
    })
  })

  describe('mockGenerateProfile', () => {
    it('should generate mock profile with detected skills', async () => {
      const profileData = {
        cv_text: 'Expert React developer with Node.js experience',
        additional_info: 'Also knows Python'
      }

      const result = await apiService.mockGenerateProfile(profileData)

      expect(result.success).toBe(true)
      expect(result.profile.technical_skills).toContain('React')
      expect(result.profile.technical_skills).toContain('Node.js')
      expect(result.profile.technical_skills).toContain('Python')
    })

    it('should provide default skills when none detected', async () => {
      const profileData = {
        cv_text: 'General developer',
        additional_info: ''
      }

      const result = await apiService.mockGenerateProfile(profileData)

      expect(result.success).toBe(true)
      expect(result.profile.technical_skills).toContain('JavaScript')
      expect(result.profile.technical_skills).toContain('React')
    })
  })

  describe('mockSearchJobs', () => {
    it('should generate mock jobs based on profile skills', async () => {
      const profile = {
        technical_skills: ['React', 'JavaScript', 'Node.js']
      }

      const result = await apiService.mockSearchJobs(profile)

      expect(result.success).toBe(true)
      expect(result.jobs).toHaveLength(8)
      expect(result.jobs[0]).toHaveProperty('match_score')
      expect(result.jobs[0]).toHaveProperty('skills_required')
      
      // Jobs should be sorted by match score
      for (let i = 0; i < result.jobs.length - 1; i++) {
        expect(result.jobs[i].match_score).toBeGreaterThanOrEqual(
          result.jobs[i + 1].match_score
        )
      }
    })
  })

  describe('chatProfile', () => {
    it('should send chat message successfully', async () => {
      const mockResponse = {
        success: true,
        response: 'I understand your request',
        confidence: 0.8
      }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const message = 'I want to add Python to my skills'
      const profile = { technical_skills: ['React'] }

      const result = await apiService.chatProfile(message, profile)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/profile/chat'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            message,
            current_profile: profile
          })
        })
      )

      expect(result).toEqual(mockResponse)
    })
  })

  describe('applyToJob', () => {
    it('should apply to job successfully', async () => {
      const mockResponse = {
        success: true,
        application_id: 'app_123',
        message: 'Application sent successfully'
      }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const jobId = 'job_123'
      const profile = { technical_skills: ['React'] }
      const coverLetter = 'I am interested in this position'

      const result = await apiService.applyToJob(jobId, profile, coverLetter)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/jobs/apply'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            job_id: jobId,
            profile,
            cover_letter: coverLetter
          })
        })
      )

      expect(result).toEqual(mockResponse)
    })
  })
})

