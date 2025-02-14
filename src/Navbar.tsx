import { useState } from 'react';
import { Heart, HomeIcon, Info, BookHeart, Camera, Menu, X } from 'lucide-react';

const Navbar = ({ setActiveSection, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/50 backdrop-blur-sm border-b border-pink-500/30 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="text-pink-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            CyberLove
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-pink-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <NavItem setActiveSection={setActiveSection} activeSection={activeSection} section="calculator" icon={HomeIcon} label="Calculator" isMobile={undefined} />
          <NavItem setActiveSection={setActiveSection} activeSection={activeSection} section="about" icon={Info} label="About" isMobile={undefined} />
          <NavItem setActiveSection={setActiveSection} activeSection={activeSection} section="stories" icon={BookHeart} label="Stories" isMobile={undefined} />
          <NavItem setActiveSection={setActiveSection} activeSection={activeSection} section="memory-book" icon={Camera} label="Book" isMobile={undefined} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-black/80 backdrop-blur-md p-4 rounded-lg">
          <NavItem setActiveSection={setActiveSection} activeSection={activeSection} section="calculator" icon={HomeIcon} label="Calculator" isMobile />
          <NavItem setActiveSection={setActiveSection} activeSection={activeSection} section="about" icon={Info} label="About" isMobile />
          <NavItem setActiveSection={setActiveSection} activeSection={activeSection} section="stories" icon={BookHeart} label="Love Stories" isMobile />
          <NavItem setActiveSection={setActiveSection} activeSection={activeSection} section="memory-book" icon={Camera} label="Memory Book" isMobile />
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ setActiveSection, activeSection, section, icon: Icon, label, isMobile }) => (
  <button
    onClick={() => setActiveSection(section)}
    className={`flex items-center gap-2 p-2 w-full ${activeSection === section ? 'text-pink-400' : 'text-white'}`}
  >
    <Icon size={isMobile ? 20 : 16} />
    {label}
  </button>
);

export default Navbar;
