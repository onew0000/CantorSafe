import { Landmark, Settings, GraduationCap } from 'lucide-react';
import { TabId } from '../types';

interface HeaderProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  onOpenSettings: () => void;
  isMobileMode?: boolean;
}

export default function Header({ activeTab, setActiveTab, onOpenSettings, isMobileMode }: HeaderProps) {
  const tabs: { id: TabId; label: string }[] = [
    { id: 'INTRO', label: 'INTRO' },
    { id: 'MATH', label: 'MATH' },
    { id: 'SIM', label: 'SIM' },
    { id: 'END', label: 'END' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#45464d] bg-[#101415]/90 backdrop-blur-md px-6 md:px-10 py-4 flex justify-between items-center">
      <div 
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => setActiveTab('INTRO')}
      >
        <Landmark className="text-[#bec6e0] w-6 h-6 animate-pulse" />
        <h1 className="text-xl md:text-2xl font-serif font-semibold tracking-[0.25em] text-[#bec6e0]">
          CANTOR_SAFE
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        <nav className={`${isMobileMode ? 'hidden' : 'hidden md:flex'} gap-8 items-center`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs font-mono tracking-widest px-2 py-1 transition-all duration-300 relative ${
                activeTab === tab.id
                  ? 'text-[#7bd0ff] font-medium'
                  : 'text-[#e0e3e5]/60 hover:text-[#e0e3e5] hover:bg-white/5'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#7bd0ff]" />
              )}
            </button>
          ))}
        </nav>

        <button 
          onClick={onOpenSettings}
          className="p-2 text-[#e0e3e5]/80 hover:text-[#7bd0ff] hover:bg-white/5 transition-all rounded duration-200 active:scale-95 cursor-pointer"
          title="Core Details & Parameters"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
