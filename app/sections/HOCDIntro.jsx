"use client"
import React, { useState, useEffect, useRef } from 'react';

const HOCDIntro = () => {
  const [clientSatisfaction, setClientSatisfaction] = useState(0);
  const [yearsExperience, setYearsExperience] = useState(0);
  const [individualsHelped, setIndividualsHelped] = useState(0);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate statistics
      const satisfactionInterval = setInterval(() => {
        setClientSatisfaction(prev => {
          if (prev >= 95) {
            clearInterval(satisfactionInterval);
            return 95;
          }
          return prev + 1;
        });
      }, 30);

      const experienceInterval = setInterval(() => {
        setYearsExperience(prev => {
          if (prev >= 10) {
            clearInterval(experienceInterval);
            return 10;
          }
          return prev + 1;
        });
      }, 100);

      const helpedInterval = setInterval(() => {
        setIndividualsHelped(prev => {
          if (prev >= 500) {
            clearInterval(helpedInterval);
            return 500;
          }
          return prev + 10;
        });
      }, 10);

      return () => {
        clearInterval(satisfactionInterval);
        clearInterval(experienceInterval);
        clearInterval(helpedInterval);
      };
    }
  }, [isVisible]);

  return (
    <main className="flex gap-4 flex-col">

    <section ref={sectionRef} className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Specialized <span className="text-blue-600">HOCD & OCD</span> Support
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Heartful care and evidence-based support from Mehran Dadbeh
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-blue-500">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Understanding Your Journey
              </h2>
              <p className="text-gray-700 mb-4">
                HOCD (Homosexual Obsessive Compulsive Disorder) can create significant distress and uncertainty. 
                With Mehran's guidance, you'll find a supportive environment to address these challenges using 
                proven approaches.
              </p>
              <p className="text-gray-700">
                Mehran specializes in creating personalized care plans that respects your values while 
                effectively addressing OCD disorder symptoms.
              </p>
            </div>

          </div>

          <div>
            <div className="bg-blue-600 text-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">Mehran's Approach to HOCD Disorder</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-500 rounded-full p-2 mr-4 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Evidence-Based Techniques</h4>
                    <p className="text-blue-100">Utilizing ERP (Exposure Response Prevention) and CBT methods proven effective for OCD</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-500 rounded-full p-2 mr-4 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Personalized Care</h4>
                    <p className="text-blue-100">Support plans tailored to your specific needs and recovery goals</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-500 rounded-full p-2 mr-4 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Compassionate Support</h4>
                    <p className="text-blue-100">A safe, non-judgmental space to explore your concerns and find relief</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-500 rounded-full p-2 mr-4 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Sustainable Recovery</h4>
                    <p className="text-blue-100">Focus on long-term strategies to maintain progress and prevent relapse</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="/consultation" 
                className="mt-8 block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition duration-300 w-full text-center"
              >
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      
    </section>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Learn More About HOCD Support
          </h2>
          <p className="text-gray-600 mb-8">
            Discover how personalized, evidence-based strategies can help you manage HOCD and achieve sustainable recovery. Mehran Dadbeh’s approach combines compassion, expertise, and proven techniques to support your journey.
          </p>
          <a
            href="/hocd"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Learn More
          </a>
        </div>
      </section>
    </main>

  );
};

export default HOCDIntro;