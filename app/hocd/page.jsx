'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  Zap, 
  Shield,
  BookOpen,
  Video,
  Calendar,
  HelpCircle,
  HeartHandshake,
  Star,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

// YouTube API function to get video titles
const getYouTubeVideoTitle = async (videoId) => {
  try {
    // Using YouTube oEmbed API as it doesn't require API key
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    const data = await response.json();
    return data.title;
  } catch (error) {
    console.error('Error fetching YouTube video title:', error);
    return 'Video Title'; // Fallback title
  }
};

const HOCDLandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ValuesSection />
      <EducateSection />
      <VideoSection />
      <CTASection />
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Image with Very Low Opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg)',
        }}
      />
        
      {/* Light Gradient Overlays */}
      <div className="absolute inset-0">
        {/* Soft Blue Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white/30 to-purple-50/30"></div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.03)_50%,transparent_75%)] bg-[length:100px_100px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.02)_0%,transparent_50%)]"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm text-blue-800 text-sm font-medium mb-8 shadow-lg border border-white/40"
          >
            <HeartHandshake className="w-4 h-4 mr-2" />
            Practical OCD Support
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Proven <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HOCD</span> Support
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Evidence-based strategies and care from <span className="font-semibold text-gray-900">Mehran Dadbeh</span>
          </p>

          {/* CTA Button */}
          <motion.a
            href="/consultation"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-xl hover:shadow-2xl border border-blue-700/20"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule a Consultation
          </motion.a>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600"
          >
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Evidence-Based Methods</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Confidential Sessions</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Proven Results</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center bg-white/20 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-gray-600 rounded-full mt-2"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// Values & Awareness Section Component
const ValuesSection = () => {
  const quotes = [
    {
      text: "You are not the brain and the brain is not you.",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      text: "Intrusive thoughts are not facts.",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      text: "Protect your roots, values and learn to rewire the brain's disorder HOCD.",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Core Principles for Recovery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fundamental facts that guide our approach to HOCD management and recovery
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {quotes.map((quote, index) => (
            <QuoteCard key={index} quote={quote} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const QuoteCard = ({ quote, index }) => {
  const IconComponent = quote.icon;
  
  return (
    <motion.div
      variants={fadeInUp}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
      <div className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${quote.bgColor} ${quote.color} mb-6`}>
          <IconComponent className="w-7 h-7" />
        </div>
        <p className="text-lg text-gray-800 font-medium leading-relaxed">
          {quote.text}
        </p>
      </div>
    </motion.div>
  );
};

// Educate & Rewire Section Component
const EducateSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Evidence-Based Techniques",
      description: "ERP, CBT, and mindfulness-based approaches proven effective for OCD guidance."
    },
    {
      icon: Heart,
      title: "Compassionate Support",
      description: "Non-judgmental, understanding environment for your recovery journey."
    },
    {
      icon: Zap,
      title: "Brain Rewiring",
      description: "Neuroplasticity-based techniques to create new neural pathways."
    },
    {
      icon: Shield,
      title: "Values Alignment",
      description: "Strengthen personal values while managing intrusive thoughts."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Educate Yourself & Rewire Your Brain
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            HOCD involves intrusive thoughts about sexual orientation. Through evidence-based techniques 
            and compassionate support, learn to manage these thoughts and reclaim your peace of mind.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, index }) => {
  const IconComponent = feature.icon;
  
  return (
    <motion.div
      variants={scaleIn}
      className="group text-center"
    >
      <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mb-6 group-hover:bg-blue-100 transition-colors">
          <IconComponent className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
};

// Video Resources Section Component
const VideoSection = () => {
  const videoIds = ["a9g2vAgJWE4", "05ClRee614o", "s06T0HsKi6I"];
  const [videoTitles, setVideoTitles] = useState({});

  useEffect(() => {
    const fetchTitles = async () => {
      const titles = {};
      for (const videoId of videoIds) {
        const title = await getYouTubeVideoTitle(videoId);
        titles[videoId] = title;
      }
      setVideoTitles(titles);
    };

    fetchTitles();
  }, []);

  const getFallbackDescription = (videoId) => {
    const descriptions = {
      "a9g2vAgJWE4": "Understanding the nature of  HOCD",
      "05ClRee614o": "Evidence-based techniques to manage intrusive thoughts effectively",
      "s06T0HsKi6I": "Personal stories and practical recovery guidance"
    };
    return descriptions[videoId] || "Educational content about HOCD recovery";
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <Video className="w-4 h-4 mr-2" />
            Educational Resources
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Video Learning Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Carefully selected videos to help you understand and manage HOCD effectively.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {videoIds.map((videoId, index) => (
            <VideoCard 
              key={videoId} 
              videoId={videoId} 
              title={videoTitles[videoId] || "Loading..."}
              description={getFallbackDescription(videoId)}
              index={index} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const VideoCard = ({ videoId, title, description, index }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="group cursor-pointer"
    >
      <a 
        href={`https://www.youtube.com/watch?v=${videoId}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200">
          <div className="aspect-w-16 aspect-h-9 bg-gray-300 relative overflow-hidden">
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
<div className="p-6">
  <div className="flex items-start justify-between mb-2">
    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-lg flex-1">
      {title}
    </h3>
    <ExternalLink className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
  </div>
  <p className="text-gray-600 text-sm">{description}</p>
</div>

        </div>
      </a>
    </motion.div>
  );
};

// Call-to-Action Section Component
const CTASection = () => {
  const actions = [
    {
      path: "/consultation",
      label: "Start Consultation",
      description: "Begin your recovery journey with practical one-on-one guidance",
      icon: Calendar,
      variant: "primary",
      cta: "Book now"
    },
    {
      path: "/support",
      label: "Support Our Mission",
      description: "Help Mehran continue providing free educational content on YouTube",
      icon: HeartHandshake,
      variant: "secondary",
      cta: "Support here"
    },
    {
      path: "/ask-question",
      label: "Ask a Question",
      description: "Get personalized practical advice for specific concerns",
      icon: HelpCircle,
      variant: "outline",
      cta: "Ask now"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/20"
          >
            <Star className="w-4 h-4 mr-2" />
            Take the First Step Towards Recovery
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Peace of Mind?
          </h2>
          
          {/* Description */}
          <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Choose the path that feels right for you. Practical, confidential support is just a click away.
          </p>

          {/* Action Cards */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {actions.map((action, index) => (
              <ActionCard key={index} action={action} index={index} />
            ))}
          </motion.div>

          {/* Footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-blue-300 mt-12 text-lg flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Confidential • Practical • Evidence-Based
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

const ActionCard = ({ action, index }) => {
  const IconComponent = action.icon;
  
  return (
    <motion.div
      variants={scaleIn}
      className="group"
    >
      <a 
        href={action.path} 
        className="block h-full"
      >
        <div className={`p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 h-full flex flex-col hover:transform hover:scale-105 ${
          action.variant === 'primary' 
            ? 'bg-blue-600 border-blue-500 hover:bg-blue-700' 
            : action.variant === 'secondary'
            ? 'bg-purple-600 border-purple-500 hover:bg-purple-700'
            : 'bg-white/10 border-white/20 hover:bg-white/20'
        }`}>
          <div className={`flex items-center justify-center w-16 h-16 rounded-2xl mb-6 mx-auto ${
            action.variant === 'outline' ? 'bg-white/20' : 'bg-white/20'
          }`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-4">
            {action.label}
          </h3>
          
          <p className="text-blue-100 mb-6 flex-grow">
            {action.description}
          </p>
          
          <div className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors text-center ${
            action.variant === 'outline' 
              ? 'bg-white text-blue-900 hover:bg-blue-50' 
              : 'bg-white text-blue-900 hover:bg-blue-50'
          }`}>
            {action.cta}
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default HOCDLandingPage;