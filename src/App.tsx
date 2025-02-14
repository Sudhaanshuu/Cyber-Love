import { useState, useEffect, Key } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import { 
  Heart, 
  Share2, 
  RefreshCw, 
  Calendar, 
  Star, 
  Music, 
  Coffee,
  Gift,
  MessageCircleHeart as MessageHeart,
  Github,
  Mail,
  Sparkles,
  HomeIcon,
  Info,
  BookHeart,
  HeartHandshake,
  Flower2,
  PartyPopper,
  Camera,
  Upload,
  X
} from 'lucide-react';

function calculateLove(name1: string, name2: string) {
  const combinedNames = `${name1.toLowerCase()}${name2.toLowerCase()}`;
  let hash = 0;
  for (let i = 0; i < combinedNames.length; i++) {
    hash = ((hash << 5) - hash) + combinedNames.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash % 51) + 50;
}

function calculateZodiacCompatibility(birthMonth1: number, birthMonth2: number) {
  const diff = Math.abs(birthMonth1 - birthMonth2);
  if (diff === 0) return "Perfect Zodiac Match! ⭐⭐⭐⭐⭐";
  if (diff <= 2) return "Highly Compatible! ⭐⭐⭐⭐";
  if (diff <= 4) return "Good Compatibility! ⭐⭐⭐";
  return "Interesting Match! ⭐⭐";
}

function getLoveMessage(percentage: number) {
  if (percentage >= 90) return "Your love is written in the stars! 💫";
  if (percentage >= 80) return "A cosmic connection that defies gravity! 🌌";
  if (percentage >= 70) return "Your hearts beat in perfect sync! 💓";
  return "A budding romance with potential! 🌱";
}

const loveQuotes = [
  "Love is composed of a single soul inhabiting two bodies. - Aristotle",
  "Where there is love there is life.",
  "The best thing to hold onto in life is each other.",
  "Love is not just looking at each other, it's looking in the same direction.",
];

const relationshipTips = [
  {
    title: "Communication is Key",
    content: "Practice active listening and express your feelings openly.",
    icon: MessageHeart
  },
  {
    title: "Quality Time",
    content: "Make time for regular date nights and shared activities.",
    icon: Calendar
  },
  {
    title: "Show Appreciation",
    content: "Express gratitude and acknowledge your partner's efforts.",
    icon: Heart
  },
  {
    title: "Grow Together",
    content: "Support each other's goals and dreams.",
    icon: Flower2
  }
];

function App() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [birthMonth1, setBirthMonth1] = useState(1);
  const [birthMonth2, setBirthMonth2] = useState(1);
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [activeSection, setActiveSection] = useState('calculator');
  const [showLoveStory, setShowLoveStory] = useState(false);
  const [loveStory, setLoveStory] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTheme] = useState('cyberpunk');
  const [memories, setMemories] = useState(() => {
    const savedMemories = localStorage.getItem('memories');
    return savedMemories ? JSON.parse(savedMemories) : [];
  });
  const [sharedStories, setSharedStories] = useState([
    { author: "Sarah & Mike", story: "We met in a coffee shop during the rain...", date: "2025-01-15" },
    { author: "Alex & Jordan", story: "Our love story began in a coding bootcamp...", date: "2025-02-01" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % loveQuotes.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('memories', JSON.stringify(memories));
  }, [memories]);

  const handleCalculate = () => {
    if (!name1 || !name2) return;
    setIsCalculating(true);
    setShowTips(false);
    setTimeout(() => {
      setResult(calculateLove(name1, name2));
      setShowTips(true);
      setIsCalculating(false);
    }, 2000);
  };

  const handleShare = () => {
    if (!result) return;
    const text = `💖 Love Calculator Results 💖\n${name1} + ${name2} = ${result}%\n${getLoveMessage(result)}`;
    navigator.clipboard.writeText(text);
    alert('Results copied to clipboard!');
  };

  const handleImageUpload = (event: { target: { files: any[]; }; }) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemories([...memories, {
          id: Date.now(),
          image: reader.result,
          date: new Date().toISOString()
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStorySubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/mkgovlvl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          story: loveStory,
          email: email,
          date: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        setShowLoveStory(true);
        setSharedStories([{
          author: "Anonymous",
          story: loveStory,
          date: new Date().toISOString()
        }, ...sharedStories]);
      }
    } catch (error) {
      console.error('Error submitting story:', error);
      alert('Failed to submit story. Please try again.');
    }
  };

  const removeMemory = (id: any) => {
    setMemories(memories.filter((memory: { id: any; }) => memory.id !== id));
  };

  const renderTips = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto bg-black/30 p-8 rounded-2xl backdrop-blur-lg border border-pink-500/30"
    >
      <h2 className="text-2xl font-bold mb-6 text-pink-400">Relationship Tips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relationshipTips.map((tip, index) => (
          <div key={index} className="p-4 bg-pink-500/10 rounded-lg">
            <tip.icon className="text-pink-400 mb-2" />
            <h3 className="font-bold mb-2">{tip.title}</h3>
            <p className="text-sm text-gray-300">{tip.content}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderSection = () => {
    switch(activeSection) {
      case 'tips':
        return renderTips();
        
      case 'about':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto bg-black/30 p-8 rounded-2xl backdrop-blur-lg border border-pink-500/30"
          >
            <h2 className="text-2xl font-bold mb-4 text-pink-400">About CyberLove</h2>
            <p className="text-gray-300 mb-4">
              Welcome to CyberLove, where technology meets romance in the digital age. Our advanced love calculator uses cosmic algorithms and zodiac compatibility to help you explore the potential of your relationship.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-pink-500/10 rounded-lg">
                <HeartHandshake className="text-pink-400 mb-2" />
                <h3 className="font-bold mb-2">Smart Matching</h3>
                <p className="text-sm">Advanced algorithms for accurate compatibility</p>
              </div>
              <div className="p-4 bg-pink-500/10 rounded-lg">
                <Flower2 className="text-pink-400 mb-2" />
                <h3 className="font-bold mb-2">Zodiac Insights</h3>
                <p className="text-sm">Astrological compatibility analysis</p>
              </div>
            </div>
          </motion.div>
        );
      
      case 'stories':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto bg-black/30 p-8 rounded-2xl backdrop-blur-lg border border-pink-500/30"
          >
            <h2 className="text-2xl font-bold mb-4 text-pink-400">Love Stories</h2>
            {!showLoveStory ? (
              <form onSubmit={handleStorySubmit} className="space-y-4">
                <textarea
                  placeholder="Share your love story..."
                  value={loveStory}
                  onChange={(e) => setLoveStory(e.target.value)}
                  className="cyber-input w-full h-32 resize-none"
                  required
                />
                <input
                  type="email"
                  placeholder="Your email for replies..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cyber-input w-full"
                  required
                />
                <button
                  type="submit"
                  className="cyber-button w-full"
                >
                  <PartyPopper className="inline-block mr-2" size={16} />
                  Share Your Story
                </button>
              </form>
            ) : (
              <div className="text-center">
                <PartyPopper className="text-pink-400 mx-auto mb-4" size={32} />
                <p className="text-lg mb-4">Thank you for sharing your story! ❤️</p>
                <button
                  onClick={() => {
                    setShowLoveStory(false);
                    setLoveStory('');
                    setEmail('');
                  }}
                  className="cyber-button"
                >
                  Share Another Story
                </button>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-pink-400">Recent Love Stories</h3>
              <div className="space-y-4">
                {sharedStories.map((story, index) => (
                  <div key={index} className="p-4 bg-pink-500/10 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">Shared by {story.author} on {new Date(story.date).toLocaleDateString()}</p>
                    <p className="text-gray-300">{story.story}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'memory-book':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto bg-black/30 p-8 rounded-2xl backdrop-blur-lg border border-pink-500/30"
          >
            <h2 className="text-2xl font-bold mb-4 text-pink-400 flex items-center gap-2">
              <Camera />
              Digital Memory Book
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {memories.map((memory: { id: Key | null | undefined; image: string | undefined; }) => (
                <div key={memory.id} className="relative aspect-square bg-pink-500/10 rounded-lg overflow-hidden">
                  <img 
                    src={memory.image} 
                    alt="Memory" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeMemory(memory.id)}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              ))}
              <div className="aspect-square bg-pink-500/10 rounded-lg flex items-center justify-center">
                <label className="cyber-button cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload size={24} />
                  <span className="block mt-2">Add Memory</span>
                </label>
              </div>
            </div>
          </motion.div>
        );
      
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-black/30 p-8 rounded-2xl backdrop-blur-lg border border-pink-500/30"
          >
            <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              Cyber Love Calculator
            </h1>

            <div className="love-quote text-center mb-6">
              {loveQuotes[currentQuote]}
            </div>

            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className="cyber-input w-full"
                />
                <select
                  value={birthMonth1}
                  onChange={(e) => setBirthMonth1(Number(e.target.value))}
                  className="cyber-input w-full mt-2"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(2024, i).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>

              <div>
              <input
                  type="text"
                  placeholder="Your Crush Name"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className="cyber-input w-full"
                />
                <select
                  value={birthMonth2}
                  onChange={(e) => setBirthMonth2(Number(e.target.value))}
                  className="cyber-input w-full mt-2"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(2024, i).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleCalculate}
                disabled={!name1 || !name2 || isCalculating}
                className="cyber-button w-full"
              >
                {isCalculating ? (
                  <RefreshCw className="animate-spin mx-auto" />
                ) : (
                  'Calculate Love'
                )}
              </button>

              <AnimatePresence>
                {result !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center space-y-4"
                  >
                    <div className="holographic-sphere mx-auto flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl font-bold"
                      >
                        {result}%
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="text-lg font-medium"
                    >
                      {getLoveMessage(result)}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="compatibility-chart"
                    >
                      <div className="compatibility-item">
                        <Star className="text-yellow-500" />
                        <span>Zodiac Compatibility:</span>
                      </div>
                      <div className="compatibility-item">
                        <span>{calculateZodiacCompatibility(birthMonth1, birthMonth2)}</span>
                      </div>
                      <div className="compatibility-item">
                        <Heart className="text-pink-500" />
                        <span>Romance Level:</span>
                      </div>
                      <div className="compatibility-item">
                        <span>{"❤️".repeat(Math.ceil(result / 20))}</span>
                      </div>
                    </motion.div>

                    {showTips && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="love-tip text-sm"
                      >
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                          <Sparkles className="text-pink-500" />
                          Love Tips for {name1} & {name2}
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Calendar className="text-pink-400" size={16} />
                            Plan regular date nights
                          </li>
                          <li className="flex items-center gap-2">
                            <MessageHeart className="text-pink-400" size={16} />
                            Express your feelings often
                          </li>
                          <li className="flex items-center gap-2">
                            <Gift className="text-pink-400" size={16} />
                            Surprise each other with small gestures
                          </li>
                        </ul>
                      </motion.div>
                    )}

                    <motion.div
                      className="flex justify-center gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    >
                      <button
                        onClick={handleShare}
                        className="cyber-button flex items-center gap-2"
                      >
                        <Share2 size={20} />
                        Share
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className={`min-h-screen bg-gray-900 text-white relative overflow-hidden flex flex-col ${selectedTheme}`}>
      {/* <nav className="bg-black/50 backdrop-blur-sm border-b border-pink-500/30 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="text-pink-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              CyberLove
            </span>
          </div>
          <div className="flex gap-6">
            <button 
              onClick={() => setActiveSection('calculator')}
              className={`nav-link flex items-center gap-1 ${activeSection === 'calculator' ? 'text-pink-400' : ''}`}
            >
              <HomeIcon size={16} />
              Calculator
            </button>
            <button 
              onClick={() => setActiveSection('about')}
              className={`nav-link flex items-center gap-1 ${activeSection === 'about' ? 'text-pink-400' : ''}`}
            >
              <Info size={16} />
              About
            </button>
            <button 
              onClick={() => setActiveSection('stories')}
              className={`nav-link flex items-center gap-1 ${activeSection === 'stories' ? 'text-pink-400' : ''}`}
            >
              <BookHeart size={16} />
              Stories
            </button>
            <button 
              onClick={() => setActiveSection('memory-book')}
              className={`nav-link flex items-center gap-1 ${activeSection === 'memory-book' ? 'text-pink-400' : ''}`}
            >
              <Camera size={16} />
              Memory
            </button>
          </div>
        </div>
      </nav> */}

<Navbar setActiveSection={setActiveSection} activeSection={activeSection} />

      <main className="flex-grow container mx-auto px-4 py-12">
        {renderSection()}
      </main>

      <footer className="bg-black/50 backdrop-blur-sm border-t border-pink-500/30 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Heart className="text-pink-500" />
                CyberLove
              </h3>
              <p className="text-sm text-gray-300">
                Discover your love compatibility in the digital age.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveSection('stories')} 
                    className="footer-link text-sm flex items-center gap-2"
                  >
                    <Star size={16} />
                    Love Stories
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection('tips')} 
                    className="footer-link text-sm flex items-center gap-2"
                  >
                    <Coffee size={16} />
                    Relationship Tips
                  </button>
                </li>
                <li>
                  <a 
                    href="https://open.spotify.com/playlist/37i9dQZF1DX7rOY2tZUw1k" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="footer-link text-sm flex items-center gap-2"
                  >
                    <Music size={16} />
                    Love Songs Playlist
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/sudhaanshuu" className="footer-link">
                  <Github />
                </a>
                <a href="mailto:sudhaanshuu@gmail.com" className="footer-link">
                  <Mail />
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-300">
                Created with 💖 by Sudhanshu
              </p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-pink-500/30 text-center text-sm text-gray-400">
            © 2025 CyberLove. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;