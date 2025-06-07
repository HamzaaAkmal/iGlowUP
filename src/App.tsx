import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, UserProfile } from './types';
import { formQuestions } from './data/formQuestions';
import { useGeminiAPI } from './hooks/useGeminiAPI';
import Header from './components/Header';
import ChatBubble from './components/ChatBubble';
import InputCard from './components/InputCard';
import StyleRecommendations from './components/StyleRecommendations';
import PrivacyModal from './components/PrivacyModal'; // Import PrivacyModal
import { Send, Mic } from 'lucide-react';

function App() {
  const [hasAgreedToPrivacy, setHasAgreedToPrivacy] = useState(false); // Add state for privacy agreement
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
    if (hasAgreedToPrivacy) {
      // If messages are empty, it means this is the first load after agreeing to privacy.
      // Ask the first question (agent selection).
      if (messages.length === 0) {
        setMessages([]); // Ensure messages are truly empty before starting
        askCurrentQuestion(true); // Pass true to indicate it's the initial call
      }
    }
  }, [hasAgreedToPrivacy, messages.length]); // Rerun if messages.length changes to ensure it only runs once post-agreement

  const getPersonalizedMessage = (questionIndex: number) => {
    const name = userProfile.name || 'Friend'; // Default to "Friend" if name not yet provided
    const agentGender = userProfile.gender; // This is the selected agent's gender
    const language = userProfile.language;

    // Check if name question has been answered (index 1 is name)
    const nameProvided = !!userProfile.name;

    if (language === 'Roman Urdu') {
      if (agentGender === 'female') {
        const urduMessagesFemale = nameProvided ? [
          `Theek hai ${name}! Chalo agay barhtay hain...`,
          `Bohat acha ${name}! Ab mujhe yeh batao...`,
          `Samajh gayi ${name}! Next sawal yeh hai...`,
          `Bilkul ${name}! Ab iske baray mein kya khayal hai...?`
        ] : [ // Generic messages if name not yet provided
          `Theek hai! Chalo agay barhtay hain...`,
          `Bohat acha! Ab mujhe yeh batao...`,
        ];
        return urduMessagesFemale[Math.floor(Math.random() * urduMessagesFemale.length)];
      } else { // male agent
        const urduMessagesMale = nameProvided ? [
          `Okay ${name}. Agla sawal...`,
          `Theek hai ${name}. Ab yeh batayen...`,
          `Samajh gaya ${name}. Next...`,
          `Bilkul ${name}. Iske baray mein kya socha hai...?`
        ] : [ // Generic messages if name not yet provided
          `Okay. Agla sawal...`,
          `Theek hai. Ab yeh batayen...`,
        ];
        return urduMessagesMale[Math.floor(Math.random() * urduMessagesMale.length)];
      }
    } else { // English
      if (agentGender === 'female') {
        const englishMessagesFemale = nameProvided ? [
          `Alright ${name}! Let's move on to the next question...`,
          `Great choice, ${name}! Now, tell me about...`,
          `Got it, ${name}! My next question for you is...`,
          `Perfect, ${name}! And what about...?`
        ] : [ // Generic messages if name not yet provided
          `Alright! Let's move on to the next question...`,
          `Great choice! Now, tell me about...`,
        ];
        return englishMessagesFemale[Math.floor(Math.random() * englishMessagesFemale.length)];
      } else { // male agent
        const englishMessagesMale = nameProvided ? [
          `Okay ${name}, that's helpful. Next up...`,
          `Understood, ${name}. Let's get some more details...`,
          `Got it, ${name}. The next thing I need to know is...`,
          `Alright ${name}. And how about...?`
        ] : [ // Generic messages if name not yet provided
          `Okay, that's helpful. Next up...`,
          `Understood. Let's get some more details...`,
        ];
        return englishMessagesMale[Math.floor(Math.random() * englishMessagesMale.length)];
      }
    }
  };

  const askCurrentQuestion = (isInitialCall = false) => {
    // Do not ask if privacy not agreed AND it's not the initial call post-agreement.
    if (!hasAgreedToPrivacy && !isInitialCall) return;

    if (currentQuestionIndex < formQuestions.length) {
      const question = formQuestions[currentQuestionIndex];
      let content = question.title;
      
      // Add personalized message only after the first three questions (agent, name, language)
      // and if name is available.
      if (currentQuestionIndex > 2 && userProfile.name && userProfile.gender && userProfile.language) {
        content = getPersonalizedMessage(currentQuestionIndex) + ' ' + question.title;
      } else {
        // For the first few questions, or if name/gender/language isn't set, use the plain title.
        content = question.title;
      }
      
      const newQuestionMessage: ChatMessage = {
        id: `q-${currentQuestionIndex}`,
        type: 'bot',
        content: content,
        timestamp: new Date()
      };

      // Add typing indicator for bot question
      setMessages(prev => [...prev, {
        id: 'typing-bot',
        type: 'bot',
        content: '...', // Content doesn't matter for typing indicator
        timestamp: new Date(),
        isTyping: true,
        // agentType: userProfile.gender as ('female' | 'male' | undefined)
      }]);

      const delay = isInitialCall ? 500 : Math.random() * (2000 - 1200) + 1200; // Shorter delay for first question

      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== 'typing-bot')); // Remove typing indicator
        setMessages(prev => { // Add actual question
          if (prev.find(msg => msg.id === newQuestionMessage.id)) {
            return prev;
          }
          return [...prev, newQuestionMessage];
        });
      }, delay);
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

    const tempProfile = { ...userProfile, [question.id]: answer };
    setUserProfile(tempProfile);
    setCurrentAnswer('');

    if (currentQuestionIndex < formQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      // The existing 800ms delay before calling askCurrentQuestion can remain.
      // askCurrentQuestion itself now handles the typing indicator for the *next* question.
      setTimeout(() => {
        askCurrentQuestion();
      }, 800);
    } else {
      setIsCompleted(true);
      const finalProfile = tempProfile as UserProfile;
      const name = finalProfile.name || 'Friend';
      const agentGender = finalProfile.gender as ('female' | 'male' | undefined);
      const language = finalProfile.language;

      // Add typing indicator for completion message
      setMessages(prev => [...prev, {
        id: 'typing-completion',
        type: 'bot',
        content: '...',
        timestamp: new Date(),
        isTyping: true,
        // agentType: agentGender
      }]);

      setTimeout(async () => {
        setMessages(prev => prev.filter(m => m.id !== 'typing-completion'));

        let completionText = '';
        if (language === 'Roman Urdu') {
          if (agentGender === 'female') {
            completionText = `🎉 Zabardast ${name}! Aapne saari details de di hain! Ab main aapke liye kuch khaas recommendations tayyar kar rahi hoon. Thora sa intezar karen, kuch mazedaar aanay wala hai! ✨`;
          } else {
            completionText = `🎉 Bohat khoob ${name}! Aapne sab kuch bata diya hai. Main ab aapke liye behtareen style recommendations generate kar raha hoon. Bas thora sa waqt den! 👍`;
          }
        } else { // English
          if (agentGender === 'female') {
            completionText = `🎉 Awesome ${name}! You've provided all the details! I'm now whipping up some special recommendations for you. Hold tight, something exciting is coming your way! ✨`;
          } else {
            completionText = `🎉 Excellent ${name}! You've given me all I need. I'm now generating the best style recommendations for you. Just a moment! 👍`;
          }
        }
        
        const completionMessageObj: ChatMessage = {
          id: 'completion', type: 'bot', content: completionText, timestamp: new Date(),
          // agentType: agentGender,
          // isTyping: true // This message itself can act as a "processing" message
        };
        setMessages(prev => [...prev, completionMessageObj]);

        try {
          const recs = await generateStyleRecommendation(finalProfile);
          setRecommendations(recs);

          setMessages(prev => prev.filter(m => m.id !== 'completion')); // Remove "generating..." message
          setMessages(prev => [...prev, { // Add typing for results
            id: 'typing-result', type: 'bot', content: '...', timestamp: new Date(), isTyping: true,
            // agentType: agentGender
          }]);

          setTimeout(() => {
            setMessages(prev => prev.filter(m => m.id !== 'typing-result'));
            let successText = '';
            if (language === 'Roman Urdu') {
              if (agentGender === 'female') {
                successText = `✨ Yeh lijiye ${name}! Aapke liye kuch khaas outfits jo maine select kiye hain. Har aik aapke style aur preferences ke mutabiq hai. Umeed hai aapko pasand ayenge! 😊`;
              } else {
                successText = `✨ ${name}, yeh hain aapke liye recommendations. Maine aapke body type, skin tone, aur preferences ko dhyaan mein rakha hai. Dekhen aur batayen! 👌`;
              }
            } else { // English
              if (agentGender === 'female') {
                successText = `✨ Here you go, ${name}! These are the special outfits I've picked out for you. Each one is tailored to your style and preferences. I hope you love them! 😊`;
              } else {
                successText = `✨ ${name}, here are your recommendations. I've considered your body type, skin tone, and preferences. Check them out and let me know what you think! 👌`;
              }
            }
            const successMessageObj: ChatMessage = {
              id: 'success', type: 'bot', content: successText, timestamp: new Date(),
              // agentType: agentGender
            };
            setMessages(prev => [...prev, successMessageObj]);
          }, 1200);

        } catch (err) {
          console.error('Error generating recommendations:', err);
          setMessages(prev => prev.filter(m => m.id !== 'completion')); // Remove "generating..." message
          setMessages(prev => [...prev, { // Add typing for error
            id: 'typing-error', type: 'bot', content: '...', timestamp: new Date(), isTyping: true,
            // agentType: agentGender
          }]);

          setTimeout(() => {
            setMessages(prev => prev.filter(m => m.id !== 'typing-error'));
            const errorMsgContent = language === 'Roman Urdu'
              ? "Oops! Recommendations generate karte hue kuch masla hogaya. Please thori dair baad try karen."
              : "Oops! Something went wrong while generating recommendations. Please try again later.";
            setMessages(prev => [...prev, {
              id: 'error-recs', type: 'bot', content: errorMsgContent, timestamp: new Date(),
              // agentType: agentGender
            }]);
          }, 1200);
        }
      }, 1500); // Delay before showing completionMessage and starting API call
    }
  };

  const getCurrentQuestion = () => {
    return currentQuestionIndex < formQuestions.length ? formQuestions[currentQuestionIndex] : null;
  };

  const currentQuestion = getCurrentQuestion();

  if (!hasAgreedToPrivacy) {
    return <PrivacyModal onAgree={() => setHasAgreedToPrivacy(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Chat Messages */}
        <div className="mb-6">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
              agentType={message.type === 'bot' ? userProfile.gender as ('female' | 'male' | undefined) : undefined}
            />
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
      <footer className="text-center py-8 text-gray-600 text-sm border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center space-x-6 mb-3">
            <a href="#" className="hover:text-pink-600 transition-colors">Disclaimer</a>
            <a href="#" className="hover:text-pink-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-pink-600 transition-colors">Contact Us</a>
          </div>
          <p className="text-gray-500">
            © 2025 iGlowup. Built with ❤️ by DownLabs.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;