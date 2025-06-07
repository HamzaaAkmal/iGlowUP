import { useState, useCallback } from 'react';
import { UserProfile, StyleRecommendation } from '../types';

const API_KEY = 'AIzaSyB0y75S3VbVxeLvMFMnNjLnPgYmcw_ALYs'; // Replace with your actual API key
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent';

export const useGeminiAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStyleRecommendation = useCallback(async (userProfile: UserProfile): Promise<StyleRecommendation[]> => {
    setLoading(true);
    setError(null);

    try {
      const languageInstruction = userProfile.language === 'Roman Urdu' 
        ? 'Respond in a friendly, warm Roman Urdu style mixed with English (like: "Yaar tumhe ye outfit bilkul perfect lagega!")'
        : 'Respond in a warm, friendly English tone like a best friend giving styling advice with lots of compliments';

      const genderSpecific = userProfile.gender === 'Male' 
        ? 'men\'s Pakistani fashion including kurtas, shalwar kameez, waistcoats, and formal wear'
        : userProfile.gender === 'Female'
        ? 'women\'s Pakistani fashion including suits, lehengas, sarees, and traditional wear'
        : 'inclusive Pakistani fashion options suitable for all';

      const prompt = `
        You are GlowBot, a warm and friendly Pakistani fashion stylist who talks like a best friend. ${languageInstruction}

        User Profile:
        - Gender: ${userProfile.gender}
        - Name: ${userProfile.name}
        - Language: ${userProfile.language}
        - Height: ${userProfile.height}
        - Hair Type: ${userProfile.hairType}
        - Skin Tone: ${userProfile.skinTone}
        - Body Type: ${userProfile.bodyType}
        - Age: ${userProfile.ageGroup}
        - Religion: ${userProfile.religion}
        - Cultural Preferences: ${userProfile.culturalPreferences}
        - Budget: PKR ${userProfile.budget}
        - Event: ${userProfile.eventType}

        Please provide 2-3 outfit recommendations for ${genderSpecific} in the following JSON format:
        {
          "recommendations": [
            {
              "outfitName": "string",
              "description": "string (warm, complimentary description)",
              "whySuitable": "string (explain why it's perfect for them with compliments)",
              "suggestedColors": ["color1", "color2", "color3"],
              "fabricAndCut": "string",
              "productLinks": [
                {
                  "brand": "string",
                  "itemName": "specific item name",
                  "url": "real working URL to actual product",
                  "price": "PKR X,XXX (exact price)"
                }
              ]
            }
          ]
        }

        IMPORTANT: 
        - Use REAL working URLs from Pakistani brands like Khaadi.com, Sapphire.pk, Limelight.pk, Sanasafinaz.com, Daraz.pk
        - Provide EXACT prices in PKR within their budget range
        - Be very complimentary and friendly like a best friend
        - Consider their hair type for styling suggestions
        - Respect cultural and religious preferences
        - Make them feel beautiful and confident
      `;

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0]?.content?.parts[0]?.text;

      if (!generatedText) {
        throw new Error('No response generated from API');
      }

      // Parse the JSON response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid JSON response from API');
      }

      const parsedResponse = JSON.parse(jsonMatch[0]);
      return parsedResponse.recommendations || [];

    } catch (err) {
      // Enhanced fallback recommendations with real links and prices
      console.error('Gemini API Error:', err);
      setError('Unable to connect to styling service. Showing sample recommendations.');
      
      const name = userProfile.name || 'gorgeous';
      const isUrdu = userProfile.language === 'Roman Urdu';
      
      return [
        {
          outfitName: isUrdu ? `${name} ke liye Perfect ${userProfile.eventType} Look` : `Stunning ${userProfile.eventType} Ensemble for ${name}`,
          description: isUrdu 
            ? `${name} jaan, ye outfit tumpe bilkul amazing lagega! Tumhara ${userProfile.skinTone} skin tone aur ${userProfile.bodyType} figure ke saath ye combination bohot gorgeous hai!`
            : `${name}, this outfit is absolutely perfect for you! With your beautiful ${userProfile.skinTone} skin tone and gorgeous ${userProfile.bodyType} figure, you'll look absolutely stunning!`,
          whySuitable: isUrdu
            ? `Tumhara ${userProfile.bodyType} body type ke liye ye cut bilkul perfect hai, aur tumhare ${userProfile.hairType} hair ke saath ye styling bohot beautiful lagegi!`
            : `This cut is absolutely perfect for your beautiful ${userProfile.bodyType} figure, and it will complement your gorgeous ${userProfile.hairType} hair perfectly!`,
          suggestedColors: userProfile.skinTone === 'Fair' 
            ? ['Soft Pink', 'Mint Green', 'Ivory'] 
            : userProfile.skinTone === 'Deep' 
            ? ['Royal Blue', 'Emerald', 'Gold']
            : ['Coral', 'Turquoise', 'Cream'],
          fabricAndCut: 'Premium chiffon with intricate embroidery, A-line silhouette for a flattering fit',
          productLinks: [
            {
              brand: 'Khaadi',
              itemName: 'Embroidered Chiffon Suit',
              url: 'https://www.khaadi.com/pk/ready-to-wear/unstitched',
              price: 'PKR 8,500'
            },
            {
              brand: 'Sapphire',
              itemName: 'Festive Collection Suit',
              url: 'https://sapphireonline.pk/collections/unstitched',
              price: 'PKR 6,200'
            },
            {
              brand: 'Limelight',
              itemName: 'Designer Embroidered Outfit',
              url: 'https://www.limelight.pk/collections/unstitched',
              price: 'PKR 4,800'
            }
          ]
        },
        {
          outfitName: isUrdu ? `${name} ki Elegant Choice` : `Elegant Choice for Beautiful ${name}`,
          description: isUrdu
            ? `Yaar ye second option bhi tumpe bohot suit karega! Tumhara taste bohot acha hai, is liye main ye bhi suggest kar rahi hun.`
            : `Sweetie, this second option will also look absolutely divine on you! You have such amazing taste, so I know you'll love this too.`,
          whySuitable: isUrdu
            ? `Tumhare cultural preferences aur ${userProfile.eventType} event ke liye ye bilkul perfect hai!`
            : `This respects your cultural preferences perfectly and is ideal for your ${userProfile.eventType} event!`,
          suggestedColors: ['Deep Maroon', 'Gold', 'Cream'],
          fabricAndCut: 'Luxurious silk with traditional embellishments',
          productLinks: [
            {
              brand: 'Sana Safinaz',
              itemName: 'Luxury Silk Collection',
              url: 'https://www.sanasafinaz.com/pk/ready-to-wear',
              price: 'PKR 12,000'
            },
            {
              brand: 'Daraz',
              itemName: 'Premium Designer Suit',
              url: 'https://www.daraz.pk/womens-clothing/',
              price: 'PKR 5,500'
            }
          ]
        }
      ];
    } finally {
      setLoading(false);
    }
  }, []);

  return { generateStyleRecommendation, loading, error };
};