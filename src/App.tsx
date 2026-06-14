import { useState, useEffect } from 'react';
import { TabId } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import IntroView from './components/IntroView';
import MathView from './components/MathView';
import SimView from './components/SimView';
import EndView from './components/EndView';
import SettingsModal from './components/SettingsModal';
import { Smartphone, Monitor, Wifi, Battery, Signal, Info } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('INTRO');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isMobileMode, setIsMobileMode] = useState<boolean>(true); // Defaults to mobile viewer state on first load!
  const [currentTime, setCurrentTime] = useState<string>('12:00');

  // Realistic dynamic clock for simulated smartphone status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-screen bg-[#0b0c0d] text-[#e0e3e5] flex flex-col font-sans selection:bg-[#7bd0ff]/20 selection:text-[#7bd0ff] select-text overflow-x-hidden relative">
      
      {/* Dynamic Background Pattern on Desktop when in Mobile View to feel like a high-end Workspace */}
      {isMobileMode && (
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none hidden md:block z-0" 
          style={{
            backgroundImage: 'radial-gradient(#bec6e0 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}
        />
      )}

      {/* RENDER MODE: Mobile View Mock Frame in Desktop Size */}
      {isMobileMode ? (
        <div className="flex-grow flex flex-col md:flex-row md:items-center md:justify-center p-4 md:p-8 gap-8 max-w-7xl mx-auto w-full z-10">
          
          {/* Left Panel: Desktop Controls Deck */}
          <section className="hidden md:flex flex-col gap-5 w-80 shrink-0 text-left bg-[#131618] border border-[#2d2f34] p-6 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-[#2d2f34] text-[#7bd0ff]">
              <Smartphone className="w-5 h-5" />
              <h3 className="font-serif text-sm tracking-widest font-bold uppercase">
                Device Simulator
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-[#909097] leading-relaxed">
                현재 <strong className="text-[#e0e3e5]">CANTOR_SAFE 모바일 뷰어 모드</strong>가 기본 활성화 상태입니다. 실제 스마트폰 크기에서 구현되는 레이아웃과 햅틱 내비게이션, 프랙탈 역학 변화를 대화형으로 테스트해 보세요.
              </p>

              {/* Interactive toggle switch for layout */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#909097] block">
                  뷰어 선택 (Viewer Mode)
                </span>
                <div className="grid grid-cols-2 gap-2 bg-[#1b1e20] p-1 rounded-lg border border-[#2c2f34]">
                  <button
                    onClick={() => setIsMobileMode(true)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-[10px] font-mono uppercase rounded-md transition-all font-bold bg-[#7bd0ff] text-[#101415] shadow-sm"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    Mobile
                  </button>
                  <button
                    onClick={() => setIsMobileMode(false)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-[10px] font-mono uppercase rounded-md transition-all text-[#909097] hover:text-[#e0e3e5] hover:bg-white/5"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    Desktop
                  </button>
                </div>
              </div>

              {/* Mobile device properties */}
              <div className="pt-4 border-t border-[#2d2f34] space-y-2 text-[11px] font-mono text-[#909097]">
                <div className="flex justify-between">
                  <span>Simulated Screen:</span>
                  <span className="text-[#bec6e0]">Standard Mobile</span>
                </div>
                <div className="flex justify-between">
                  <span>Device Aspect:</span>
                  <span className="text-[#bec6e0]">19.5 : 9 Retina</span>
                </div>
                <div className="flex justify-between">
                  <span>Frame Rate:</span>
                  <span className="text-[#34d399] animate-pulse">● 60 FPS Locked</span>
                </div>
                <div className="flex justify-between">
                  <span>Network Carrier:</span>
                  <span className="text-[#7bd0ff] font-sans font-bold">DSHS 5G Safe</span>
                </div>
              </div>

              {/* Quick tip info card */}
              <div className="p-3.5 bg-[#0f172a] border border-[#7bd0ff]/20 rounded-xl flex gap-2.5 items-start mt-4">
                <Info className="w-4 h-4 text-[#7bd0ff] shrink-0 mt-0.5" />
                <p className="text-[10px] text-[#798098] leading-relaxed text-justify">
                  화면을 아래로 스크롤하여 칸토어 함수의 수학적 도함수 및 3차, 5차 필터가 적용된 Neural ODE 안전도 검증 결과를 탐색하실 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* Center Space: Sleek Smartphone Bezel Body (Falls back to full width naturally on actual mobile screens) */}
          <div className="w-full md:w-[385px] h-full md:h-[824px] bg-[#1d2022] md:border-8 md:border-[#2d2f34] md:rounded-[48px] relative md:shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col md:overflow-hidden select-none shrink-0 border-none rounded-none shadow-none">
            
            {/* Front Camera Notch (Dynamic Island Accent - Hidden on small mobile screens to save space) */}
            <div className="hidden md:block absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6.5 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-[#0a0a14] rounded-full absolute right-4 border border-white/5 shadow-inner" />
            </div>

            {/* Simulated Digital Status Bar Overlay (Only displayed inside simulated device wrapper on desktop sizes) */}
            <header className="hidden md:flex justify-between items-center px-6 pt-3 pb-1 bg-[#101415] text-[#e0e3e5] text-xs font-mono select-none z-40 h-10 border-b border-[#2d2f34]/30">
              <span className="font-bold text-[10px] tracking-tight">{currentTime}</span>
              <div className="flex items-center gap-2 text-[#909097]">
                <Signal className="w-3.5 h-3.5 text-[#e0e3e5]/70" />
                <span className="text-[8px] font-bold tracking-tighter">5G</span>
                <Wifi className="w-3.5 h-3.5 text-[#e0e3e5]/70" />
                <Battery className="w-4 h-4 text-[#34d399]" />
              </div>
            </header>

            {/* Inner Mobile Device Frame Core Layout (Scrollable container representing actual application viewport) */}
            <div className="flex-grow overflow-hidden relative flex flex-col h-full bg-[#101415]">
              
              {/* Internal Scrollable Content Space */}
              <div className="flex-grow overflow-y-auto h-full flex flex-col relative pb-[80px]">
                {/* Embedded App Header */}
                <Header 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  onOpenSettings={() => setIsSettingsOpen(true)}
                  isMobileMode={true}
                />
                
                {/* Dynamically Loaded Component Views */}
                <div className="flex-grow">
                  {renderView()}
                </div>
              </div>

              {/* Absolute Navigation Tab Bar inside Device */}
              <Footer activeTab={activeTab} setActiveTab={setActiveTab} isMobileMode={true} />
            </div>

            {/* iOS System Home Bar Indicator Overlay (Subtle line lock) */}
            <div className="hidden md:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-50 pointer-events-none" />
          </div>

          {/* Mobile Viewer Mode instructions bottom callout on small viewports */}
          <div className="block md:hidden text-center text-[10px] font-mono text-[#909097] mt-8 bg-[#131618] border border-[#2d2f34] p-3 rounded-lg w-full">
            📱 Native Handheld Mobile Client detected
          </div>
        </div>
      ) : (
        /* RENDER MODE: Original Responsive Desktop Viewport */
        <div className="flex-grow flex flex-col z-10">
          {/* Global Academic Header with Full Desktop Wide navigation */}
          <Header 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onOpenSettings={() => setIsSettingsOpen(true)}
            isMobileMode={false}
          />

          {/* Primary Responsive Dynamic Content Frame */}
          <main className="flex-grow pb-16 md:pb-8">
            {renderView()}
          </main>

          {/* Global Sticky Footer for wide layouts */}
          <Footer activeTab={activeTab} setActiveTab={setActiveTab} isMobileMode={false} />

          {/* Floating Workspace Mode Switch Controller on the bottom right */}
          <div className="fixed bottom-6 right-6 z-50 flex items-center bg-[#131618] border border-[#2d2f34] p-1.5 rounded-full shadow-2xl">
            <button
              onClick={() => setIsMobileMode(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-mono font-bold uppercase rounded-full text-[#909097] hover:text-[#e0e3e5] transition-all"
            >
              <Smartphone className="w-3.5 h-3.5" />
              Toggle Mobile View
            </button>
          </div>
        </div>
      )}

      {/* Background Academic Overlay Details details */}
      <div 
        className="fixed bottom-4 left-6 hidden md:block font-mono text-[9px] text-[#909097] uppercase tracking-[0.2em] pointer-events-none select-none z-40 bg-[#0b0c0d]/80 px-2 py-1.5 rounded border border-[#2d2f34]/40"
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
