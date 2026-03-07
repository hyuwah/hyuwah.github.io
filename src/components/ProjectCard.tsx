import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge, badgeVariants } from './ui/badge'
import { Github, ExternalLink, Star } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  subtitle?: string
  github?: string
  link?: string
  tech?: string[]
  image?: string
}

export default function ProjectCard({
  title,
  description,
  subtitle,
  github,
  link,
  tech = [],
  image
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
          {tech.length > 0 && tech[0] && (
            <Badge className="absolute top-3 left-3" variant="secondary">
              {tech[0]}
            </Badge>
          )}
        </div>
      )}
      
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
        
        {tech.length > 1 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tech.slice(1, 5).map((t) => (
              <Badge key={t} variant="outline" className="text-xs">
                {t}
              </Badge>
            ))}
            {tech.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{tech.length - 5}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="gap-2">
        {github && (
          <Button variant="outline" size="sm" asChild>
            <a href={github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
        )}
        {link && (
          <Button size="sm" asChild>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              {link.includes('play.google.com') ? 'Play Store' : 'Demo'}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
