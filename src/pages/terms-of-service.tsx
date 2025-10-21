import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const TermsOfService: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terms of Service - Zerocard</title>
        <meta name="description" content="Zerocard Terms of Service" />
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
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
            <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              These Terms of Service ("Terms") constitute a binding agreement between you ("User", "you", or "your") and Zerocard ("Zerocard", "the Company", "we", "our", or "us") governing your use of our mobile application, debit card, wallets, and all related products and services (collectively, the "Services").
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              By using any of our services provided, you acknowledge that you have read, understood and accepted the terms, conditions, notices and disclaimers contained in this document and in the Privacy Policy.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zerocard is a financial technology company that provides users with card-based payment solutions, virtual asset infrastructure and digital wallets. Our Services allow users to fund wallets with supported virtual assets, withdraw funds from their wallets, and spend using a Zerocard debit card.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Zerocard operates in compliance with the applicable financial laws and regulations and implements processes to conform to Anti-Money Laundering/Combating the Financing of Terrorism requirements of financial regulators and law enforcement agencies.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Eligibility</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To prevent illegal use of our services, users of the Zerocard platform must acknowledge and agree to the following eligibility and usage conditions:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>To access the platform, you must create an account using complete, truthful, and up-to-date personal information</li>
              <li>You will also be required to supply a password, which you must keep confidential always</li>
              <li>You must be 18 years or older</li>
              <li>Access must not be through automated or non-human means (e.g., bots or scripts)</li>
              <li>You agree to undergo necessary identity verification and data security checks as may be required by Zerocard</li>
              <li>You have the legal capacity to enter into a binding contract under the law of your territory</li>
              <li>You agree to comply with these Terms and all applicable laws and regulations</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Restrictions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zerocard services are not available in certain jurisdictions restricted by our compliance and verification partners. These include, but are not limited to:
            </p>
            <p className="text-gray-700 leading-relaxed">
              Belarus, Burundi, Central African Republic, Cuba, Iran, Libya, Myanmar (Burma), North Korea, Russia, Somalia, South Sudan, Sudan, Syrian Arab Republic, Ukraine, Venezuela, Zimbabwe, and any other jurisdictions listed or updated by our third-party verification provider in line with international sanction requirements.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Assumption of Risk</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Users acknowledge that the use of digital assets and blockchain-based transactions inherently carries operational, market, and technological risks, including but not limited to high price volatility, liquidity fluctuations, and transaction delays. Users also understand and accept the cybersecurity risks associated with online platforms.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You are responsible for safeguarding your account credentials. Zerocard will not be liable for unauthorised access resulting from your negligence, including the sharing of passwords.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By accessing or transacting on the Zerocard platform, users expressly agree that they assume full responsibility for their investment and transactional decisions. Zerocard shall not be held liable for any loss, damage, or liability arising directly or indirectly from such user activities.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Verification (Account Creation and KYC)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Account Creation:</strong> To access Zerocard Services, you must download the mobile application and create an account. Registration requires a valid email address, which will be verified through a One-Time Password (OTP) sent to your email.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>User Verification:</strong> To comply with applicable legal and regulatory requirements, all users are required to complete identity verification before their wallet can be accessed. This process involves the submission of valid identification documents and is essential to ensuring the lawful, secure, and responsible use of our services.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Required Information:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>Full Name (First and Last Name)</li>
              <li>Date of Birth</li>
              <li>Phone Number</li>
              <li>Email Address</li>
              <li>Residential Address</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              During the registration process, you will also be required to provide accurate, current, and complete means of Identification. This may include, but is not limited to: Passport, National Identity document, Driver's License, or Residency permit.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Fees and Charges</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zerocard is committed to providing a zero-fee experience for its core services, ensuring that users can transact, hold, and manage their digital assets without hidden or unexpected charges.
            </p>
            <p className="text-gray-700 leading-relaxed">
              However, certain value-added or optional services may attract fees. These may include, but are not limited to, physical or virtual card issuance, express processing of transactions, currency conversions, third-party payment integration fees, and cross-border transaction fees facilitated through partner networks.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Use of Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zerocard operates as a digital payment and wallet service provider, not as a virtual asset exchange, minting company, or brokerage platform. The platform's functions are limited to enabling users to store, fund, and spend digital assets through a regulated and compliant payment infrastructure.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The specific roles and services available to users include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li><strong>Wallet Funding:</strong> Users may fund their Zerocard wallets using supported virtual assets or other approved digital payment methods</li>
              <li><strong>Withdrawals:</strong> To withdraw funds from their Zerocard wallet, users must complete the mandatory KYC verification process</li>
              <li><strong>Card Ordering:</strong> After successful KYC verification, users may request either a virtual or physical Zerocard debit card</li>
              <li><strong>Compliance and Transaction Monitoring:</strong> Zerocard continuously monitors all transactions to ensure compliance with regulatory standards</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">User Responsibility and Prohibition</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Users must maintain the confidentiality of their account credentials and access devices. The use of Zerocard for any illegal, fraudulent, or unethical activity is strictly prohibited. This includes, but is not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>Money laundering, terrorism financing, or any transaction that violates AML/CFT laws</li>
              <li>Trading, exchanging, or minting of unregulated or banned digital assets</li>
              <li>Funding or supporting gambling, narcotics, weapons, or human trafficking</li>
              <li>Engaging in fraudulent chargebacks, scams, or impersonation of Zerocard or third parties</li>
              <li>Circumventing verification or transaction monitoring procedures</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Disclaimer of Warranties</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Services offered by Zerocard are provided on an "as is" and "as available" basis, without any express or implied warranties of any kind. Zerocard does not warrant or guarantee that the platform or any of its features will be error-free, uninterrupted, or completely secure from unauthorised access, hacking, or data breaches.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using Zerocard, users expressly acknowledge and agree that they do so at their own risk. Zerocard, its affiliates, officers, employees, and partners shall not be held liable for any direct, indirect, incidental, consequential, or special damages or losses arising from the use, inability to use, or reliance upon Zerocard's services.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the fullest extent permitted by applicable law, Zerocard, its affiliates, directors, officers, employees, and agents shall not be liable for any indirect, incidental, consequential, exemplary, special, or punitive damages arising out of or in connection with the use or inability to use the Services.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Users who experience issues, discrepancies, or dissatisfaction with any Zerocard service are encouraged to first contact the company's Customer Support Team through the official in-app support channel or via email at support@getzerocard.xyz
            </p>
            <p className="text-gray-700 leading-relaxed">
              All complaints or dispute notifications must include sufficient details, such as the transaction reference, date, and a clear description of the issue to enable effective review and resolution.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Use and your use of the platform are governed by and construed in accordance with the laws of Nigeria applicable to agreements made and to be entirely performed within Nigeria without regard to its conflict of law principles.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall remain in full force and effect for as long as you access or use the Zerocard platform. Zerocard reserves the right, at its sole discretion and without prior notice, to deny access, restrict, or suspend your account or wallet where necessary — including, but not limited to, instances involving violations of these Terms, suspicious activity, or breaches of applicable laws and regulations.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at{' '}
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

export default TermsOfService;
