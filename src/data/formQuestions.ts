export const formQuestions = [
  {
    id: 'gender',
    title: 'First, let me know your gender so I can give you the best styling advice!',
    description: 'This helps me understand your style preferences better.',
    type: 'radio' as const,
    options: [
      { value: 'Female', label: 'Female', description: 'Looking for women\'s fashion advice', icon: '👩' },
      { value: 'Male', label: 'Male', description: 'Looking for men\'s fashion advice', icon: '👨' },
      { value: 'Non-binary', label: 'Non-binary', description: 'Looking for inclusive fashion advice', icon: '🌟' }
    ]
  },
  {
    id: 'name',
    title: 'What should I call you, gorgeous?',
    description: 'I love getting to know my styling clients personally! What\'s your beautiful name?',
    type: 'text' as const,
    placeholder: 'Enter your name...'
  },
  {
    id: 'language',
    title: 'Which language makes you feel most comfortable?',
    description: 'I want to chat with you in the way that feels most natural!',
    type: 'radio' as const,
    options: [
      { value: 'English', label: 'English', description: 'Professional English styling advice', icon: '🇬🇧' },
      { value: 'Roman Urdu', label: 'Roman Urdu', description: 'Desi style mein baat karte hain!', icon: '🇵🇰' }
    ]
  },
  {
    id: 'height',
    title: 'What\'s your height, beautiful?',
    description: 'This helps me suggest proportions that will make you look absolutely stunning!',
    type: 'select' as const,
    options: [
      { value: '4\'8"-5\'0"', label: '4\'8" - 5\'0" (Petite queen!)' },
      { value: '5\'1"-5\'3"', label: '5\'1" - 5\'3" (Perfect height!)' },
      { value: '5\'4"-5\'6"', label: '5\'4" - 5\'6" (Model height!)' },
      { value: '5\'7"-5\'9"', label: '5\'7" - 5\'9" (Tall and gorgeous!)' },
      { value: '5\'10"+', label: '5\'10" and above (Supermodel vibes!)' }
    ]
  },
  {
    id: 'hairType',
    title: 'Tell me about your gorgeous hair!',
    description: 'Your hair is your crown! Let me know what type you have so I can suggest styles that complement it perfectly.',
    type: 'radio' as const,
    options: [
      { value: 'Straight', label: 'Straight Hair', description: 'Sleek and smooth texture', icon: '💇‍♀️' },
      { value: 'Wavy', label: 'Wavy Hair', description: 'Beautiful natural waves', icon: '🌊' },
      { value: 'Curly', label: 'Curly Hair', description: 'Gorgeous bouncy curls', icon: '🌀' },
      { value: 'Coily', label: 'Coily Hair', description: 'Beautiful tight coils', icon: '🌸' },
      { value: 'Short', label: 'Short Hair', description: 'Chic and stylish cut', icon: '✂️' },
      { value: 'Long', label: 'Long Hair', description: 'Flowing and elegant', icon: '👸' }
    ]
  },
  {
    id: 'skinTone',
    title: 'What\'s your beautiful skin tone?',
    description: 'Understanding your gorgeous complexion helps me recommend colors that make you absolutely glow!',
    type: 'radio' as const,
    options: [
      { value: 'Fair', label: 'Fair', description: 'Light with pink or yellow undertones - so elegant!', icon: '🌸' },
      { value: 'Medium', label: 'Medium', description: 'Olive or warm beige tones - absolutely gorgeous!', icon: '🌿' },
      { value: 'Tan', label: 'Tan', description: 'Golden or bronze undertones - stunning!', icon: '✨' },
      { value: 'Deep', label: 'Deep', description: 'Rich brown with warm undertones - absolutely beautiful!', icon: '🤎' }
    ]
  },
  {
    id: 'bodyType',
    title: 'What\'s your beautiful body type?',
    description: 'Every body is gorgeous! This helps me suggest cuts that celebrate your amazing figure.',
    type: 'radio' as const,
    options: [
      { value: 'Pear', label: 'Pear Shape', description: 'Smaller shoulders, fuller hips - so feminine!', icon: '🍐' },
      { value: 'Apple', label: 'Apple Shape', description: 'Fuller midsection, slender legs - gorgeous curves!', icon: '🍎' },
      { value: 'Hourglass', label: 'Hourglass', description: 'Balanced shoulders and hips - classic beauty!', icon: '⏳' },
      { value: 'Rectangle', label: 'Rectangle', description: 'Similar measurements - model-like figure!', icon: '▭' },
      { value: 'Inverted Triangle', label: 'Inverted Triangle', description: 'Broader shoulders - strong and beautiful!', icon: '🔺' }
    ]
  },
  {
    id: 'ageGroup',
    title: 'What\'s your age group, lovely?',
    description: 'This helps me suggest styles that are perfect for your life stage and make you feel confident!',
    type: 'select' as const,
    options: [
      { value: '16-24', label: '16 - 24 years (Young and fabulous!)' },
      { value: '25-34', label: '25 - 34 years (Prime time beauty!)' },
      { value: '35-44', label: '35 - 44 years (Confident and gorgeous!)' },
      { value: '45-54', label: '45 - 54 years (Elegant and wise!)' },
      { value: '55+', label: '55+ years (Timeless beauty!)' }
    ]
  },
  {
    id: 'religion',
    title: 'What\'s your religious background?',
    description: 'I want to make sure my recommendations respect your beautiful cultural and religious values.',
    type: 'select' as const,
    options: [
      { value: 'Islam', label: 'Islam' },
      { value: 'Hinduism', label: 'Hinduism' },
      { value: 'Christianity', label: 'Christianity' },
      { value: 'Sikhism', label: 'Sikhism' },
      { value: 'Other', label: 'Other' },
      { value: 'Prefer not to say', label: 'Prefer not to say' }
    ]
  },
  {
    id: 'culturalPreferences',
    title: 'Any specific cultural or modesty preferences, dear?',
    description: 'Tell me about any specific requirements like sleeve length, coverage, or traditional elements that make you feel comfortable and confident.',
    type: 'text' as const,
    placeholder: 'e.g., long sleeves, modest necklines, traditional Pakistani styles, dupatta styling...'
  },
  {
    id: 'budget',
    title: 'What\'s your budget range, sweetie?',
    description: 'Don\'t worry, looking fabulous doesn\'t have to break the bank! I\'ll find amazing options within your range.',
    type: 'range' as const,
    min: 1500,
    max: 50000,
    step: 500
  },
  {
    id: 'eventType',
    title: 'What\'s the special occasion?',
    description: 'Every event is a chance to shine! Tell me what you\'re dressing up for.',
    type: 'radio' as const,
    options: [
      { value: 'Mehndi', label: 'Mehndi', description: 'Vibrant and festive - time to sparkle!', icon: '🎨' },
      { value: 'Barat', label: 'Barat', description: 'Elegant and formal - your royal moment!', icon: '👑' },
      { value: 'Walima', label: 'Walima', description: 'Graceful and sophisticated - pure elegance!', icon: '✨' },
      { value: 'Eid', label: 'Eid', description: 'Traditional and joyful - celebrate in style!', icon: '🌙' },
      { value: 'Casual', label: 'Casual Wear', description: 'Comfortable daily style - effortlessly chic!', icon: '👕' },
      { value: 'Office', label: 'Office/Professional', description: 'Professional and chic - boss babe vibes!', icon: '💼' },
      { value: 'Party', label: 'Party/Social', description: 'Trendy and stylish - party queen!', icon: '🎉' }
    ]
  }
];