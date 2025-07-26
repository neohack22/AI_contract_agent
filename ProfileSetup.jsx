import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { User, Github, Linkedin, Upload, X, Plus } from 'lucide-react'

export function ProfileSetup({ onProfileComplete }) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    skills: [],
    experience: '',
    preferences: '',
    github: '',
    linkedin: ''
  })
  
  const [newSkill, setNewSkill] = useState('')

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (profile.name && profile.email && profile.skills.length > 0) {
      onProfileComplete(profile)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2" size={20} />
          Configuration du profil
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Aidez-nous à mieux vous connaître pour trouver les meilleures opportunités
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Votre nom"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Compétences techniques *</Label>
            <div className="flex space-x-2">
              <Input
                id="skills"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ex: React, Python, Node.js..."
              />
              <Button type="button" onClick={handleAddSkill} variant="outline">
                <Plus size={16} />
              </Button>
            </div>
            
            {profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X 
                      size={12} 
                      className="cursor-pointer hover:text-destructive"
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Expérience professionnelle</Label>
            <Textarea
              id="experience"
              value={profile.experience}
              onChange={(e) => setProfile(prev => ({ ...prev, experience: e.target.value }))}
              placeholder="Décrivez brièvement votre expérience..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferences">Préférences de travail</Label>
            <Textarea
              id="preferences"
              value={profile.preferences}
              onChange={(e) => setProfile(prev => ({ ...prev, preferences: e.target.value }))}
              placeholder="Type de projets, secteurs d'activité, modalités de travail..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub (optionnel)</Label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  id="github"
                  value={profile.github}
                  onChange={(e) => setProfile(prev => ({ ...prev, github: e.target.value }))}
                  placeholder="github.com/username"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn (optionnel)</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  id="linkedin"
                  value={profile.linkedin}
                  onChange={(e) => setProfile(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="linkedin.com/in/username"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button type="button" variant="outline">
              <Upload size={16} className="mr-2" />
              Importer CV
            </Button>
            
            <Button 
              type="submit" 
              disabled={!profile.name || !profile.email || profile.skills.length === 0}
            >
              Commencer la recherche
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

