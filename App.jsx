import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { ProfileSetup } from './components/ProfileSetup'
import { ChatInterface } from './components/ChatInterface'
import { JobCard } from './components/JobCard'
import { JobHistory } from './components/JobHistory'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MessageSquare, Briefcase, History, Lightbulb } from 'lucide-react'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [isDark, setIsDark] = useState(false)
  const [currentJobs, setCurrentJobs] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [appliedJobs, setAppliedJobs] = useState([])
  const [activeTab, setActiveTab] = useState('chat')
  const [isProfileSetup, setIsProfileSetup] = useState(false)

  // Gestion du thème
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    
    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle('dark', shouldBeDark)
  }, [])

  const handleThemeToggle = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newTheme)
  }

  const handleProfileComplete = (profileData) => {
    setUser(profileData)
    setIsProfileSetup(false)
    setActiveTab('chat')
  }

  const handleJobMatch = (jobs) => {
    setCurrentJobs(jobs)
    setActiveTab('jobs')
  }

  const handleApply = (job) => {
    const appliedJob = {
      ...job,
      appliedAt: new Date().toISOString()
    }
    setAppliedJobs(prev => [...prev, appliedJob])
    setCurrentJobs(prev => prev.filter(j => j.id !== job.id))
    
    // Notification simple
    alert(`Candidature envoyée pour ${job.title} chez ${job.company}!`)
  }

  const handleSave = (job) => {
    const savedJob = {
      ...job,
      savedAt: new Date().toISOString()
    }
    setSavedJobs(prev => [...prev, savedJob])
    setCurrentJobs(prev => prev.filter(j => j.id !== job.id))
    
    // Notification simple
    alert(`Emploi sauvegardé: ${job.title}`)
  }

  const handleSkip = (job) => {
    setCurrentJobs(prev => prev.filter(j => j.id !== job.id))
  }

  const handleAskDetails = (job) => {
    alert(`Détails pour ${job.title}:\n\n${job.description}\n\nCompétences requises: ${job.skills.join(', ')}`)
  }

  const handleRemoveJob = (jobId, type) => {
    if (type === 'saved') {
      setSavedJobs(prev => prev.filter(j => j.id !== jobId))
    } else {
      setAppliedJobs(prev => prev.filter(j => j.id !== jobId))
    }
  }

  const handleApplyToSaved = (job) => {
    handleApply(job)
    setSavedJobs(prev => prev.filter(j => j.id !== job.id))
  }

  const handleViewJob = (job) => {
    handleAskDetails(job)
  }

  const handleProfileEdit = () => {
    setIsProfileSetup(true)
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentJobs([])
    setSavedJobs([])
    setAppliedJobs([])
    setActiveTab('chat')
  }

  // Si pas d'utilisateur ou en mode configuration
  if (!user || isProfileSetup) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          user={user}
          onThemeToggle={handleThemeToggle}
          isDark={isDark}
          onProfileEdit={handleProfileEdit}
          onLogout={handleLogout}
        />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {!user && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Bienvenue sur AI Contract Agent
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Trouvez rapidement les meilleurs contrats de développement grâce à l'IA
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <h3 className="font-semibold mb-2">Interface conversationnelle</h3>
                      <p className="text-sm text-muted-foreground">
                        Discutez avec notre IA pour affiner vos préférences
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Briefcase className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <h3 className="font-semibold mb-2">Correspondances intelligentes</h3>
                      <p className="text-sm text-muted-foreground">
                        Recevez des offres personnalisées selon votre profil
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Lightbulb className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <h3 className="font-semibold mb-2">Recommandations</h3>
                      <p className="text-sm text-muted-foreground">
                        Obtenez des conseils pour améliorer votre profil
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            <ProfileSetup onProfileComplete={handleProfileComplete} />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user}
        onThemeToggle={handleThemeToggle}
        isDark={isDark}
        onProfileEdit={handleProfileEdit}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="chat" className="flex items-center">
              <MessageSquare size={16} className="mr-2" />
              Chat IA
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center">
              <Briefcase size={16} className="mr-2" />
              Emplois ({currentJobs.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History size={16} className="mr-2" />
              Historique
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
              <div className="lg:col-span-2">
                <ChatInterface onJobMatch={handleJobMatch} />
              </div>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Votre profil</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Nom:</strong> {user.name}</p>
                      <p><strong>Compétences:</strong> {user.skills.slice(0, 3).join(', ')}</p>
                      {user.skills.length > 3 && (
                        <p className="text-muted-foreground">+{user.skills.length - 3} autres</p>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3 w-full"
                      onClick={handleProfileEdit}
                    >
                      Modifier le profil
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Conseils</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Soyez précis sur vos compétences techniques</p>
                      <p>• Mentionnez vos préférences de travail</p>
                      <p>• Décrivez vos projets récents</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            {currentJobs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Aucune offre pour le moment</h3>
                  <p className="text-muted-foreground mb-4">
                    Discutez avec l'IA dans l'onglet Chat pour recevoir des recommandations personnalisées
                  </p>
                  <Button onClick={() => setActiveTab('chat')}>
                    Commencer une conversation
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
                    onSave={handleSave}
                    onSkip={handleSkip}
                    onAskDetails={handleAskDetails}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            <JobHistory
              savedJobs={savedJobs}
              appliedJobs={appliedJobs}
              onViewJob={handleViewJob}
              onRemoveJob={handleRemoveJob}
              onApplyToSaved={handleApplyToSaved}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App

