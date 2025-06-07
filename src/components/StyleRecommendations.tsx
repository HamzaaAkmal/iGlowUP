import React from 'react';
import { StyleRecommendation, UserProfile } from '../types';
import { Heart, ShoppingBag, Star, ExternalLink } from 'lucide-react';

interface StyleRecommendationsProps {
  recommendations: StyleRecommendation[];
  userProfile: UserProfile;
}

const StyleRecommendations: React.FC<StyleRecommendationsProps> = ({ recommendations, userProfile }) => {
  const isUrdu = userProfile.language === 'Roman Urdu';
  const name = userProfile.name || 'gorgeous';

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {isUrdu ? `✨ ${name} ke liye Perfect Style Match` : `✨ Your Perfect Style Match, ${name}`}
        </h2>
        <p className="text-gray-600">
          {isUrdu ? 'Tumhare liye specially curated by your AI style bestie' : 'Curated specially for you by your AI style bestie'}
        </p>
      </div>

      {recommendations.map((rec, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{rec.outfitName}</h3>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-600">
                  {isUrdu ? 'Bilkul Perfect!' : 'Perfect Match!'}
                </span>
              </div>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">{rec.description}</p>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 mb-4 border border-pink-100">
              <h4 className="font-semibold text-pink-800 mb-2">
                {isUrdu ? `${name}, ye tumhare liye kyun perfect hai:` : `Why This Works Perfectly for You, ${name}:`}
              </h4>
              <p className="text-pink-700 text-sm">{rec.whySuitable}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {isUrdu ? 'Tumhare liye Best Colors:' : 'Perfect Colors for You:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {rec.suggestedColors.map((color, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 rounded-full text-sm border border-pink-200 shadow-sm"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {isUrdu ? 'Fabric aur Cut:' : 'Fabric & Cut:'}
                </h4>
                <p className="text-gray-600 text-sm">{rec.fabricAndCut}</p>
              </div>
            </div>

            {rec.productLinks && rec.productLinks.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  {isUrdu ? `${name}, ye dekho - Shopping Links:` : `Shop These Gorgeous Pieces, ${name}:`}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {rec.productLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-pink-25 rounded-lg hover:from-pink-50 hover:to-rose-50 hover:border-pink-200 border border-gray-200 transition-all group shadow-sm hover:shadow-md transform hover:scale-105"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800 group-hover:text-pink-800 mb-1">
                          {link.brand}
                        </div>
                        <div className="text-xs text-gray-600 mb-1 line-clamp-2">
                          {link.itemName}
                        </div>
                        <div className="text-sm font-semibold text-pink-600">
                          {link.price}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <ShoppingBag className="w-4 h-4 text-gray-400 group-hover:text-pink-600" />
                        <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-pink-600" />
                      </div>
                    </a>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {isUrdu ? 'Prices may vary. Click to check current prices.' : 'Prices may vary. Click to check current prices.'}
                </p>
              </div>
            )}

            <div className="mt-4 p-3 bg-gradient-to-r from-pink-25 to-rose-25 rounded-lg border border-pink-100">
              <p className="text-sm text-pink-700 text-center">
                {isUrdu 
                  ? `💕 ${name}, tum is outfit mein bilkul princess lagogi! Confidence ke saath pehno aur shine karo! ✨`
                  : `💕 ${name}, you're going to look absolutely stunning in this! Wear it with confidence and shine bright! ✨`
                }
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="text-center mt-8 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
        <p className="text-pink-800 font-medium">
          {isUrdu 
            ? `${name}, agar tumhe aur styling tips chahiye ya koi question hai, toh mujhse poocho! Main hamesha tumhari help ke liye hun! 💕`
            : `${name}, if you need more styling tips or have any questions, just ask me! I'm always here to help you look fabulous! 💕`
          }
        </p>
      </div>
    </div>
  );
};

export default StyleRecommendations;