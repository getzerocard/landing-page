import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const CookieNotice: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cookies & Tracking Technologies Notice - Zerocard</title>
        <meta name="description" content="Zerocard Cookies & Tracking Technologies Notice" />
      </Head>
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <Image 
                src="/assets/images/logo.svg"
                alt="Zerocard Logo"
                width={120}
                height={28}
              />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Cookies & Tracking Technologies Notice</h1>
            <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This Cookies & Tracking Technologies Notice ("Notice") explains how Zerocard ("we," "us," or "our") uses cookies and similar tracking technologies when you access or use our website, mobile application, and related digital services (collectively, the "Platform").
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use these technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>Improve platform performance and user experience across devices.</li>
              <li>Enable secure logins and protect user accounts.</li>
              <li>Personalize content, recommendations, and transaction features.</li>
              <li>Analyze traffic patterns to enhance app usability and reliability.</li>
              <li>Detect and prevent fraud, unauthorized activity, or system abuse.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              By continuing to use the Zerocard platform, you consent to our use of cookies as described in this Notice.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Are Cookies & Tracking Technologies?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies are small text files that store information on your device when you visit or interact with our platform. They allow us to recognize your browser or device and remember your preferences.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tracking technologies include pixels, web beacons, analytics scripts, and SDKs (for mobile apps) that help us measure performance, detect technical issues, and understand how users interact with our services.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              These technologies are critical to supporting Zerocard's wallet functions, real-time transaction tracking, and card management experience.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Please note that we do not use cookies to collect sensitive personal data such as financial information, identification documents, or authentication credentials.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Types of Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type of Cookie</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Purpose</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Strictly Necessary Cookies</td>
                    <td className="border border-gray-300 px-4 py-2">Essential for website/app functionality, login, security, and fraud prevention.</td>
                    <td className="border border-gray-300 px-4 py-2">Session cookies, authentication tokens, login tokens</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Performance & Analytics Cookies</td>
                    <td className="border border-gray-300 px-4 py-2">Helps us analyze user behaviour, improve site speed, and enhance platform performance.</td>
                    <td className="border border-gray-300 px-4 py-2">Google Analytics, Firebase SDK</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Functional Cookies</td>
                    <td className="border border-gray-300 px-4 py-2">Remembers user preferences, language settings, and browsing history</td>
                    <td className="border border-gray-300 px-4 py-2">Localization settings, Dark Mode preferences, User interface settings</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Security Cookies</td>
                    <td className="border border-gray-300 px-4 py-2">Protect against fraud, abuse, or unauthorized account access.</td>
                    <td className="border border-gray-300 px-4 py-2">Device fingerprinting, session validation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Marketing Cookies (where applicable)</td>
                    <td className="border border-gray-300 px-4 py-2">Track user activity to deliver personalized promotions and targeted ads</td>
                    <td className="border border-gray-300 px-4 py-2">Referral tracking pixels</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Legal Basis for Using Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We process cookies based on:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li><strong>Strictly Necessary Cookies:</strong> Our legitimate interest in securing the Zerocard app, maintaining wallet operations, processing transactions, preventing fraud, and providing essential platform services.</li>
              <li><strong>Other Cookies (Analytics, Functional, Marketing):</strong> Your explicit consent, in accordance with the Nigeria Data Protection Act (NDPA) and applicable global privacy standards (e.g., GDPR principles), to help us improve usability, personalize content, and enhance performance.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You are in control of your cookie preferences and may choose to limit or disable them at any time by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>Adjusting your device or browser settings (e.g., Chrome, Safari, Edge, Firefox, Android).</li>
              <li>Declining or withdrawing consent to certain cookie types within your mobile app privacy settings.</li>
              <li>Opting out of third-party analytics or marketing trackers (where applicable).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Please note that disabling essential cookies may affect key functions such as login sessions, wallet synchronization, or transaction confirmations within the Zerocard app.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Third-Party Cookies & Data Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zerocard works with trusted technology and compliance partners who may deploy cookies or similar identifiers on our behalf. These may include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>Analytics providers (to help us understand user behavior and app performance).</li>
              <li>Payment and card processing partners (to securely process wallet funding, card transactions, and settlements).</li>
              <li>Cloud infrastructure and hosting providers (to maintain system stability and security).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4 mb-4">
              We ensure full compliance and data protection by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>Maintaining Data Processing Agreements (DPAs) with all third-party vendors.</li>
              <li>Applying encryption, pseudonymization, and access controls to protect user data.</li>
              <li>Limiting data use strictly to authorized and consented purposes, in line with the NDPA and CBN Data Protection Framework.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Retention & Storage</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain cookie and tracking data for a maximum of 24 months, after which it is deleted or anonymized.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              All tracking data is securely stored in encrypted environments and processed in compliance with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>The Nigeria Data Protection Act (NDPA),</li>
              <li>CBN Consumer Protection Framework, and</li>
              <li>Nigerian Financial Data Security Standards (NFIS).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              This ensures your data remains protected and used only for legitimate and transparent purposes.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about our Cookie Policy, contact: Email:{' '}
              <a href="mailto:support@getzerocard.xyz" className="text-blue-600 hover:text-blue-800">
                support@getzerocard.xyz
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieNotice;
