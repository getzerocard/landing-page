import React from 'react';
import { NextSeo } from 'next-seo';
import CenteredLogo from '../components/CenteredLogo';

const DeleteAccount = () => {
  return (
    <div className="relative min-h-screen bg-[#f7f7f7] text-secondary">
      <NextSeo
        title="Delete Account | Zerocard"
        description="How to securely close your Zerocard account and delete all associated data."
        canonical="https://getzerocard.xyz/delete-account"
        openGraph={{
          title: 'Delete Account | Zerocard',
          description: 'Learn how to securely close your Zerocard account and delete all associated data.',
          url: 'https://getzerocard.xyz/delete-account',
        }}
      />

      {/* Fixed Background SVG */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{ backgroundImage: 'url(/assets/images/background.svg)' }}
        />
      </div>

      <div className="relative z-10">
        <CenteredLogo className="mb-8" />

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl font-bold text-center mb-8">Delete Account Instructions</h1>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
            <div className="text-sm text-gray-500 mb-6">
              <p>Last Updated: May 12, 2025</p>
            </div>
            <p className="mb-6">At Zerocard, we make it simple and secure for you to close your account whenever you choose. Here's how it works:</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Go to Profile Settings</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Open the Zerocard app and tap your profile icon in the top‑right corner.</li>
                <li>Select <strong>Settings</strong> from the menu.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Choose "Close Account"</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Scroll to the bottom of the Settings page.</li>
                <li>Tap the <strong>Close Account</strong> button.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. Confirm Your Decision</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>A confirmation dialog will appear explaining that this action is permanent.</li>
                <li>Tap <strong>Yes, Close My Account</strong> to proceed.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Immediate Deletion</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Once confirmed, your Zerocard account is closed instantly.</li>
                <li>All associated data—wallet, transaction history, personal details—are deleted from our live systems and securely wiped from our databases.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Final Notice</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>This action cannot be undone. If you change your mind, you will need to sign up for a new account.</li>
                <li>If you have any remaining balance, please withdraw it before closing your account, as you will no longer have access afterward.</li>
              </ul>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-4">6. Need Help?</h2>
              <p>If you encounter any issues or need assistance, please contact our support team at <a href="mailto:support@getzerocard.xyz" className="text-blue-600">support@getzerocard.xyz</a> before closing your account.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount; 