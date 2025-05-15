import React from 'react';
import { NextSeo } from 'next-seo';
import CenteredLogo from '../components/CenteredLogo';

const PrivacyPolicy = () => {
  return (
    <div className="relative min-h-screen bg-[#f7f7f7] text-secondary">
      <NextSeo
        title="Privacy Policy | Zerocard"
        description="Zerocard's Privacy Policy details how we collect, use, and protect your personal information when you use our crypto-linked debit card service."
        canonical="https://getzerocard.xyz/privacy-policy"
        openGraph={{
          title: 'Privacy Policy | Zerocard',
          description: 'Learn how Zerocard protects your privacy and personal information.',
          url: 'https://getzerocard.xyz/privacy-policy',
        }}
      />
      
      {/* Background SVG */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div 
          className="absolute inset-0 bg-no-repeat bg-cover" 
          style={{ backgroundImage: 'url(/assets/images/background.svg)' }}
        />
      </div>
      
      <div className="relative z-10">
        <CenteredLogo className="mb-8" />
        
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl font-bold text-center mb-8">Zerocard Privacy Policy</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
            <div className="text-sm text-gray-500 mb-6">
              <p>Last Updated: May 12, 2025</p>
            </div>
            <p className="mb-6">Company: Zerocard ("Zerocard", "we", "our", "us")</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p>Zerocard ("the App") provides a crypto‑linked debit card service ("Services"). We are committed to protecting your privacy and complying with both Apple's App Store and Google Play Store data‑safety requirements, as well as applicable laws (e.g., CCPA, GDPR).</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Data Category</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Specific Data Collected</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Linked to User</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Shared with 3rd Parties</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Account Identifiers</td>
                      <td className="border border-gray-300 px-4 py-2">Email address, Username</td>
                      <td className="border border-gray-300 px-4 py-2">Account creation, login, support</td>
                      <td className="border border-gray-300 px-4 py-2">Yes</td>
                      <td className="border border-gray-300 px-4 py-2">No</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Identity Verification</td>
                      <td className="border border-gray-300 px-4 py-2">BVN or NIN; OTP‐verified phone number; Full name; DOB</td>
                      <td className="border border-gray-300 px-4 py-2">KYC/AML compliance</td>
                      <td className="border border-gray-300 px-4 py-2">Yes</td>
                      <td className="border border-gray-300 px-4 py-2">Yes (KYC provider)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Contact Information</td>
                      <td className="border border-gray-300 px-4 py-2">Shipping address</td>
                      <td className="border border-gray-300 px-4 py-2">Physical card delivery</td>
                      <td className="border border-gray-300 px-4 py-2">Yes</td>
                      <td className="border border-gray-300 px-4 py-2">Yes (shipping partners)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Financial Data</td>
                      <td className="border border-gray-300 px-4 py-2">Wallet balance; Transaction history; Spending limits</td>
                      <td className="border border-gray-300 px-4 py-2">Transaction processing; fraud prevention</td>
                      <td className="border border-gray-300 px-4 py-2">Yes</td>
                      <td className="border border-gray-300 px-4 py-2">Yes (Sudo Africa)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Device & Usage Data</td>
                      <td className="border border-gray-300 px-4 py-2">Device type, OS version, IP address, crash logs, analytics IDs</td>
                      <td className="border border-gray-300 px-4 py-2">App performance; troubleshooting; security</td>
                      <td className="border border-gray-300 px-4 py-2">No</td>
                      <td className="border border-gray-300 px-4 py-2">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Account Management:</strong> Create and maintain your Zerocard account and custodial wallet.</li>
                <li><strong>KYC/AML Compliance:</strong> Verify identity through BVN/NIN and OTP checks to meet legal requirements.</li>
                <li><strong>Card Issuance & Delivery:</strong> Issue virtual/physical debit cards via Sudo Africa; ship cards to your address.</li>
                <li><strong>Transaction Processing:</strong> Load USDC on Base; enable spending at POS, ATMs, and online; process withdrawals.</li>
                <li><strong>Fraud Prevention & Security:</strong> Monitor transactions and device data to detect and block fraud.</li>
                <li><strong>App Improvement:</strong> Analyze usage and crash reports to enhance stability and features.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Data Sharing & Disclosure</h2>
              <p className="mb-2">We do not sell your data. We share only as necessary with:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Sudo Africa:</strong> Card‑issuing infrastructure and Banking partner for fiat off‑ramp</li>
                <li><strong>KYC Providers:</strong> For BVN/NIN and phone verification</li>
                <li><strong>Shipping Partners:</strong> To deliver physical cards</li>
                <li><strong>Analytics & Hosting:</strong> For app performance and hosting services</li>
                <li><strong>Legal Authorities:</strong> If required by law or to protect rights</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. User Controls & Rights</h2>
              <p className="mb-2">Depending on your jurisdiction, you may:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Access & Portability:</strong> Request a copy of your data.</li>
                <li><strong>Correction:</strong> Ask us to correct inaccurate information.</li>
                <li><strong>Deletion:</strong> Request that we delete your personal data (subject to legal exceptions).</li>
                <li><strong>Withdraw Consent:</strong> Opt out of certain data processing activities.</li>
              </ul>
              <div className="mt-4">
                <p>To exercise any right, contact:</p>
                <p className="mt-2">Email: <a href="mailto:support@getzerocard.xyz" className="text-blue-600">support@getzerocard.xyz</a></p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Data Security</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Data in transit is encrypted via TLS.</li>
                <li>At rest, personal data is encrypted using industry‑standard protocols.</li>
                <li>Access controls and regular security audits are in place.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Children's Privacy</h2>
              <p>We do not knowingly collect data from anyone under 18. If discovered, we will delete such accounts immediately.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">8. Changes to This Policy</h2>
              <p>We may update this policy; significant changes will be communicated via in‑app notifications or email. The "Last Updated" date will reflect the effective date.</p>
            </section>
            
            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-4">9. Contact Us</h2>
              <p>Zerocard Technologies</p>
              <p>Email: <a href="mailto:support@getzerocard.xyz" className="text-blue-600">support@getzerocard.xyz</a></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 