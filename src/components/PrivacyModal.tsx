import React from 'react';

interface PrivacyModalProps {
  onAgree: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ onAgree }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Disclaimer – Using iGlowup Means You Accept These Terms
        </h2>
        <div className="overflow-y-auto flex-grow pr-2 space-y-4 text-sm text-gray-700">
          <section>
            <h3 className="font-semibold text-md text-gray-800 mb-1">Privacy Policy</h3>
            <p>
              Placeholder for Privacy Policy. We are committed to protecting your privacy.
              This policy outlines how we collect, use, and safeguard your information.
              We encourage you to read this policy carefully.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-md text-gray-800 mb-1">Disclaimer</h3>
            <p>
              Placeholder for Disclaimer. The information provided by iGlowup is for general
              informational purposes only. All information on the site is provided in good faith,
              however, we make no representation or warranty of any kind, express or implied,
              regarding the accuracy, adequacy, validity, reliability, availability, or
              completeness of any information on the site.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-md text-gray-800 mb-1">AI Limitations</h3>
            <p>
              Placeholder for AI Limitations. Please be aware that AI-generated advice has
              inherent limitations. It may not always capture the full context of individual
              needs, cultural nuances, or personal preferences. AI responses are based on
              patterns in data and should not be considered infallible.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-md text-gray-800 mb-1">Third-Party Disclaimer</h3>
            <p>
              Placeholder for Third-Party Disclaimer. iGlowup may contain links to third-party
              websites or services that are not owned or controlled by us. We have no control
              over, and assume no responsibility for, the content, privacy policies, or
              practices of any third-party websites or services.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-md text-gray-800 mb-1">Limitation of Liability</h3>
            <p>
              Placeholder for Limitation of Liability. To the fullest extent permissible by
              applicable law, iGlowup and its creators shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits
              or revenues, whether incurred directly or indirectly, or any loss of data, use,
              goodwill, or other intangible losses, resulting from your access to or use of
              or inability to access or use the service.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-md text-gray-800 mb-1">Consent Text</h3>
            <p className="font-medium">
              iGlowup provides AI-generated fashion advice. These suggestions are based on
              general style trends, not professional or medical advice. AI may not
              understand all personal, religious, or cultural nuances. Shopping links are
              disabled in beta. By continuing, you accept our terms.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-md text-gray-800 mb-1">Optional Disclosures</h3>
            <p>
              Placeholder for optional email and location disclosure notices. If you choose
              to provide your email or location, we will use this information to enhance
              your experience and provide more personalized recommendations. You are not
              required to share this information to use the basic features of iGlowup.
            </p>
          </section>
        </div>
        <button
          onClick={onAgree}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out w-full"
        >
          I Agree
        </button>
      </div>
    </div>
  );
};

export default PrivacyModal;
