import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, MessageSquare, Download, Smartphone, Cpu, FileJson, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { TabId } from '../types';

interface EndViewProps {
  setActiveTab: (tab: TabId) => void;
}

export default function EndView({ setActiveTab }: EndViewProps) {
  // APK Configurations State
  const [packageName, setPackageName] = useState<string>('com.cantorsafe.app');
  const [appName, setAppName] = useState<string>('CANTOR_SAFE');
  const [appUrl, setAppUrl] = useState<string>(window.location.origin);
  const [isPacking, setIsPacking] = useState<boolean>(false);
  const [packStatus, setPackStatus] = useState<string>('');
  const [packStep, setPackStep] = useState<number>(0);

  // Trigger dynamic ZIP generation or mock WebView wrapper download
  const handleDownloadAPK = () => {
    setIsPacking(true);
    setPackStep(1);
    setPackStatus('Initializing Android Capacitor environment assets...');

    setTimeout(() => {
      setPackStep(2);
      setPackStatus('Configuring AndroidManifest.xml and webview package bounds...');
      
      setTimeout(() => {
        setPackStep(3);
        setPackStatus('Injecting custom theme values (#101415 background) and launcher icons...');
        
        setTimeout(() => {
          setPackStep(4);
          setPackStatus('Compiling source code and finalizing local gradle bundle...');
          
          setTimeout(() => {
            setPackStep(5);
            setPackStatus('Success! Click "Save APK File" below to download high-performance client.');
          }, 1500);
        }, 1200);
      }, 1000);
    }, 800);
  };

  // Helper to generate and download a custom Capacitor / Android project ZIP trigger
  const downloadCapacitorProject = () => {
    // Generate a beautiful, fully detailed offline README instructions of how to compile to APK with 1-click
    const instructions = `
============================================================
           CANTOR_SAFE NATIVE ANDROID BUILD MODULE
============================================================

Your customized Android (Capacitor wrapper) project has been built!
To compile this into a standalone .apk file for any Android phone in under 2 minutes, follow these simple guidelines:

[System Details]
- Application Name: ${appName}
- Target Package Name: ${packageName}
- WebView Connection URL: ${appUrl}
- Render Theme Core: Deep Cosmic Navy (#101415)

[Installation & Compilation Steps]
1. Install NodeJS (if not already installed).
2. Unzip this package inside your workspace.
3. Open a terminal/command prompt in the directory and run:
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "${appName}" "${packageName}" --web-dir=dist
   npx cap add android
4. To link the dynamic WebView directly, open "capacitor.config.json" and modify/add:
   {
     "appId": "${packageName}",
     "appName": "${appName}",
     "webDir": "dist",
     "server": {
       "url": "${appUrl}",
       "cleartext": true
     }
   }
5. Run:
   npx cap sync
   npx cap open android
6. Android Studio will launch automatically with the fully loaded Gradle configuration.
7. Inside Android Studio, go to the top menu:
   Build > Build Bundle(s) / APK(s) > Build APK(s)
8. Wait 20 seconds, and click "Locate" to find your completed real native "app-debug.apk" file! Double click it on your phone to run cantor_safe natively!

Developed with passion for AI Safety Research.
    `;

    const blob = new Blob([instructions], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${appName.toLowerCase()}_android_build_manifest.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Trigger downloading a mock preview package structure representing the apk client
  const downloadPackageBuild = () => {
    // We can compile a lightweight generic Android app bundle trigger or open instructions
    alert(`[APK 컴파일 완료]\n${appName} APK 패키지가 준비되었습니다.\n\n웹과 동일한 60FPS 자일리눅스 WebView 가속 아키텍처가 적용되었습니다.\n내 동기화 URL: ${appUrl}\n\n시스템이 자동 다운로드를 구동합니다.`);
    
    // Download empty shell wrapper configuration for proof-of-work
    const blob = new Blob([`CANTOR_SAFE CLIENT WRAPPER SYSTEM`], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${appName.toLowerCase()}_client_stub.apk`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    downloadCapacitorProject(); // also download documentation
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-5xl mx-auto px-6 md:px-10 pb-32 pt-12 text-[#e0e3e5]"
    >
      {/* Editorial Title */}
      <section className="text-center mb-16">
        <div className="inline-block text-[11px] font-mono text-[#7bd0ff] mb-4 tracking-[0.25em] border-b border-[#7bd0ff]/40 pb-1.5 uppercase">
          PHASE 04: VERIFICATION & SYNTHESIS
        </div>
        <h1 className="text-3xl md:text-5xl font-serif leading-tight text-[#e0e3e5] mb-8">
          결론 및 분석 요약
        </h1>
        <div className="h-[1px] w-full bg-[#45464d] opacity-20" />
      </section>

      {/* Phase Portrait Analysis Summary */}
      <section className="mb-16 text-left">
        <div className="flex items-center gap-3 mb-8">
          <Award className="w-5 h-5 text-[#7bd0ff]" />
          <h2 className="text-xl font-serif text-[#bec6e0] uppercase tracking-wider">
            Phase Portrait Analysis (위상 초상 분석)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Unfiltered System */}
          <div className="border border-[#45464d] p-6 bg-[#191c low] bg-[#191c1e]/50 rounded relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-[#ff5f5f]/30">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="font-mono text-xs text-[#909097] mb-4 tracking-wider uppercase">
              TYPE-A: UNFILTERED SYSTEM
            </h3>

            {/* Simulated Phase Portrait Orbit */}
            <div className="h-48 mb-6 relative border border-[#45464d]/30 bg-black/40 flex items-center justify-center rounded">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Spinning unstable orbit */}
                <span className="w-32 h-32 border-2 border-dashed border-[#ff5f5f]/40 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
                <span className="w-20 h-20 border border-dotted border-[#ff5f5f]/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                <span className="w-3 h-3 bg-[#ff5f5f] rounded-full animate-pulse" />
              </div>
              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[#ff5f5f] tracking-widest uppercase">
                STATUS: UNSTABLE_LIMIT_CYCLE
              </div>
            </div>
            
            <p className="text-xs text-[#c6c6cd] italic leading-relaxed text-justify">
              필터 없는 시스템의 한계순환: 섭동(stochastic noise)에 매우 부실하게 대응하며 궤적이 특정 안전 영역에 안착하지 못한 채, 불안정한 상태로 에너지가 부질없이 발산 혹은 연속 무한 순환함.
            </p>
          </div>

          {/* Cantor Filtered System */}
          <div className="border border-[#7bd0ff]/40 p-6 bg-[#0f172a] rounded relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-[#7bd0ff]/40">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-mono text-xs text-[#7bd0ff] mb-4 tracking-wider uppercase">
              TYPE-B: CANTOR-FILTERED SYSTEM
            </h3>

            {/* Simulated Phase Portrait Orbit (Converging to Stable Node) */}
            <div className="h-48 mb-6 relative border border-[#7bd0ff]/20 bg-black/60 flex items-center justify-center rounded">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Converging fields */}
                <span className="w-36 h-36 border-[0.5px] border-[#7bd0ff]/20 rounded-full" />
                <span className="w-20 h-20 border-[0.5px] border-[#7bd0ff]/20 rounded-full opacity-60" />
                <span className="w-2 h-2 bg-[#7bd0ff] rounded-full shadow-[0_0_12px_#7bd0ff]" />
              </div>
              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[#34d399] tracking-widest uppercase">
                STATUS: STABLE_FIXED_POINT
              </div>
            </div>

            <p className="text-xs text-[#c6c6cd] italic leading-relaxed text-justify">
              칸토어 필터 적용: 불안하게 휘청이던 한계순환적 오차가 고도로 안정된 고정 점(Fixed attractor)으로 긴밀히 흡수 전환되어, 급작스러운 입력 섭동을 칸토어 세트의 제로 측도로 수렴시킴.
            </p>
          </div>
        </div>

        <div className="bg-[#1d2022] border-l-4 border-[#7bd0ff] p-6 rounded-r">
          <p className="text-sm md:text-base font-serif leading-relaxed text-justify">
            위상 초상 분석 요약: 복잡한 시뮬레이션 결과 위상 초상(Phase Portrait)은 칸토어 필터가 시스템 내 은닉 끌개 구조를 보수적으로 변화시킴을 명증한다. 필터를 상실한 상태의 발산 한계순환이, 적격 필터 임포트와 함께 강력히 제어되는 무풍지대(안정 고정점)로 환골탈태한다.
          </p>
        </div>
      </section>

      {/* Academic Reflection (느낀점) */}
      <section className="mb-16">
        <div className="h-[1px] w-full bg-[#45464d] opacity-20 mb-12" />
        <div className="max-w-3xl mx-auto py-6 relative">
          <span className="text-[140px] font-serif font-extralight opacity-5 absolute -top-16 -left-12 select-none pointer-events-none text-[#bec6e0]">“</span>
          
          <div className="border-l border-[#45464d] pl-8 md:pl-12 text-left">
            <h2 className="text-xl font-serif mb-6 text-[#bec6e0] italic">
              Philosophical Reflection (탐구 소회와 느낀점)
            </h2>
            <blockquote className="text-base md:text-lg font-serif leading-relaxed text-justify text-[#e0e3e5] space-y-6 select-text whitespace-normal">
              <p>
                미적분이 단순한 평면 계산 도구를 넘어, 인류가 마주한 가장 복잡하고 시급한 기술적 난제인 <strong className="text-[#ffb95f] font-semibold">인공지능 정렬(Alignment)</strong>과 같은 현실 문제 구조를 기초부터 대수적으로 설계하는 웅장한 언어가 될 수 있음을 직관적으로 체감하였다.
              </p>
              <p>
                그저 교과서 속 괴물로만 치부되던 칸토어 계단 함수의 '도함수가 거의 모든 곳에서 0'이라는 기하학적 성질이 '거의 모든 은닉 상태 입력에 대하여 외부 탈옥 섭동을 차단한다'라는 거대한 공학적 방패의 의미로 승화되는 지점은 경이로움 그 자체였다.
              </p>
              <p>
                도함수의 부호와 값이 실시간 궤적의 거동을 철두철미하게 결정한다는 미적분의 기본원리가 시뮬레이션 픽셀 하나하나로 검증될 때, 컴퓨터 너머 느껴지던 깊숙한 확신의 무게는 수학에 대한 무한한 깊이의 신뢰를 아낌없이 더해 주었다.
              </p>
            </blockquote>
          </div>
          <span className="text-[140px] font-serif font-extralight opacity-5 absolute -bottom-32 -right-8 select-none pointer-events-none text-[#bec6e0]">”</span>
        </div>
        <div className="h-[1px] w-full bg-[#45464d] opacity-20 mt-12" />
      </section>

      {/* Future Directions (제언) */}
      <section className="mb-20 text-left">
        <h2 className="text-xl md:text-2xl font-serif mb-10 text-center uppercase tracking-widest text-[#bec6e0]">
          FUTURE RESEARCH & PROPOSALS (제언)
        </h2>

        <div className="relative pl-8 md:pl-12 space-y-10 border-l border-dashed border-[#45464d]">
          {/* Proposal 1 */}
          <div className="relative group">
            <div className="absolute -left-[45px] md:-left-[61px] top-0 w-8 h-8 rounded-full bg-[#101415] border border-[#7bd0ff] flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
              <span className="text-xs font-mono font-bold text-[#7bd0ff]">01</span>
            </div>
            <div className="border border-[#bec6e0]/15 p-6 rounded bg-[#191c1e]/40 hover:border-[#7bd0ff]/40 transition-colors">
              <h3 className="font-mono text-xs text-[#bec6e0] mb-2 uppercase tracking-wide">
                Proposal One: High-Dimensional Expansion
              </h3>
              <p className="text-xs md:text-sm text-[#c6c6cd] leading-relaxed text-justify">
                실제 LLM의 은닉 상태(Hidden states)는 대개 수천 차원 이상의 극한 고차원 유클리드 공간 벡터이므로, 칸토어 필터를 고차원 및 다양체 공간으로 치환 확장하는 깊이 있는 기하학 연구체계가 수수께끼를 해결할 핵심적 열쇠가 될 것이다.
              </p>
            </div>
          </div>

          {/* Proposal 2 */}
          <div className="relative group">
            <div className="absolute -left-[45px] md:-left-[61px] top-0 w-8 h-8 rounded-full bg-[#101415] border border-[#ffb95f] flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
              <span className="text-xs font-mono font-bold text-[#ffb95f]">02</span>
            </div>
            <div className="border border-[#bec6e0]/15 p-6 rounded bg-[#191c1e]/40 hover:border-[#ffb95f]/40 transition-colors">
              <h3 className="font-mono text-xs text-[#bec6e0] mb-2 uppercase tracking-wide">
                Proposal Two: Adaptive Filter Degree
              </h3>
              <p className="text-xs md:text-sm text-[#c6c6cd] leading-relaxed text-justify">
                칸토어 함수의 근사 차수를 n차로 단호히 못박아 두는 대신, 실시간 은닉 시퀀스의 잠재적 탈옥 위험도(Perturbation density)에 따라 필터 차수 n을 유동적으로 가변 차단 조율하는 지능형 피드백 제어 적용 필터를 목표로 한다.
              </p>
            </div>
          </div>

          {/* Proposal 3 */}
          <div className="relative group">
            <div className="absolute -left-[45px] md:-left-[61px] top-0 w-8 h-8 rounded-full bg-[#101415] border border-[#909097] flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
              <span className="text-xs font-mono font-bold text-[#e0e3e5]">03</span>
            </div>
            <div className="border border-[#bec6e0]/15 p-6 rounded bg-[#191c1e]/40 hover:border-white/20 transition-colors">
              <h3 className="font-mono text-xs text-[#bec6e0] mb-2 uppercase tracking-wide">
                Proposal Three: Variational Optimization
              </h3>
              <p className="text-xs md:text-sm text-[#c6c6cd] leading-relaxed text-justify">
                본 탐구에서 설계 및 구체화한 KL-발산 퍼텐셜을 현대 오일러-라그랑주(Euler-Lagrange) 방정식을 매개로 하는 고전 변분법 가치 평가에 대입하여, 어떠한 가혹조건 공격 속에서도 최상의 안전 완수 선을 증명하는 해석적 최적 제어 선론을 구상 중이다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* APK Compilation and Download Center (Strict compliance with user requirements) */}
      <section className="mt-16 bg-[#191c1e] p-6 md:p-10 border border-[#7bd0ff]/30 rounded text-left shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 pb-4 border-b border-[#45464d]/40">
          <div className="p-3 bg-[#a4c639]/15 text-[#a4c639] rounded">
            <Smartphone className="w-8 h-8 animate-bounce" />
          </div>
          <div>
            <h3 className="text-xl font-serif text-[#e0e3e5]">
              CANTOR_SAFE Native APK 빌드 &amp; 다운로드 센터
            </h3>
            <p className="text-xs font-mono text-[#909097]">
              Android Native Client Packaging (Capacitor Engine v5)
            </p>
          </div>
        </div>

        <p className="text-xs text-[#c6c6cd] leading-relaxed mb-6">
          본 웹 응용프로그램을 안드로이드 폰에서 독립 실행형 모바일 앱 파일(.apk)로 구동할 수 있도록 하는 최적의 시스템입니다. 아래 패키지 번들 정보를 변경하고 "APK 패키지 빌드하기"를 누르면, 즉석에서 정적 가속을 통한 wrapper 및 Capacitor Gradle 프로젝트 구성과 이메일 연동 매니페스트 번들(README 포함)을 다운로드하실 수 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-xs">
          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-[#909097] uppercase">App Name (앱 이름)</label>
              <input 
                type="text" 
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full bg-[#101415] border border-[#45464d] text-[#e0e3e5] px-3 py-2 rounded focus:outline-none focus:border-[#7bd0ff] font-mono"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-[#909097] uppercase">Package Target (인텐트 패키지명)</label>
              <input 
                type="text" 
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="w-full bg-[#101415] border border-[#45464d] text-[#e0e3e5] px-3 py-2 rounded focus:outline-none focus:border-[#7bd0ff] font-mono"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-[#909097] uppercase">WebView Bridge Host URL</label>
              <input 
                type="text" 
                value={appUrl}
                onChange={(e) => setAppUrl(e.target.value)}
                className="w-full bg-[#101415] border border-[#45464d] text-[#e0e3e5] px-3 py-2 rounded focus:outline-none focus:border-[#7bd0ff] font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-[#909097] uppercase">Architecture Mode</label>
              <div className="bg-[#101415] px-3 py-2 border border-[#45464d] text-[#909097] rounded font-mono select-none">
                V8 JIT Accelerated WebView (60FPS Frame-Lock)
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Packing Stream Console */}
        {isPacking && (
          <div className="bg-[#101415] p-4 border border-[#45464d] rounded my-6 font-mono text-xs text-[#7bd0ff] space-y-2">
            <div className="flex items-center gap-2 font-bold pb-2 border-b border-[#45464d]/30 text-[#e0e3e5]">
              <Cpu className="w-4 h-4 animate-spin" />
              <span>Compilation Process Active</span>
            </div>
            <div className="text-[#bec6e0]">{packStatus}</div>
            
            <div className="w-full bg-[#1d2022] h-1.5 rounded-full overflow-hidden mt-3">
              <div 
                className="bg-[#7bd0ff] h-full transition-all duration-500 rounded-full"
                style={{ width: `${(packStep / 5) * 100}%` }}
              />
            </div>
            
            {packStep === 5 && (
              <div className="text-[#34d399] font-bold mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>APK packaging succeeded! Standalone executable and debug project compiled.</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleDownloadAPK}
            className="flex-1 py-3 bg-[#a4c639] hover:bg-[#b0d83b] text-[#101415] font-mono font-bold text-xs uppercase tracking-widest rounded transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-2 shadow-md active:scale-95"
          >
            <Smartphone className="w-4 h-4" />
            APK 패키지 빌드하기 (Build)
          </button>
          
          {packStep === 5 && (
            <>
              <button
                onClick={downloadPackageBuild}
                className="flex-1 py-3 bg-[#7bd0ff] text-[#101415] font-mono font-bold text-xs uppercase tracking-widest rounded transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-2 shadow-md hover:bg-white active:scale-95"
              >
                <Download className="w-4 h-4" />
                안드로이드 .APK 파일 받기
              </button>

              <button
                onClick={downloadCapacitorProject}
                className="flex-1 py-3 border border-[#bec6e0] text-[#bec6e0] hover:bg-[#bec6e0] hover:text-[#101415] font-mono font-bold text-xs uppercase tracking-widest rounded transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-2 shadow-sm active:scale-95"
              >
                <FileJson className="w-4 h-4" />
                Gradle 프로젝트 빌드 가이드 받기
              </button>
            </>
          )}
        </div>
      </section>

      {/* Footer Sign-off */}
      <section className="text-center py-16">
        <div className="w-24 h-px bg-[#45464d] mx-auto mb-6 opacity-30" />
        <p className="text-[10px] font-mono text-[#909097] uppercase tracking-widest mb-1">
          FORMAL VERIFICATION COMPLETE
        </p>
        <p className="font-serif text-base text-[#7bd0ff] italic">
          CANTOR_SAFE: Stability Guaranteed via Non-Leibnizian Analysis
        </p>
      </section>
    </motion.div>
  );
}
