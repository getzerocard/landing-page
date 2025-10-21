import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const KYCPolicy: NextPage = () => {
  return (
    <>
      <Head>
        <title>KYC Policy - Zerocard</title>
        <meta name="description" content="Zerocard KYC Policy" />
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
            <h1 className="text-3xl font-bold text-gray-900">KYC Policy</h1>
            <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zerocard is a fintech company that issues crypto payment cards designed to facilitate seamless everyday transactions. The platform enables users to store stablecoins, such as USDC, within their digital wallets and utilize them for payments and withdrawals in the same manner as conventional currency.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This Know Your Customer (KYC) Policy serves as the foundation of Zerocard's AML/CFT/CPF compliance framework, establishing the standards and procedures for verifying the identity of users and ensuring compliance with all applicable laws and regulations in Nigeria and other jurisdictions.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Purpose and Scope</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The policy is designed to help Zerocard identify and verify its users, perform due diligence checks, and prevent money laundering, terrorism financing, and other illegal financial activities.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before processing any transaction, the company must verify each user's identity and source of funds. If a new user fails or refuses to provide required information, their transactions must not be processed, and if they are existing customers, their accounts should be suspended or terminated.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Guiding Principles</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This policy is developed in line with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>The Central Bank of Nigeria (CBN) Anti-Money Laundering/Combating the Financing of Terrorism/Countering Proliferation Financing of Weapons of Mass Destruction in Financial Institutions CBN(AML/CFT/CPF) Regulations of 2022</li>
              <li>The Money Laundering (Prevention and Prohibition) Act, 2022</li>
              <li>The Terrorism (Prevention) Act, 2022 (as amended)</li>
              <li>Securities and Exchange Commission (SEC) rules on digital assets</li>
              <li>Nigeria Data Protection Act (NDPA) 2023</li>
              <li>The 40 Recommendations issued by the Financial Action Task Force (FATF)</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Customer Identification Requirements</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each new user must be at least 18 years old and provide applicable onboarding information, which is subject to verification through electronic means or supporting documentation.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Basic information collection:</strong> Zerocard mandatorily collects the following information from users:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>Full legal name (as per government ID)</li>
              <li>Date of birth</li>
              <li>Phone Number</li>
              <li>Email</li>
              <li>Residential address and proof (utility bill not later than 3 months)</li>
              <li>Nationality</li>
              <li>National Identity Number (NIN)</li>
              <li>Bank Verification Number (BVN)</li>
              <li>Biometric verification (liveness check)</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Valid Identification Documents</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Means of identification allowed includes any of the following valid documents:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>Valid International Passport</li>
              <li>Valid Driver's License</li>
              <li>National Identity Card</li>
              <li>Any other document approved by the regulators from time to time</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Risk Categorization</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zerocard adopts a risk-based approach to Money Laundering (ML) and Terrorism Financing (TF) in line with regulatory best practices. Users are classified into the following risk categories:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li><strong>High Risk:</strong> Non-resident users, Politically and Financially exposed persons (PEPs & FEPs), those adjudged fraudulent by competent courts, users whose source of wealth cannot be reasonably established</li>
              <li><strong>Medium Risk:</strong> Government Ministries and Parastatals/Enterprises, Other Public Sector Accounts</li>
              <li><strong>Low Risk:</strong> Public corporations, financial institutions and other self-regulatory institutions</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Politically Exposed Persons (PEPs)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PEPs are individuals who are or have been entrusted with prominent public functions in Nigeria and/or foreign countries and people/entities associated with them. This includes political office holders and senior government functionaries.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              PEPs and FEPs are subject to enhanced due diligence measures, including senior management approval and continuous monitoring of their accounts and transactions.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">KYC Re-certification</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zerocard performs ongoing monitoring through periodic and trigger event reviews. The frequency of a user's periodic review is determined by their risk rating:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>Low Risk: 5 years</li>
              <li>Medium Risk: 3 years</li>
              <li>High Risk: 1 year</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Sanction Screening</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In compliance with applicable regulations, Zerocard maintains strict procedures to prevent engagement with individuals subject to financial sanctions. The company shall not open accounts for, or conduct transactions with, any individual identified on any national or international sanctions list.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Protection and Record Keeping</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All personal information collected for KYC purposes is protected in accordance with our Privacy Policy and applicable data protection laws, including the Nigeria Data Protection Act (NDPA) 2023.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Records are maintained for a minimum of 5 years after the closure of accounts or cessation of business relationships, in compliance with the Money Laundering (Prevention and Prohibition) Act, 2022.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about our KYC requirements, please contact us at{' '}
              <a href="mailto:support@getzerocard.xyz" className="text-blue-600 hover:text-blue-800">
                support@getzerocard.xyz
              </a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default KYCPolicy;
