import React from 'react';
import { NextSeo } from 'next-seo';
import CenteredLogo from '../components/CenteredLogo';

const TermsOfUse = () => {
  return (
    <div className="relative min-h-screen bg-[#f7f7f7] text-secondary">
      <NextSeo
        title="Terms of Use | Zerocard"
        description="Zerocard's Terms of Use outline the rules and guidelines for using our crypto-linked debit card service."
        canonical="https://getzerocard.xyz/terms-of-use"
        openGraph={{
          title: 'Terms of Use | Zerocard',
          description: 'Read Zerocard\'s Terms of Use for our crypto-linked debit card service.',
          url: 'https://getzerocard.xyz/terms-of-use',
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
          <h1 className="text-3xl font-bold text-center mb-8">Zerocard Terms of Use</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
            <div className="text-sm text-gray-500 mb-6">
              <p>Last Updated: May 12, 2025</p>
            </div>
            <p className="mb-6">Company: Zerocard</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>By downloading, installing, or using Zerocard ("the App"), you agree to these Terms of Use and our Privacy Policy. If you do not agree, do not use the App.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Eligibility</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>You must be 18 years or older.</li>
                <li>You must provide truthful, accurate information and complete our KYC process (BVN/NIN + OTP).</li>
                <li>You must comply with all applicable laws and regulations.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. Services Overview</h2>
              <p className="mb-2">Zerocard provides a custodial wallet and crypto‑linked debit card that allows you to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Load USDC on the Base network into your Zerocard wallet.</li>
                <li>Set adjustable spending limits.</li>
                <li>Spend funds via virtual or physical debit card at POS, ATMs, and online.</li>
                <li>Freeze/unfreeze your card instantly.</li>
                <li>Withdraw funds back to your verified bank account</li>
                <li>Order a physical card (requires shipping address and KYC).</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. User Obligations</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Keep credentials secure and confidential.</li>
                <li>Do not attempt to bypass KYC or fraud controls.</li>
                <li>Use the App lawfully, no money laundering, illicit transactions, or prohibited activities.</li>
                <li>Report unauthorized use immediately to support@getzerocard.xyz.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Fees, Limits & Billing</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Transaction Limit (Beta): 100 USDC per wallet load.</li>
                <li>Fees: As disclosed in‑app (e.g., card issuance, ATM withdrawals).</li>
                <li>All payments processed by Card Issuer are under their fee schedules.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Third‑Party Services</h2>
              <p>Zerocard integrates with third‑party partners. You agree to their terms where applicable. We are not liable for partner service outages or failures.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Intellectual Property</h2>
              <p>All app content, trademarks, and IP are owned by Zerocard or our licensors. You may not reproduce or reverse‑engineer any part of the App.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">8. Disclaimers & Limitation of Liability</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>"AS IS":</strong> The App is provided without warranties of any kind.</li>
                <li><strong>No Investment Advice:</strong> We do not offer trading, staking, or financial advice.</li>
                <li><strong>Liability Cap:</strong> To the maximum extent allowed by law, Zerocard's total liability will not exceed the fees you paid in the 12 months preceding a claim.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">9. Termination</h2>
              <p className="mb-2">We may suspend or terminate your access for:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Violations of these Terms</li>
                <li>Suspected fraud or illegal activity</li>
                <li>Regulatory or legal obligations</li>
              </ul>
              <p>You may close your account subject to withdrawal of any remaining balance and compliance with applicable law.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">10. Governing Law & Dispute Resolution</h2>
              <p>These Terms are governed by the laws of Nigeria. Disputes will be resolved via binding arbitration in Nigeria, except where prohibited by law.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">11. Changes to Terms</h2>
              <p>We may update these Terms. Material changes will be notified via in‑app notice or email. Continued use implies acceptance of updated Terms.</p>
            </section>
            
            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-4">12. Contact Information</h2>
              <p>If you have questions or need support:</p>
              <p className="mt-2">Email: <a href="mailto:support@getzerocard.xyz" className="text-blue-600">support@getzerocard.xyz</a></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse; 