import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Send, Bot, User } from 'lucide-react'

export function ChatInterface({ onJobMatch }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Bonjour ! Je suis votre assistant IA pour trouver des contrats de développement. Parlez-moi de votre profil et de vos préférences pour commencer.",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simuler une réponse de l'IA
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)

      // Simuler la génération de correspondances d'emplois
      if (inputValue.toLowerCase().includes('react') || inputValue.toLowerCase().includes('javascript')) {
        setTimeout(() => {
          onJobMatch([
            {
              id: 1,
              title: "Développeur React Frontend",
              company: "TechStart",
              skills: ["React", "JavaScript", "CSS"],
              match: 95,
              description: "Développement d'une application web moderne avec React"
            },
            {
              id: 2,
              title: "Développeur Full Stack",
              company: "InnovateCorp",
              skills: ["React", "Node.js", "MongoDB"],
              match: 87,
              description: "Création d'une plateforme e-commerce complète"
            }
          ])
        }, 1000)
      }
    }, 1500)
  }

  const generateBotResponse = (userInput) => {
    const responses = [
      "Excellent ! Basé sur votre profil, je vais rechercher des opportunités qui correspondent à vos compétences.",
      "Je comprends vos préférences. Laissez-moi analyser les meilleures correspondances pour vous.",
      "Parfait ! Je vais maintenant chercher des contrats qui correspondent à votre expertise.",
      "Merci pour ces informations. Je prépare une liste personnalisée d'opportunités pour vous."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 p-4 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-secondary text-secondary-foreground rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Décrivez vos compétences, expérience ou préférences..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
              <Send size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

