import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, UserProfile } from './types';
import { formQuestions } from './data/formQuestions';
import { useGeminiAPI } from './hooks/useGeminiAPI';
import Header from './components/Header';
import ChatBubble from './components/ChatBubble';
import InputCard from './components/InputCard';
import StyleRecommendations from './components/StyleRecommendations';
import { Send, Mic } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const { generateStyleRecommendation, loading, error } = useGeminiAPI();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Initial greeting
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'bot',
      content: '✨ Assalam-o-Alaikum! Hello gorgeous! I\'m GlowBot, your personal style bestie! 💕 I\'m absolutely thrilled to help you discover the most stunning Pakistani fashion styles that will make you look and feel like the queen you are! Let\'s start this amazing styling journey together and make you shine! ✨👑',
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    
    // Ask first question after a delay
    setTimeout(() => {
      askCurrentQuestion();
    }, 1500);
  }, []);

  const getPersonalizedMessage = (questionIndex: number) => {
    const name = userProfile.name || 'beautiful';
    const gender = userProfile.gender;
    const language = userProfile.language;
    
    const pronoun = gender === 'Male' ? 'him' : gender === 'Female' ? 'her' : 'them';
    const title = gender === 'Male' ? 'handsome' : gender === 'Female' ? 'gorgeous' : 'beautiful';
    
    if (language === 'Roman Urdu') {
      const urduMessages = [
        `${name} jaan, ab mujhe batao...`,
        `Bilkul perfect ${name}! Ab next sawal...`,
        `Mashallah ${name}, tumhara jawab bohot acha hai! Ab...`,
        `${name} beta, tum kitni smart ho! Ab mujhe ye batao...`,
        `Wah ${name}! Tumhara taste bohot acha hai. Ab...`
      ];
      return urduMessages[Math.min(questionIndex - 3, urduMessages.length - 1)];
    } else {
      const englishMessages = [
        `Perfect ${name}! You're doing amazing, ${title}! Now let me ask you...`,
        `Wonderful choice ${name}! I can already see your great taste! Next question...`,
        `${name}, you're absolutely glowing already! Now tell me...`,
        `Love it ${name}! You're making this so easy for me! Let's continue...`,
        `${name}, you have such great style sense! Now I need to know...`
      ];
      return englishMessages[Math.min(questionIndex - 3, englishMessages.length - 1)];
    }
  };

  const askCurrentQuestion = () => {
    if (currentQuestionIndex < formQuestions.length) {
      const question = formQuestions[currentQuestionIndex];
      let content = question.title;
      
      // Add personalized message for questions after name
      if (currentQuestionIndex > 2 && userProfile.name) {
        content = getPersonalizedMessage(currentQuestionIndex) + ' ' + question.title;
      }
      
      const questionMessage: ChatMessage = {
        id: `q-${currentQuestionIndex}`,
        type: 'bot',
        content: content,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, questionMessage]);
    }
  };

  const handleAnswer = async (answer: string) => {
    if (!answer.trim()) return;

    const question = formQuestions[currentQuestionIndex];
    const userMessage: ChatMessage = {
      id: `a-${currentQuestionIndex}`,
      type: 'user',
      content: answer,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Update user profile
    const updatedProfile = {
      ...userProfile,
      [question.id]: answer
    };
    setUserProfile(updatedProfile);

    // Reset current answer
    setCurrentAnswer('');

    // Move to next question or complete
    if (currentQuestionIndex < formQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeout(() => {
        askCurrentQuestion();
      }, 800);
    } else {
      // All questions completed
      setIsCompleted(true);
      
      const name = updatedProfile.name || 'beautiful';
      const language = updatedProfile.language;
      
      let completionText;
      if (language === 'Roman Urdu') {
        completionText = `🎉 Mashallah ${name}! Tumne sab kuch perfect bataya hai! Ab main tumhare liye bilkul perfect styling recommendations bana rahi hun. Thoda intezar karo, main tumhare liye kuch bohot special dhund rahi hun! ✨💕`;
      } else {
        completionText = `🎉 Perfect ${name}! You've given me everything I need to create the most amazing style recommendations just for you! I'm so excited to show you what I've found - you're going to look absolutely stunning! ✨👑`;
      }
      
      const completionMessage: ChatMessage = {
        id: 'completion',
        type: 'bot',
        content: completionText,
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages(prev => [...prev, completionMessage]);

      // Generate recommendations
      try {
        const recs = await generateStyleRecommendation(updatedProfile as UserProfile);
        setRecommendations(recs);
        
        let successText;
        if (language === 'Roman Urdu') {
          successText = `✨ ${name} jaan, dekho main tumhare liye kya amazing outfits dhundi hun! Har outfit tumhare body type, skin tone aur preferences ke hisab se specially select kiya gaya hai. Tumhe bilkul princess lagegi! 👑💕`;
        } else {
          successText = `✨ ${name}, here are your absolutely gorgeous personalized style recommendations! Each outfit has been lovingly selected based on your beautiful features, preferences, and the occasion. You're going to look like the absolute queen you are! 👑💕`;
        }
        
        const successMessage: ChatMessage = {
          id: 'success',
          type: 'bot',
          content: successText,
          timestamp: new Date()
        };
        
        setMessages(prev => prev.filter(m => m.id !== 'completion').concat([successMessage]));
      } catch (err) {
        console.error('Error generating recommendations:', err);
      }
    }
  };

  const getCurrentQuestion = () => {
    return currentQuestionIndex < formQuestions.length ? formQuestions[currentQuestionIndex] : null;
  };

  const currentQuestion = getCurrentQuestion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Chat Messages */}
        <div className="mb-6">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          
          {/* Current Question Input */}
          {!isCompleted && currentQuestion && (
            <div className="mt-6">
              <InputCard
                title={currentQuestion.title}
                description={currentQuestion.description}
                type={currentQuestion.type}
                options={currentQuestion.options}
                value={currentAnswer}
                onChange={setCurrentAnswer}
                placeholder={currentQuestion.placeholder}
                min={currentQuestion.min}
                max={currentQuestion.max}
                step={currentQuestion.step}
              />
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleAnswer(currentAnswer)}
                  disabled={!currentAnswer.trim() || loading}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full hover:from-pink-500 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                  <span>Continue</span>
                </button>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Style Recommendations */}
        {isCompleted && recommendations.length > 0 && (
          <StyleRecommendations 
            recommendations={recommendations} 
            userProfile={userProfile as UserProfile}
          />
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <p className="text-yellow-800 text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Made with 💖 by iGlowUP Pakistan | Powered by AI | Your Personal Style Bestie</p>
      </footer>
    </div>
  );
}

export default App;