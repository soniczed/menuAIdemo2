import React, { useState } from 'react';
import { MessageSquare, Clock, ChefHat, BarChart3, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import DemoChat from '../components/DemoChat';
import VideoModal from '../components/VideoModal';
import PartnerCarousel from '../components/PartnerCarousel';
import CostComparison from '../components/CostComparison';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';

function LandingPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">menuAI</h2>
          <div className="inline-block animate-bounce bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-medium mb-6">
            Revolutionizing Restaurant Ordering with AI
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Here for a meal?
            <span className="text-black block mt-2">Talk to our menu!</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The menu you can chat with and place orders, right from your table.
            Experience personalized recommendations and lightning-fast service.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="bg-white text-black border-2 border-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
            >
              Watch Demo <Play className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <PartnerCarousel />

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<MessageSquare className="w-8 h-8 text-black" />}
            title="AI-Powered Chat"
            description="Interact naturally with our smart menu system for a personalized dining experience"
          />
          <FeatureCard
            icon={<Clock className="w-8 h-8 text-black" />}
            title="Instant Service"
            description="No more waiting for staff - order and get assistance instantly"
          />
          <FeatureCard
            icon={<ChefHat className="w-8 h-8 text-black" />}
            title="Smart Recommendations"
            description="Get personalized dish suggestions based on your preferences"
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8 text-black" />}
            title="Efficiency Analytics"
            description="Track and optimize your restaurant's performance"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-4xl mx-auto">
            <Step number={1} title="Scan QR Code" description="Scan the QR code at your table" />
            <Step number={2} title="Chat with Menu" description="Browse and ask questions naturally" />
            <Step number={3} title="Place Order" description="Order directly through the chat" />
            <Step number={4} title="Enjoy" description="Sit back and enjoy your meal" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gray-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Restaurants Choose MenuAI</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Stat number="85%" label="Faster Service" />
            <Stat number="32%" label="Cost Reduction" />
            <Stat number="95%" label="Customer Satisfaction" />
          </div>
          <CostComparison />
        </div>
      </section>

      <PricingSection onGetStarted={handleGetStarted} />
      <Footer />
      <DemoChat />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-black mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

export default LandingPage;