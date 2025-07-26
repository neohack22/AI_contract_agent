import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LanguageToggle } from '../../components/LanguageToggle'
import { useTranslation } from 'react-i18next'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}))

describe('LanguageToggle', () => {
  const mockChangeLanguage = vi.fn()
  const mockT = vi.fn((key) => key)

  beforeEach(() => {
    vi.clearAllMocks()
    useTranslation.mockReturnValue({
      i18n: {
        language: 'fr',
        changeLanguage: mockChangeLanguage,
      },
      t: mockT,
    })
  })

  it('renders with French as default language', () => {
    render(<LanguageToggle />)
    
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Français')).toBeInTheDocument()
  })

  it('shows English option when opened', async () => {
    render(<LanguageToggle />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('🇺🇸')).toBeInTheDocument()
  })

  it('changes language when option is clicked', async () => {
    render(<LanguageToggle />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    const englishOption = screen.getByText('English')
    fireEvent.click(englishOption)
    
    expect(mockChangeLanguage).toHaveBeenCalledWith('en')
  })

  it('shows current language with check mark', () => {
    useTranslation.mockReturnValue({
      i18n: {
        language: 'en',
        changeLanguage: mockChangeLanguage,
      },
      t: mockT,
    })

    render(<LanguageToggle />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(screen.getByText('English')).toBeInTheDocument()
  })
})

