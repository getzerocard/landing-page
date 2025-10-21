import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const PrivacyPolicy: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Zerocard</title>
        <meta name="description" content="Zerocard Privacy Policy" />
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
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
      </div>
      
        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              This Privacy Policy is an integral part of the Terms of Use of https://www.getzerocard.xyz/ (jointly referred to as our services). It governs how Zerocard ("Zerocard,""we,""our,""us"), which includes its affiliates and subsidiaries, collects, uses, stores, protects, and discloses the information obtained through the use of our mobile application, website, or related services (collectively, the "Services").
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your privacy is of utmost importance to us, and we are committed to ensuring the confidentiality, integrity, and security of your personal data when you use our website, mobile services and digital platforms.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In today's digital age, data protection is essential for businesses operating globally. With increasing privacy and data protection regulations across various jurisdictions, compliance is not only a legal requirement but also a strategic advantage. A strong data protection strategy enhances consumer confidence and upholds the fundamental right to privacy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our goal is to provide our users with comprehensive, tailored strategies to navigate privacy and data protection challenges effectively.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Consent</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using our service, you signify that you have read, understood, and agree to our processing of your personal information as described in this Privacy Policy and our Terms of Service.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For purposes of this Policy, "Personal Data" is any information that identifies, relates to, or describes, directly or indirectly, an individual or household.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In the course of operating our services, we collect and use your personal data to deliver our services, comply with legal requirements, address your inquiries, offer customer support, enhance our offerings, fulfill our contractual obligations and maintain our relationship with you.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect personal information you provide when creating an account, performing transactions, or communicating with us. This may include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>Full legal name (as per government ID)</li>
              <li>Date of birth</li>
              <li>Phone Number</li>
              <li>Email Address</li>
              <li>Residential address and proof (utility bill, tenancy agreement, etc.)</li>
              <li>Postcode</li>
              <li>Nationality</li>
              <li>Country Of Residence</li>
              <li>Social Security Number (where applicable)</li>
              <li>Biometric verification (via BVN or facial verification)</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Purpose of Processing Your Personal Data and Lawful Basis</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Zerocard, we process your personal data only when we have a valid legal reason to do so, as required by applicable data protection laws. Our privacy team assesses and documents the appropriate lawful basis for each processing activity.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on the context, we may process your data on one or more of the following grounds: to open your wallet account, to comply with a legal or regulatory obligation, based on our legitimate business interests (provided they do not override your rights), or where necessary, with your explicit consent.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Where we rely on your consent, we will make sure to request it in a clear and transparent manner. You are free to refuse or withdraw your consent at any time by emailing us at dpo@getzerocard.xyz or by opting out through the channels provided.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information Collected Automatically</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you use our services, we automatically collect certain data, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li><strong>Device Information:</strong> We receive information about the device and software you use to access our Services, including device type, Internet Protocol (IP) address, browser version, operating system, and unique device identifiers</li>
              <li><strong>Usage Information:</strong> To help us understand how you use our Services, and to help us improve them, we automatically receive information about details of your interactions with our App, including login timestamps, session duration, navigation actions, and transaction history</li>
              <li><strong>Browsing Information:</strong> When you access third-party or external content through the Zerocard app, we may collect details such as the referring URL and record the sections or features you interact with within our services</li>
              <li><strong>IP Address:</strong> We automatically collect and store your Internet Protocol (IP) address to help us analyse traffic patterns, detect potential security issues, and maintain the overall safety and reliability of the Zerocard platform</li>
              <li><strong>Location Information:</strong> When you use our Services, we may collect or infer your general location information from your IP address or other signals to comply with applicable laws and fraud prevention measures</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Share Your Personal Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Zerocard, we take your privacy seriously and only share your personal data when it is necessary, lawful, and aligned with the purposes described in this Privacy policy. We do not sell or rent your personal information to anyone.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your data in the following ways:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li><strong>Service Providers:</strong> We work with trusted third-party partners who help us deliver, secure, and improve our services</li>
              <li><strong>Regulatory Authorities:</strong> We may disclose personal data to relevant government bodies, regulators, financial intelligence units, or law enforcement agencies when required by law or regulation</li>
              <li><strong>Business and Integration Partners:</strong> We may share limited data with our integration and infrastructure partners such as card issuers, crypto off-ramp providers, or compliance collaborators solely for service functionality, fraud prevention, and transaction processing</li>
              <li><strong>Corporate Transactions:</strong> In the event of a merger, acquisition, restructuring, or sale of assets, user data may form part of the transferred business assets</li>
              <li><strong>Aggregated and Anonymised Data:</strong> We may share non-identifiable data such as aggregated transaction trends, app usage statistics, or performance metrics for research, compliance, or analytical purposes</li>
              </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zerocard uses cookies, device identifiers, and similar tracking technologies to understand how users interact with our app and services. These tools help us deliver a faster, safer, and more personalised experience across both the Zerocard app and web platforms.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use these technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>Enhance app performance and usability: Understand navigation patterns, improve load times, and optimise our service</li>
              <li>Personalise your experience: Recommend features, updates, and content based on your preferences and activity</li>
              <li>Maintain platform security: Detect unusual behavior, prevent fraud, and safeguard your wallet and transactions</li>
              <li>Analyse product performance: Measure feature adoption, engagement levels, and app stability to improve functionality</li>
              </ul>
            <p className="text-gray-700 leading-relaxed">
              You can control or limit the use of certain cookies and tracking features through your device or browser settings. However, disabling essential tracking (such as security or session cookies) may limit or affect the proper functioning of key Zerocard services.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Security of Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We take comprehensive steps to ensure that your personal information is stored and processed securely and in accordance with this Privacy Policy and applicable data protection laws, including the Nigerian Data Protection Act (NDPA).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              To protect your data, Zerocard employs industry-standard security measures, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>Encrypted storage and communication to protect your data both during transmission and while stored</li>
              <li>Secure servers and firewalls that shield our systems from unauthorised access and external threats</li>
              <li>Access control protocols, ensuring that only authorised team members—bound by confidentiality obligations—can access your personal data</li>
              <li>Regular security reviews and system updates to proactively identify and resolve vulnerabilities</li>
              <li>Use of reputable third-party service providers who maintain and enforce their own robust data protection and security policies</li>
              </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You, as a data subject, have certain rights under the law. These include the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>Access personal data we hold about you by making a request</li>
              <li>Rectify such information where you believe it to be incorrect or inaccurate</li>
              <li>Restrict the processing of your data in certain circumstances</li>
              <li>Object to the processing of your data where we intend to process such data for marketing purposes</li>
              <li>Request the erasure of your data (also known as the right to be forgotten)</li>
              <li>Withdraw your consent to the processing of your personal data</li>
              <li>Lodge a complaint with a relevant authority, where you have reason to believe that we have violated the term(s) of this Notice</li>
              </ul>
            <p className="text-gray-700 leading-relaxed">
              You may seek to exercise any of the above rights at any time by sending an email to us via dpo@getzerocard.xyz
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures, including encryption, access controls, and regular audits, to protect your data. While we take all necessary precautions, we acknowledge that no online system is entirely secure. We retain user data for a term of 10 years to provide services and comply with legal obligations.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Privacy of Children</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              No one under the age of 18 is authorised to submit any information, including personal data, on our services. Under no circumstances shall anyone under the age of 18 use the Service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you learn that your child has provided us with personal data without your consent, you may alert us at support@getzerocard.xyz. If we learn that we have collected any personal data from children under 18, we will promptly take steps to delete such information and terminate the child's account.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Account Deactivation and Deletion</h2>
            <p className="text-gray-700 leading-relaxed">
              If you no longer desire to use the services on our services, you may deactivate or delete your account by sending us an email at dpo@getzerocard.xyz. Deactivating your account puts your account on hold and is the same as telling you not to delete any information because you might want to reactivate your account at some point in the future.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or the use of your information, or to modify or update any information we have received, please contact{' '}
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

export default PrivacyPolicy; 