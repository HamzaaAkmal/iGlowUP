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
        - Weather: ${userProfile.weather || 'Not specified'}

        Instructions for AI:
        1. Provide 2-3 outfit recommendations for ${genderSpecific}.
        2. Adapt clothing recommendations based on the weather:
           - For "sunny": suggest lighter fabrics, breathable materials.
           - For "rainy": suggest water-resistant or quick-drying materials, perhaps with layering options.
           - For "cold": suggest warm layers, cozy fabrics, and appropriate outerwear.
           - For "moderate": suggest versatile options that can adapt to slight temperature changes.
        3. If weather is "Not specified", make general recommendations suitable for a mix of conditions or assume moderate.
        4. Based on the user's cultural or religious background (\`${userProfile.religion}\`) and any \`culturalPreferences\` (\`${userProfile.culturalPreferences}\`) they've shared:
           - Suggest traditional outfit ideas for relevant festivals or events (e.g., for 'Muslim (Pakistani)' consider Eid, Mehndi, Barat; for 'Hindu (Indian)' consider Holi, Diwali, weddings; for 'Christian (Western)' consider Christmas, Easter).
           - Provide festival wear guides if appropriate for the \`eventType\` and \`religion\`.
           - Include culturally accurate color suggestions (e.g., green for Eid; red/yellow for Mehndi/Holi; festive colors like red, green, gold for Christmas).
           - If \`culturalPreferences\` mentions specific items (e.g., "hijab", "saree", "modest dress"), ensure recommendations align.
        5. The event type (\`${userProfile.eventType}\`) should be considered in strong conjunction with the user's religion (\`${userProfile.religion}\`) for culturally appropriate suggestions. Ensure the suggested outfits are suitable for BOTH the event and the cultural context.
        6. For each recommendation, provide a \`suggestedDressName\` which is a specific and descriptive name for the outfit that the user could theoretically use for searching (e.g., 'Rose Pink Embroidered Lehenga Choli', 'Charcoal Grey Slim-Fit Sherwani').
        7. Also, provide a \`suggestedColorPalette\` as a descriptive string summarizing the key colors and their combination (e.g., 'Rose Pink with Gold embroidery and Mint Green dupatta', 'Charcoal Grey with Silver buttons and a Cream pocket square').


        Output JSON format:
        {
          "recommendations": [
            {
              "outfitName": "string (General title for the outfit suggestion)",
              "suggestedDressName": "string (Specific, searchable name like 'Emerald Green Anarkali Suit' or 'Classic Navy Blue Kurta Set')",
              "description": "string (warm, complimentary description)",
              "whySuitable": "string (explain why it's perfect for them with compliments)",
              "suggestedColors": ["color1", "color2", "color3"],
              "suggestedColorPalette": "string (Descriptive palette like 'Emerald Green with Gold and Cream accents' or 'Navy Blue, White, and Silver')",
              "fabricAndCut": "string"
            }
          ]
        }

        IMPORTANT: 
        - Populate ALL fields in the JSON structure, including \`suggestedDressName\` and \`suggestedColorPalette\`.
        - Do NOT include any shopping links, URLs, or specific product purchase locations. Recommendations should be informational and advisory only.
        - Do NOT mention specific brand names or prices. Focus on style, fabric, colors, and why it's suitable.
        - Be very complimentary and friendly like a best friend.
        - Consider their hair type for styling suggestions.
        - Respect cultural and religious preferences from \`religion\` and \`culturalPreferences\` fields.
        - Make them feel beautiful and confident
        - Consider the weather in fabric and style choices.
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
      
      const name = userProfile.name || 'there'; // More neutral default
      const isUrdu = userProfile.language === 'Roman Urdu';
      const weatherCondition = userProfile.weather;
      let weatherText = '';

      if (weatherCondition) {
        if (isUrdu) {
          weatherText = `Kyunke mausam ${weatherCondition} hai, maine iska bhi khayal rakha hai. `;
        } else {
          weatherText = `Since the weather is ${weatherCondition}, I've kept that in mind for you. `;
        }
      }
      
      return [
        {
          outfitName: isUrdu ? `${name} ke liye Perfect ${userProfile.eventType} Look` : `Stunning ${userProfile.eventType} Ensemble for ${name}`,
          description: (isUrdu
            ? `${name}, ye outfit tumpe bilkul amazing lagega! ${weatherText}Tumhara ${userProfile.skinTone} skin tone aur ${userProfile.bodyType} figure ke saath ye combination bohot acha hai!`
            : `${name}, this outfit is absolutely perfect for you! ${weatherText}With your ${userProfile.skinTone} skin tone and ${userProfile.bodyType} figure, you'll look absolutely stunning!`),
          whySuitable: (isUrdu
            ? `Tumhara ${userProfile.bodyType} body type ke liye ye cut bilkul perfect hai, aur tumhare ${userProfile.hairType} hair ke saath ye styling bohot beautiful lagegi!`
            : `This cut is absolutely perfect for your ${userProfile.bodyType} figure, and it will complement your ${userProfile.hairType} hair perfectly!`),
          suggestedColors: userProfile.skinTone === 'Fair' 
            ? ['Soft Pink', 'Mint Green', 'Ivory'] 
            : userProfile.skinTone === 'Deep' 
            ? ['Royal Blue', 'Emerald', 'Gold']
            : ['Coral', 'Turquoise', 'Cream'],
          fabricAndCut: 'Premium chiffon with intricate embroidery, A-line silhouette for a flattering fit',
          suggestedDressName: isUrdu ? 'Shahi Chiffon Anarkali' : 'Royal Chiffon Anarkali',
          suggestedColorPalette: isUrdu ? 'Halka Gulabi aur Sabz, Sunehri kaam ke saath' : 'Soft Pink and Mint Green with Gold embroidery'
        },
        {
          outfitName: isUrdu ? `${name} ki Elegant Choice` : `Elegant Choice for ${name}`,
          description: (isUrdu
            ? `Yeh second option bhi tumpe bohot suit karega! ${weatherText}Tumhara taste bohot acha hai, is liye main ye bhi suggest kar rahi hun.`
            : `This second option will also look absolutely great on you! ${weatherText}You have such amazing taste, so I know you'll love this too.`),
          whySuitable: (isUrdu
            ? `Tumhare cultural preferences aur ${userProfile.eventType} event ke liye ye bilkul perfect hai!`
            : `This respects your cultural preferences perfectly and is ideal for your ${userProfile.eventType} event!`),
          suggestedColors: ['Deep Maroon', 'Gold', 'Cream'],
          fabricAndCut: 'Luxurious silk with traditional embellishments',
          suggestedDressName: isUrdu ? 'Nawabi Silk Sherwani' : 'Regal Silk Sherwani',
          suggestedColorPalette: isUrdu ? 'Gehra Maroon aur Sunehra' : 'Deep Maroon and Gold'
        }
      ].slice(0, weatherCondition === 'cold' || weatherCondition === 'rainy' ? 1 : 2); // Fewer options if cold/rainy
    } finally {
      setLoading(false);
    }
  }, []);

  return { generateStyleRecommendation, loading, error };
};