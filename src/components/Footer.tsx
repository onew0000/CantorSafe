import { BookOpen, Sigma, Activity, ShieldCheck } from 'lucide-react';
import { TabId } from '../types';

interface FooterProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  isMobileMode?: boolean;
}

export default function Footer({ activeTab, setActiveTab, isMobileMode }: FooterProps) {
  const navItems = [
    { id: 'INTRO' as TabId, label: 'Intro', icon: BookOpen },
    { id: 'MATH' as TabId, label: 'Math', icon: Sigma },
    { id: 'SIM' as TabId, label: 'Sim', icon: Activity },
    { id: 'END' as TabId, label: 'End', icon: ShieldCheck },
  ];

  return (
    <footer className={`${isMobileMode ? 'absolute bottom-0 left-0 border-t' : 'fixed bottom-0 left-0 md:hidden'} w-full bg-[#1d2022] border-[#45464d] px-4 pb-5 pt-2 flex justify-around items-center z-50 shadow-lg`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center pt-2 transition-all duration-300 w-16 ${
              isActive 
                ? 'text-[#7bd0ff] border-t-2 border-[#7bd0ff] -mt-[2px]' 
                : 'text-[#e0e3e5]/50 hover:text-[#7bd0ff] opacity-80'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase tracking-wider mt-1">{item.label}</span>
          </button>
        );
      })}
    </footer>
  );
}
