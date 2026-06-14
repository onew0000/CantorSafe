import { motion } from 'motion/react';
import { TriangleAlert, BookOpen, ChevronRight, GraduationCap } from 'lucide-react';
import { TabId } from '../types';

interface IntroViewProps {
  setActiveTab: (tab: TabId) => void;
}

export default function IntroView({ setActiveTab }: IntroViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-4xl mx-auto px-6 md:px-10 pb-24 pt-12 text-[#e0e3e5]"
    >
      {/* Editorial Header */}
      <section className="text-center py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none bg-radial from-[#7bd0ff] to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-[#7bd0ff] mb-4 block">
            SECTION 01 / FORMAL INTRODUCTION
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#e0e3e5] tracking-tight leading-tight mb-8">
            AI Safety Alignment:<br />The Cantor Hypothesis
          </h2>
          <div className="h-[1px] w-24 bg-[#bec6e0] mx-auto mb-10" />
        </div>
      </section>

      {/* Exploration Motive (탐구 동기) */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/4">
            <h3 className="text-xl font-serif text-[#bec6e0] tracking-wide sticky top-24">
              탐구 동기
            </h3>
            <p className="text-[11px] font-mono text-[#909097] tracking-wider mt-1 uppercase">
              MOTIVATION
            </p>
          </div>
          <div className="md:w-3/4 space-y-6 text-base md:text-lg leading-relaxed text-left text-justify text-justified select-text">
            <p className="text-[#e0e3e5]/95">
              2024년 이후 <strong className="text-[#7bd0ff] font-semibold">ChatGPT, Claude, Gemini</strong> 등 대규모 언어모델이 일상에 깊이 들어오며, 이 모델들이 유해한 답변을 생성하는 사례가 꾸준히 보도되고 있다. 특히 <span className="italic text-[#bec6e0] border-b border-[#bec6e0]/30 pb-[1px]">탈옥(Jailbreaking)</span>이라 불리는 일련의 기법들을 통하여 모델들의 안전장치를 우회하는 문제는 AI 기업들의 최우선 해결 과제로 부상했다.
            </p>
            
            <div className="proof-indent border-l border-[#45464d] bg-[#1d2022]/40 pl-6 py-5 my-6 rounded-r">
              <p className="mb-4 text-[#e0e3e5]/90 italic">
                평소 수학에 흥미를 가지고 다양한 이론을 접하던 중 <strong>칸토어 집합</strong>과 <strong>악마의 계단</strong>이라고도 불리는 병리적 함수의 일종인 <strong>칸토어 함수</strong>를 접하게 되었다. 칸토어 집합과 칸토어 함수의 수학적 의미를 찾아보고 공부하며 이 함수의 독특한 성질에 강한 호기심을 느꼈다.
              </p>
              <div className="font-mono text-xs bg-[#1d2022] p-4 border border-[#45464d]/60 text-[#7bd0ff] rounded tracking-wider flex items-center justify-between">
                <span>∇f(x) = 0 almost everywhere, yet f(0) = 0 and f(1) = 1.</span>
                <span className="text-[10px] text-[#909097] uppercase">Math Theorem</span>
              </div>
            </div>

            <p className="text-[#e0e3e5]/90">
              거의 모든 곳에서 도함수가 0이면서도 0에서 1까지 연속적으로 증가하는 이 함수가, 거의 모든 상황에서 안정적이면서 극히 미세한 경계에서도 판단이 전환되는 이상적인 인공지능 안전 필터와 구조적으로 닮아있다는 생각이 들었다. 이에 미적분 교과에서 배운 도함수, 정적분 등의 개념을 활용하여 칸토어 함수가 인공지능 정렬 문제에 어떻게 수학적으로 기여할 수 있는지에 대하여 탐구해보고자 한다.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-[#45464d] opacity-30 mb-16" />

      {/* Problem Statement Card (탐구 필요성) */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          <div className="md:w-1/4">
            <h3 className="text-xl font-serif text-[#bec6e0] tracking-wide">
              탐구 필요성
            </h3>
            <p className="text-[11px] font-mono text-[#909097] tracking-wider mt-1 uppercase">
              NECESSITY
            </p>
          </div>
          
          <div className="md:w-3/4">
            <div className="bg-[#1d2022] p-8 md:p-10 border-l-4 border-[#ffb95f] relative overflow-hidden group hover:bg-[#272a2c] transition-all duration-500 rounded-r shadow-md">
              {/* Abstract Background Pattern */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(#45464d 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 text-[#ffb95f] mb-6">
                  <TriangleAlert className="w-5 h-5" />
                  <span className="font-mono text-[11px] uppercase tracking-widest">
                    Structural Limitations Detected
                  </span>
                </div>
                
                <h4 className="text-2xl font-serif text-[#e0e3e5] mb-6">
                  RLHF & DPO의 한계점
                </h4>
                
                <div className="space-y-6 text-[#c6c6cd]">
                  <p className="text-justify leading-relaxed text-sm md:text-base">
                    현재 인공지능 정렬 기법의 대부분은 학습 데이터를 통한 통계적 접근인 <strong>RLHF (Reinforcement Learning from Human Feedback)</strong>, <strong>DPO (Direct Preference Optimization)</strong> 등의 기법에 의존한다. 이러한 통계적 접근은 본질적으로 다음과 같은 약점들을 지니고 있다.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="border-t border-[#45464d] pt-4">
                      <h5 className="font-mono text-xs text-[#7bd0ff] mb-2 uppercase tracking-wide">
                        Vulnerability (취약성)
                      </h5>
                      <p className="text-xs text-[#c6c6cd] italic leading-normal">
                        시스템 학습 데이터에 존재하지 않는 새로운 유형의 탈옥 시나리오나 유해 위협에 매우 취약하다는 구조적 한계를 지닌다.
                      </p>
                    </div>
                    <div className="border-t border-[#45464d] pt-4">
                      <h5 className="font-mono text-xs text-[#7bd0ff] mb-2 uppercase tracking-wide">
                        Analytical Solution (대안)
                      </h5>
                      <p className="text-xs text-[#c6c6cd] italic leading-normal">
                        수학적 대수 구조 및 미적분적 필터에 기반한 정렬 메커니즘은 표본 데이터에 전적으로 의존하지 않으므로 이러한 근본적 한계를 성공적으로 보완할 수 있다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button 
                    onClick={() => setActiveTab('MATH')}
                    className="flex items-center gap-2 px-5 py-2.5 border border-[#bec6e0] text-[#bec6e0] font-mono text-[11px] uppercase tracking-widest hover:bg-[#bec6e0] hover:text-[#101415] transition-all cursor-pointer rounded-sm active:scale-95 duration-200"
                  >
                    Analyze Mathematical Core
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Image Placement */}
      <section className="mt-16">
        <div className="aspect-[16/7] w-full bg-[#1d2022] overflow-hidden rounded border border-[#45464d] relative group">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuABSZ28TW1hhoqEu3BqP0j499tdv_SkcRHGZed3Hb8ybjrnNtpKRQSeOcxM2A0puQikBuuGrFvvwEk6OpunSythwl4k7fkM_fmzezL62lXbVssyKTheX-UjEAxH8pwv7bG04R1Ro51lYC3a2fk7Bfch4nl9NEI1sc2svUwPo5AKC6VL5wn4UUzuhD13mbiFQ-D4-rUKSsI2lwz8ckxpdFpiXhI364jyINmJ-w5P28gYFNQbXzUMKWOJItRkUolfiR83BeOiv-_Zo8Sc" 
            alt="Mathematical formulas" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-45 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101415] to-transparent opacity-75" />
          
          <div className="absolute bottom-6 left-6 md:bottom-8 md:on-left-8">
            <p className="font-mono text-[#bec6e0] text-[10px] tracking-[0.4em] mb-2 uppercase">
              FIGURE 1.1
            </p>
            <p className="text-xl md:text-2xl font-serif text-[#e0e3e5]">
              The Topology of Ethics
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
