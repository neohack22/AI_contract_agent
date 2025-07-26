import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { History, Bookmark, ExternalLink, Trash2, Eye } from 'lucide-react'

export function JobHistory({ savedJobs, appliedJobs, onViewJob, onRemoveJob, onApplyToSaved }) {
  const JobList = ({ jobs, type }) => (
    <div className="space-y-4">
      {jobs.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            {type === 'saved' ? <Bookmark size={24} /> : <ExternalLink size={24} />}
          </div>
          <p>
            {type === 'saved' 
              ? 'Aucun emploi sauvegardé pour le moment'
              : 'Aucune candidature envoyée pour le moment'
            }
          </p>
        </div>
      ) : (
        jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{job.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {job.match}% match
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewJob(job)}
                >
                  <Eye size={14} className="mr-1" />
                  Voir
                </Button>
                
                {type === 'saved' && (
                  <Button
                    size="sm"
                    onClick={() => onApplyToSaved(job)}
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Postuler
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemoveJob(job.id, type)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={14} className="mr-1" />
                  Supprimer
                </Button>
              </div>
              
              {job.appliedAt && (
                <p className="text-xs text-muted-foreground mt-2">
                  Candidature envoyée le {new Date(job.appliedAt).toLocaleDateString()}
                </p>
              )}
              
              {job.savedAt && (
                <p className="text-xs text-muted-foreground mt-2">
                  Sauvegardé le {new Date(job.savedAt).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="mr-2" size={20} />
          Historique et emplois sauvegardés
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="saved" className="flex items-center">
              <Bookmark size={16} className="mr-2" />
              Sauvegardés ({savedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="applied" className="flex items-center">
              <ExternalLink size={16} className="mr-2" />
              Candidatures ({appliedJobs.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved" className="mt-4">
            <JobList jobs={savedJobs} type="saved" />
          </TabsContent>
          
          <TabsContent value="applied" className="mt-4">
            <JobList jobs={appliedJobs} type="applied" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

