import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Bot, Moon, Sun, User, Settings, LogOut, Menu } from 'lucide-react'
import { LanguageToggle } from './LanguageToggle'

export function Header({ user, onThemeToggle, isDark, onProfileEdit, onLogout }) {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg">
              <Bot size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AI Contract Agent</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {user.skills?.length || 0} {t('skills')}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {t('hello')}, {user.name?.split(' ')[0]}
                </span>
              </div>
            )}
            
            <LanguageToggle />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onThemeToggle}
              className="w-9 h-9 p-0"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </Button>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                    <User size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onProfileEdit}>
                    <Settings size={16} className="mr-2" />
                    {t('editProfile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut size={16} className="mr-2" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                  <Menu size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user && (
                  <>
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {user.name}
                    </div>
                    <div className="px-2 py-1 text-xs text-muted-foreground">
                      {user.skills?.length || 0} {t('skills')}
                    </div>
                    <DropdownMenuItem onClick={onProfileEdit}>
                      <Settings size={16} className="mr-2" />
                      {t('editProfile')}
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem onClick={onThemeToggle}>
                  {isDark ? <Sun size={16} className="mr-2" /> : <Moon size={16} className="mr-2" />}
                  {isDark ? t('lightMode') : t('darkMode')}
                </DropdownMenuItem>
                {user && (
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut size={16} className="mr-2" />
                    {t('logout')}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

