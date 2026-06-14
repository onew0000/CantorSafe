import { useState } from 'react';
import { TabId } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import IntroView from './components/IntroView';
import MathView from './components/MathView';
import SimView from './components/SimView';
import EndView from './components/EndView';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('INTRO');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Render the current view depending on selected tab
  const renderView = () => {
    switch (activeTab) {
      case 'INTRO':
        return <IntroView setActiveTab={setActiveTab} />;
      case 'MATH':
        return <MathView setActiveTab={setActiveTab} />;
      case 'SIM':
        return <SimView setActiveTab={setActiveTab} />;
      case 'END':
        return <EndView setActiveTab={setActiveTab} />;
      default:
        return <IntroView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#101415] text-[#e0e3e5] flex flex-col font-sans selection:bg-[#7bd0ff]/20 selection:text-[#7bd0ff] select-text overflow-x-hidden">
      {/* Global Academic Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenSettings={() => setIsSettingsOpen(true)} 
      />

      {/* Primary Dynamic Content Frame */}
      <main className="flex-grow pb-16 md:pb-8">
        {renderView()}
      </main>

      {/* Global Interactive Navigation Footer */}
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Background Academic Overlay Details details */}
      <div 
        className="fixed bottom-4 left-6 hidden md:block font-mono text-[9px] text-[#909097] uppercase tracking-[0.2em] pointer-events-none select-none z-40"
      >
        Protocol Cantor v4.0.2 / Formal Synthesis
      </div>

      {/* Global settings modal documentation */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
}
