import React from 'react';

interface PrivacyModalProps {
  onAgree: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ onAgree }) => {
  return (
    <div className="fixed inset-0 bg-pink-100 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-rose-50 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center text-rose-700">
          Disclaimer – Using iGlowup Means You Accept These Terms
        </h2>
        <div className="overflow-y-auto flex-grow pr-2 space-y-3 text-sm text-gray-700 custom-scrollbar">
          <section>
            <h3 className="text-lg font-semibold text-rose-600 mt-2 mb-2">Privacy Policy</h3>
            <p className="mb-2">
              Welcome to iGlowup! We are committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our AI-powered fashion advice service.
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">Information We Collect</h4>
            <p className="mb-1">
              To provide you with personalized fashion recommendations, iGlowup collects information you voluntarily provide during your interaction with the chatbot. This includes:
            </p>
            <ul className="list-disc list-inside pl-4 mb-2 space-y-1">
              <li>Your stated preferences regarding fashion styles, colors, and event types.</li>
              <li>Inputs related to your physical attributes such as height, hair type, skin tone, and body type, as you provide them.</li>
              <li>Your selected AI agent persona (Friendly Girl/Smart Guy), age group, cultural or religious background, and weather information.</li>
              <li>Any specific cultural or modesty preferences you share.</li>
            </ul>
            <p className="mb-1">
              iGlowup is currently in a beta phase and does not require user account creation. The information you provide is used solely for the purpose of generating fashion advice during your active session.
            </p>
            <p className="mb-1">
              <strong>Optional Disclosures:</strong> Currently, iGlowup does not ask for or process optional information like email or precise location. If such features are introduced in the future, you will be explicitly informed, and providing such information will be optional, used only to enhance your experience as described at that time.
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">How We Use Your Information</h4>
            <ul className="list-disc list-inside pl-4 mb-2 space-y-1">
              <li>To generate personalized fashion advice and style recommendations tailored to your inputs.</li>
              <li>To understand user needs and improve the iGlowup service, including the AI's performance and the relevance of its suggestions.</li>
            </ul>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">Data Storage and Security</h4>
            <p className="mb-1">
              We take reasonable measures to protect the information you provide. Input data is processed by DownLabs AI (our AI technology provider) to generate responses. We do not permanently store your chat session data or personal profile details beyond what is necessary for the current interaction during the beta phase. Once your session ends or if you reset the application, this information is typically cleared from active use.
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">Third-Party Services</h4>
            <p className="mb-1">
              iGlowup relies on DownLabs AI to provide its core AI-powered fashion advice. DownLabs AI processes your inputs to generate the styling suggestions. We ensure that our engagement with such third-party services aligns with our commitment to your privacy.
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">User Rights</h4>
            <p className="mb-1">
              You have the right to understand the information you provide and how it's used. As we don't create user accounts in beta, traditional data access/correction requests are handled by your control over the input you provide in each session. You can choose to stop using the service at any time.
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">Children's Privacy</h4>
            <p className="mb-1">
              iGlowup is not intended for use by children under the age of 16. We do not knowingly collect personal information from children under 16.
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">Changes to This Policy</h4>
            <p className="mb-1">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by presenting the new policy within the app. Your continued use of iGlowup after such changes constitutes your acceptance of the new Privacy Policy.
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">Contact Us</h4>
            <p className="mb-1">
              If you have any questions about this Privacy Policy, please contact us at [Placeholder for Contact Email/Method].
            </p>
          </section>

          <section className="pt-2">
            <h3 className="text-lg font-semibold text-rose-600 mt-2 mb-2">Disclaimer</h3>
            <p className="mb-2">
              The fashion advice, style suggestions, and all other information provided by iGlowup ("Service") are generated by an artificial intelligence (AI) model developed by DownLabs AI. By using this Service, you acknowledge and agree to the following terms:
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">Nature of Advice</h4>
            <p className="mb-1">
              All suggestions are for informational and entertainment purposes only. They do not constitute professional styling advice from a certified human expert, nor should they be interpreted as medical, legal, or financial advice. You should consult with a qualified professional for any specific concerns.
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">AI Limitations & Accuracy</h4>
            <p className="mb-1">
              While iGlowup strives to provide helpful and relevant fashion suggestions, AI has inherent limitations. The AI may not fully understand all personal, religious, or cultural nuances, nor can it guarantee the accuracy, completeness, or appropriateness of its suggestions for every individual or situation. AI responses are based on patterns in data and should not be considered infallible. Misinterpretations or unexpected outputs are possible.
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">No Guarantees & User Responsibility</h4>
            <p className="mb-1">
              iGlowup makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products (if any mentioned by AI), services, or related graphics contained on the service for any purpose. We do not guarantee your satisfaction with the outcomes resulting from the AI's suggestions. Any reliance you place on such information is therefore strictly at your own risk. You are solely responsible for any decisions or actions you take based on the advice provided by iGlowup.
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">Beta Service</h4>
            <p className="mb-1">
              Please be aware that iGlowup is currently a beta service. This means that features may change, and the service may contain errors or inaccuracies. We appreciate your understanding and feedback during this phase.
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">Shopping and Third Parties</h4>
            <p className="mb-1">
             iGlowup does not provide direct shopping links or facilitate transactions. Any mention of brands or products by the AI is for illustrative purposes only and does not constitute an endorsement. If you choose to shop for items based on suggestions, you do so at your own discretion and risk with third-party vendors. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">Limitation of Liability</h4>
            <p className="mb-1">
              To the fullest extent permissible by applicable law, iGlowup and its creators (including DownLabs) shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the Service; (b) any conduct or content of any third party on the Service; (c) any content obtained from the Service; and (d) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
            </p>

            <h4 className="text-md font-semibold text-rose-600 mt-3 mb-1">Acceptance of Terms</h4>
            <p className="font-medium text-gray-800 mb-1">
              iGlowup provides AI-generated fashion advice. These suggestions are based on general style trends, not professional or medical advice. AI may not understand all personal, religious, or cultural nuances. Shopping links are disabled in beta. By clicking "I Agree" and continuing to use iGlowup, you acknowledge that you have read, understood, and agree to be bound by this Disclaimer and our Privacy Policy.
            </p>
          </section>
        </div>
        <button
          onClick={onAgree}
          className="mt-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out w-full shadow-md hover:shadow-lg"
        >
          I Agree
        </button>
      </div>
    </div>
  );
};

export default PrivacyModal;

// Basic custom scrollbar styling (optional, may need more specific CSS if using a plugin)
// You might need to add this to your global CSS (e.g., index.css) if direct Tailwind classes are not enough.
// For Webkit browsers:
// .custom-scrollbar::-webkit-scrollbar { width: 8px; }
// .custom-scrollbar::-webkit-scrollbar-track { background: #ffe4e6; /* Light pink track */ }
// .custom-scrollbar::-webkit-scrollbar-thumb { background: #e75480; /* Darker pink thumb */ border-radius: 4px; }
// .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c2185b; /* Even darker pink on hover */ }
// For Firefox (less direct control with simple CSS):
// .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e75480 #ffe4e6; }
