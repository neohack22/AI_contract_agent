import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, Star, ExternalLink, Bookmark, MessageCircle } from 'lucide-react'

export function JobCard({ job, onApply, onSave, onSkip, onAskDetails }) {
  const getMatchColor = (match) => {
    if (match >= 90) return 'text-green-600 bg-green-100'
    if (match >= 75) return 'text-blue-600 bg-blue-100'
    if (match >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground mb-1">
              {job.title}
            </CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <Building2 size={14} className="mr-1" />
              {job.company}
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job.match)}`}>
            <Star size={14} className="inline mr-1" />
            {job.match}% match
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {job.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => onApply(job)}
            className="flex-1 sm:flex-none"
            size="sm"
          >
            <ExternalLink size={14} className="mr-1" />
            Postuler
          </Button>
          
          <Button 
            onClick={() => onSave(job)}
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none"
          >
            <Bookmark size={14} className="mr-1" />
            Sauvegarder
          </Button>
          
          <Button 
            onClick={() => onAskDetails(job)}
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none"
          >
            <MessageCircle size={14} className="mr-1" />
            Détails
          </Button>
          
          <Button 
            onClick={() => onSkip(job)}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Passer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

