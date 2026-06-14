import { X, Book, Landmark, Github, Award } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101415]/85 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg bg-[#191c1e] border border-[#45464d] rounded-lg shadow-2xl overflow-hidden text-left"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="p-5 border-b border-[#45464d]/30 flex justify-between items-center bg-[#1d2022]">
          <div className="flex items-center gap-2 text-[#7bd0ff]">
            <Landmark className="w-5 h-5" />
            <h3 className="font-serif text-lg tracking-wider text-[#e0e3e5]">
              Document Metadata
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-[#e0e3e5]/60 hover:text-[#7bd0ff] hover:bg-white/5 rounded transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto font-sans">
          
          {/* Author info card */}
          <section className="bg-[#101415] border border-[#45464d]/40 p-4 rounded flex justify-between items-center text-xs">
            <div className="space-y-1">
              <span className="font-mono text-[#909097] text-[9px] uppercase tracking-wider block">School Registration ID</span>
              <p className="font-mono text-sm text-[#7bd0ff] font-semibold">30720</p>
            </div>
            
            <div className="space-y-1 text-right">
              <span className="font-mono text-[#909097] text-[9px] uppercase tracking-wider block">Primary Investigator</span>
              <p className="font-serif text-sm text-[#e0e3e5]">안재민 (Jaemin An)</p>
            </div>
          </section>

          {/* Research Topic */}
          <section className="space-y-2">
            <h4 className="font-mono text-xs text-[#7bd0ff] uppercase tracking-wider">Research Topic</h4>
            <div className="p-3 bg-[#1d2022] rounded border border-[#45464d]/25 text-xs text-[#c6c6cd] leading-relaxed text-justify">
              칸토어 계단 함수의 n차 근사를 활용한 Neural ODE 기반 윤리적 강건성 필터 설계 (Designing Mathematical Ethical Robustness Filters on Neural ODE Networks via Cantor Function Approximations)
            </div>
          </section>

          {/* Academic References */}
          <section className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#bec6e0] uppercase tracking-wide">
              <Book className="w-4 h-4 text-[#7bd0ff]" />
              <span>Academic References</span>
            </div>
            
            <ul className="space-y-3 text-[11px] text-[#909097] leading-relaxed list-inside list-disc">
              <li>
                <strong className="text-[#e0e3e5]">Chen, R. T., et al. (2018).</strong> "Neural Ordinary Differential Equations." <span className="italic">Advances in Neural Information Processing Systems</span>, 31.
              </li>
              <li>
                <strong className="text-[#e0e3e5]">Bai, Y., et al. (2022).</strong> "Constitutional AI: Harmlessness from AI Feedback." <span className="italic">Anthropic Technical Report</span>.
              </li>
              <li>
                <strong className="text-[#e0e3e5]">Dovgoshey, O., et al. (2006).</strong> "The Cantor Function." <span className="italic">Expositiones Mathematicae</span>, 24(1), 1-37.
              </li>
              <li>
                <strong className="text-[#e0e3e5]">Kullback, S., &amp; Leibler, R. A. (1951).</strong> "On Information and Sufficiency." <span className="italic">The Annals of Mathematical Statistics</span>, 22(1), 79-86.
              </li>
            </ul>
          </section>

          {/* System status */}
          <section className="pt-4 border-t border-[#45464d]/30 flex justify-between text-[10px] font-mono text-[#909097]">
            <span>App Version: Cantor v4.0.2</span>
            <span>Target OS: Android 12+ / WebView</span>
          </section>
        </div>

        <div className="p-4 border-t border-[#45464d]/20 bg-[#1d2022] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#bec6e0] text-[#101415] font-mono text-xs uppercase tracking-widest font-bold hover:bg-white rounded transition-all cursor-pointer"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
