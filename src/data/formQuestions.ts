export const formQuestions = [
  {
    id: 'gender', // Changed from 'agentGender' or similar to 'gender' to match userProfile key
    title: 'Would you like fashion tips styled by a friendly girl 💁 or a smart guy 🧑?',
    description: 'This helps me tailor my communication style to your preference.',
    type: 'radio' as const,
    options: [
      { value: 'female', label: 'Friendly Girl 💁', description: 'Warm and encouraging style advice.' },
      { value: 'male', label: 'Smart Guy 🧑', description: 'Insightful and practical fashion tips.' }
    ]
  },
  {
    id: 'weather',
    title: "What's the weather like around you?",
    description: "This helps me suggest outfits that are comfortable and practical for your current climate.",
    type: 'radio' as const,
    options: [
      { value: 'sunny', label: '☀️ Sunny', description: 'Clear skies and warm weather.' },
      { value: 'rainy', label: '🌧️ Rainy', description: 'Expect some showers.' },
      { value: 'cold', label: '❄️ Cold', description: 'Chilly, bring out the layers!' },
      { value: 'moderate', label: '☁️ Moderate', description: 'Pleasant and mild.' }
    ]
  },
  {
    id: 'name',
    title: 'What should I call you?', // Made neutral
    description: 'I love getting to know my styling clients personally! What\'s your name?',
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
    title: 'What\'s your height?', // Made neutral
    description: 'This helps me suggest proportions that will make you look absolutely stunning!',
    type: 'select' as const,
    options: [
      { value: '4\'8"-5\'0"', label: '4\'8" - 5\'0" (Petite!)' }, // Made neutral
      { value: '5\'1"-5\'3"', label: '5\'1" - 5\'3" (Perfect height!)' },
      { value: '5\'4"-5\'6"', label: '5\'4" - 5\'6" (Model height!)' },
      { value: '5\'7"-5\'9"', label: '5\'7" - 5\'9" (Tall!)' }, // Made neutral
      { value: '5\'10"+', label: '5\'10" and above (Supermodel vibes!)' }
    ]
  },
  {
    id: 'hairType',
    title: 'Tell me about your hair!', // Made neutral
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
    title: 'What\'s your skin tone?', // Made neutral
    description: 'Understanding your complexion helps me recommend colors that make you absolutely glow!',
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
    title: 'What\'s your body type?', // Made neutral
    description: 'Every body is unique! This helps me suggest cuts that celebrate your figure.', // Made neutral
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
    title: 'What\'s your age group?', // Made neutral
    description: 'This helps me suggest styles that are perfect for your life stage and make you feel confident!',
    type: 'select' as const,
    options: [
      { value: '16-24', label: '16 - 24 years (Young and fabulous!)' },
      { value: '25-34', label: '25 - 34 years (Prime time!)' }, // Made neutral
      { value: '35-44', label: '35 - 44 years (Confident and stylish!)' }, // Made neutral
      { value: '45-54', label: '45 - 54 years (Elegant and wise!)' },
      { value: '55+', label: '55+ years (Timeless style!)' } // Made neutral
    ]
  },
  {
    id: 'religion',
    title: "What's your cultural or religious background?",
    description: "This helps in suggesting culturally relevant styles, including traditional or festival wear.",
    type: 'select' as const, // Keeping as select for potentially longer list, but radio could also work
    options: [
      { value: 'Muslim (Pakistani)', label: 'Muslim (Pakistani) 🇵🇰' },
      { value: 'Hindu (Indian)', label: 'Hindu (Indian) 🇮🇳' },
      { value: 'Christian (Western)', label: 'Christian (Western) 🇺🇸/🇬🇧' },
      { value: 'General/Other', label: 'General/Other' },
      { value: 'Prefer not to say', label: 'Prefer not to say' }
    ]
  },
  {
    id: 'culturalPreferences',
    title: 'Any specific cultural or modesty preferences?', // Made neutral
    description: 'Tell me about any specific requirements like sleeve length, coverage, or traditional elements that make you feel comfortable and confident.',
    type: 'text' as const,
    placeholder: 'e.g., long sleeves, modest necklines, traditional Pakistani styles, dupatta styling...'
  },
  {
    id: 'budget',
    title: 'What\'s your budget range?', // Made neutral
    description: 'Looking fabulous doesn\'t have to break the bank! I\'ll find amazing options within your range.',
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
      { value: 'Office', label: 'Office/Professional', description: 'Professional and chic - boss vibes!', icon: '💼' },
      { value: 'Party', label: 'Party/Social', description: 'Trendy and stylish - party queen!', icon: '🎉' }
    ]
  }
];