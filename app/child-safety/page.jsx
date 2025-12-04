"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  DocumentTextIcon,
  EyeIcon,
  BellAlertIcon,
  EnvelopeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

export default function ChildSafetyPolicyPage() {
  const [currentDate, setCurrentDate] = useState('');
  const [appName, setAppName] = useState('The Ultimate Break-up Guide');
  const [developerName, setDeveloperName] = useState('Mind That Seeks Truth Publishing Ltd.');
  const [supportEmail, setSupportEmail] = useState('md007m@gmail.com');
  const [websiteUrl, setWebsiteUrl] = useState('www.mindthatseekstruth.com');
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState('/privacy-policy');
  
  // For demo purposes - prefill with sample data
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(formattedDate);
    
    // Uncomment to allow user input
    // setAppName('SafeKid App');
    // setDeveloperName('Safe Developers Inc.');
    // setSupportEmail('safety@safekidapp.com');
    // setWebsiteUrl('www.safekidapp.com');
    // setPrivacyPolicyUrl('www.safekidapp.com/privacy');
  }, []);

  const policySections = [
    {
      id: 1,
      title: "Introduction",
      icon: <DocumentTextIcon className="h-6 w-6" />,
      content: `${appName}, developed by ${developerName}, is committed to ensuring the protection, safety, and wellbeing of children who may access or use our services. This Child Safety Standards Policy outlines our approach to preventing harm, abuse, and exploitation involving minors.`
    },
    {
      id: 2,
      title: "Prohibition of Child Sexual Abuse and Exploitation (CSAE)",
      icon: <ExclamationTriangleIcon className="h-6 w-6" />,
      content: "We strictly prohibit any content, media, or communication involving child sexual abuse or exploitation (CSAE), the creation, possession, distribution, or promotion of CSAE, and grooming, sexual solicitation, or any inappropriate communication with minors.",
      note: "Any such behavior will result in immediate termination of access, removal of content, and may be reported to relevant law enforcement authorities."
    },
    {
      id: 3,
      title: "Harmful or Dangerous Content Involving Minors",
      icon: <BellAlertIcon className="h-6 w-6" />,
      content: "The following types of content involving minors are strictly prohibited: violent or abusive behavior, encouragement of self-harm, substance abuse, or dangerous activities, and bullying, harassment, threats, or hate speech targeting minors.",
      note: "We take measures to remove this content and enforce disciplinary action when identified."
    },
    {
      id: 4,
      title: "User Responsibilities",
      icon: <UserGroupIcon className="h-6 w-6" />,
      content: `Users of ${appName} must refrain from posting, sharing, or requesting prohibited content, avoid harmful interactions with minors, and report any suspected violations or abusive behavior.`,
      note: "Failure to comply may lead to content removal, account suspension, or legal action."
    },
    {
      id: 5,
      title: "Reporting Violations",
      icon: <EnvelopeIcon className="h-6 w-6" />,
      content: "If you encounter content or behavior that violates this policy, please report it immediately through:",
      details: `Email: ${supportEmail}\nWebsite: ${websiteUrl}/contact`,
      note: "We will review and respond to reports promptly and confidentially."
    },
    {
      id: 6,
      title: "Data Collection and Privacy",
      icon: <EyeIcon className="h-6 w-6" />,
      content: "We do not knowingly collect personal data from children under the age of 13 without verified parental consent.",
      note: `For more information, please refer to our Privacy Policy located at: ${privacyPolicyUrl}`
    },
    {
      id: 7,
      title: "Monitoring and Enforcement",
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      content: "We may take one or more of the following actions in response to violations: remove content, restrict app functionality, suspend or terminate user accounts, or report illegal activities to law enforcement.",
      note: "We reserve the right to enforce this policy to ensure user safety and compliance with applicable laws."
    },
    {
      id: 8,
      title: "Changes to This Policy",
      icon: <CalendarIcon className="h-6 w-6" />,
      content: "We may update this Child Safety Standards Policy periodically. Updates will be posted on this page with a revised effective date."
    },
    {
      id: 9,
      title: "Contact Information",
      icon: <EnvelopeIcon className="h-6 w-6" />,
      content: `If you have any questions about this policy, please contact:\n${developerName}\nEmail: ${supportEmail}\nWebsite: ${websiteUrl}`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-white">
      <Head>
        <title>Child Safety Standards Policy - {appName}</title>
        <meta name="description" content="Child Safety Standards Policy for our application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
                <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white text-left">Child Safety Standards Policy</h1>
                <p className="text-blue-100 mt-1">for {appName} by {developerName}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 bg-blue-800/50 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">Effective Date: {currentDate}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Introduction section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-blue-500">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800">1. Introduction</h2>
              <p className="mt-3 text-gray-700">{policySections[0].content}</p>
            </div>
          </div>
        </div>

        {/* Policy sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {policySections.slice(1).map((section) => (
            <div 
              key={section.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                    <div className="text-blue-600">{section.icon}</div>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-bold text-gray-800">
                      {section.id}. {section.title}
                    </h2>
                    <p className="mt-3 text-gray-700">{section.content}</p>
                    
                    {section.details && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                        <pre className="text-sm text-gray-800 whitespace-pre-line font-sans">
                          {section.details}
                        </pre>
                      </div>
                    )}
                    
                    {section.note && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                        <p className="text-sm text-amber-800">{section.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important notice */}
        <div className="mt-10 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-r-lg">
          <div className="flex">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-700 text-lg">Important Notice</h3>
              <p className="text-red-800 mt-1">
                The safety and protection of children is our top priority. Any violations of this policy will be taken seriously and may result in legal consequences. We encourage all users to report any concerning behavior or content immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href={`mailto:${supportEmail}`} 
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg shadow flex flex-col items-center justify-center transition-colors"
          >
            <EnvelopeIcon className="h-8 w-8 mb-2" />
            <span className="font-medium">Report Violation</span>
            <span className="text-sm text-blue-200 mt-1">Email: {supportEmail}</span>
          </a>
          
          <a 
            href={`https://${websiteUrl}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-lg shadow flex flex-col items-center justify-center transition-colors"
          >
            <ShieldCheckIcon className="h-8 w-8 mb-2" />
            <span className="font-medium">Visit Our Website</span>
            <span className="text-sm text-indigo-200 mt-1">{websiteUrl}</span>
          </a>
          
          <a 
            href={privacyPolicyUrl} 
            className="bg-gray-800 hover:bg-gray-900 text-white p-4 rounded-lg shadow flex flex-col items-center justify-center transition-colors"
          >
            <DocumentTextIcon className="h-8 w-8 mb-2" />
            <span className="font-medium">Privacy Policy</span>
            <span className="text-sm text-gray-300 mt-1">View our full privacy policy</span>
          </a>
        </div>
      </main>
    </div>
  );
}