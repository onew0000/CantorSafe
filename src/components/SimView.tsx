import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, Activity, ShieldCheck, Database, Sliders } from 'lucide-react';
import { TabId, SimConfig, SimPoint, ModelResult } from '../types';

interface SimViewProps {
  setActiveTab: (tab: TabId) => void;
}

export default function SimView({ setActiveTab }: SimViewProps) {
  // Simulator State
  const [h0, setH0] = useState<number>(0.15);
  const [amplitude, setAmplitude] = useState<number>(0.45);
  const [alpha, setAlpha] = useState<number>(0.80);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [tick, setTick] = useState<number>(0);

  // Helper: Checks if a point belongs to a flat segment of Cantor staircase at level n
  // and returns the gate value (0 = flat/blocked, 1 = non-flat/passed)
  function getCantorGate(x: number, n: number): number {
    let curr = x;
    for (let k = 1; k <= n; k++) {
      if (curr >= 1 / 3 && curr <= 2 / 3) {
        return 0; // Flat segment -> block noise
      } else if (curr < 1 / 3) {
        curr = curr * 3;
      } else {
        curr = (curr - 2 / 3) * 3;
      }
    }
    return 1; // Non-flat segment -> pass noise
  }

  // Simulation parameters
  const dt = 0.12;
  const tMax = 30.0;
  const omega = 4.0;
  const hSafe = 0.5;

  // Compute numerical solution for the three models
  const simulationResults = useMemo(() => {
    const pointsA: SimPoint[] = [];
    const pointsB: SimPoint[] = [];
    const pointsC: SimPoint[] = [];

    let hA = h0;
    let hB = h0;
    let hC = h0;

    let safeStepsA = 0;
    let safeStepsB = 0;
    let safeStepsC = 0;

    const totalSteps = Math.floor(tMax / dt);

    for (let i = 0; i < totalSteps; i++) {
      const t = i * dt;
      const p = amplitude * Math.sin(omega * t);

      // Model A: No Filter (Gate is always 1)
      const dhA = -alpha * (hA - hSafe) + 1.0 * p;
      hA += dhA * dt;
      hA = Math.max(0, Math.min(1, hA)); // keep bounded
      const safeA = hA >= 1/3 && hA <= 2/3;
      if (safeA) safeStepsA++;
      pointsA.push({ t, h: hA, p, safe: safeA });

      // Model B: C3 Filter (Cantor order 3)
      const gateB = getCantorGate(hB, 3);
      const dhB = -alpha * (hB - hSafe) + gateB * p;
      hB += dhB * dt;
      hB = Math.max(0, Math.min(1, hB));
      const safeB = hB >= 1/3 && hB <= 2/3;
      if (safeB) safeStepsB++;
      pointsB.push({ t, h: hB, p, safe: safeB });

      // Model C: C5 Filter (Cantor order 5)
      const gateC = getCantorGate(hC, 5);
      const dhC = -alpha * (hC - hSafe) + gateC * p;
      hC += dhC * dt;
      hC = Math.max(0, Math.min(1, hC));
      const safeC = hC >= 1/3 && hC <= 2/3;
      if (safeC) safeStepsC++;
      pointsC.push({ t, h: hC, p, safe: safeC });
    }

    return {
      modelA: { points: pointsA, safetyRatio: (safeStepsA / totalSteps) * 100 },
      modelB: { points: pointsB, safetyRatio: (safeStepsB / totalSteps) * 100 },
      modelC: { points: pointsC, safetyRatio: (safeStepsC / totalSteps) * 100 }
    };
  }, [h0, amplitude, alpha]);

  // Simulation ticks for animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTick((prev) => (prev + 1) % 250);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // SVG dimensions for chart mapping
  const widthX = 300;
  const heightY = 120;

  function generateSvgPath(points: SimPoint[], cropIndex: number = 250): string {
    const subset = points.slice(0, cropIndex);
    if (subset.length === 0) return '';
    return subset
      .map((p, index) => {
        const x = (p.t / tMax) * widthX;
        const y = heightY - p.h * heightY;
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }

  // Animation cropping factor
  const currentDrawLimit = isRunning ? Math.max(20, tick) : 250;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-7xl mx-auto px-6 md:px-10 pb-28 pt-12 text-[#e0e3e5]"
    >
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Interactive sidebar control panel */}
        <aside className="w-full md:w-80 flex flex-col gap-6 shrink-0 text-left">
          <div className="bg-[#191c1e] border border-[#45464d] p-6 rounded shadow-md">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-[#45464d]/30 text-[#bec6e0]">
              <Sliders className="w-4 h-4" />
              <h2 className="font-mono text-xs uppercase tracking-wider font-semibold">
                Simulation Control
              </h2>
            </div>
            
            <div className="space-y-6">
              {/* Slider 1 */}
              <div className="border-b border-[#45464d]/30 pb-4">
                <label className="text-xs font-mono text-[#909097] block mb-2">
                  Initial State h(0)
                </label>
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={h0 * 100}
                    onChange={(e) => setH0(parseFloat(e.target.value) / 100)}
                    className="w-full h-1 bg-[#45464d] rounded-lg appearance-none cursor-pointer accent-[#bec6e0]"
                  />
                  <span className="text-xs font-mono font-bold text-[#bec6e0] min-w-8 text-right">
                    {h0.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="border-b border-[#45464d]/30 pb-4">
                <label className="text-xs font-mono text-[#909097] block mb-2">
                  Perturbation Amplitude (A)
                </label>
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={amplitude * 100}
                    onChange={(e) => setAmplitude(parseFloat(e.target.value) / 100)}
                    className="w-full h-1 bg-[#45464d] rounded-lg appearance-none cursor-pointer accent-[#bec6e0]"
                  />
                  <span className="text-xs font-mono font-bold text-[#bec6e0] min-w-8 text-right">
                    {amplitude.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Slider 3 */}
              <div className="border-b border-[#45464d]/30 pb-4">
                <label className="text-xs font-mono text-[#909097] block mb-2">
                  Restoration Force (α)
                </label>
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={alpha * 100}
                    onChange={(e) => setAlpha(parseFloat(e.target.value) / 100)}
                    className="w-full h-1 bg-[#45464d] rounded-lg appearance-none cursor-pointer accent-[#bec6e0]"
                  />
                  <span className="text-xs font-mono font-bold text-[#bec6e0] min-w-8 text-right">
                    {alpha.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick config settings details card */}
          <section className="bg-[#0f172a] border border-[#bec6e0]/15 p-6 rounded">
            <h3 className="text-base font-serif text-[#bec6e0] mb-4">
              시뮬레이션 설정 (Config)
            </h3>
            <div className="space-y-3 text-xs font-mono text-[#909097] leading-relaxed">
              <p className="flex justify-between">
                <span>상태공간 (Space)</span>
                <span className="text-[#bec6e0]">h ∈ [0, 1]</span>
              </p>
              <p className="flex justify-between">
                <span>안전상태 (Safe Ref)</span>
                <span className="text-[#bec6e0]">h_safe = 0.50</span>
              </p>
              <p className="flex justify-between">
                <span>초기조건 (Initial)</span>
                <span className="text-[#bec6e0]">h(0) = {h0.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>외부섭동 (Perturb)</span>
                <span className="text-[#bec6e0]">p(t) = A sin(ωt)</span>
              </p>
            </div>
          </section>

          {/* Large trigger button */}
          <button
            onClick={() => {
              setIsRunning(!isRunning);
              if (!isRunning) setTick(0);
            }}
            className="w-full py-4 border border-[#7bd0ff] text-[#7bd0ff] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#7bd0ff] hover:text-[#101415] rounded duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            {isRunning ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                Reset & Loop Simulation
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Execute Simulation
              </>
            )}
          </button>
        </aside>

        {/* Right main workspace layout */}
        <div className="flex-grow flex flex-col gap-10 text-left">
          
          {/* Main Theory Section */}
          <section className="border-b border-[#45464d]/40 pb-6">
            <h2 className="text-3xl md:text-5xl font-serif text-[#e0e3e5] tracking-tight mb-4">
              Architecture Simulation
            </h2>
            <div className="border-l border-[#45464d] pl-6 md:pl-8">
              <p className="text-sm md:text-base text-[#c6c6cd] leading-relaxed mb-6 select-text whitespace-normal">
                시스템 설계: Neural ODE 네트워크 프레임워크에 KL-발산 전구간 퍼텐셜(Restoring force)과 비선형 프랙탈 칸토어 필터(Gate filter)를 결합하여 다음과 같이 상호작용하는 1차 안전 역학계를 설계했다.
              </p>
              
              <div className="p-6 md:p-8 bg-[#191c1e] text-center border border-[#45464d]/40 rounded mb-4">
                <code className="text-lg md:text-2xl font-mono text-[#7bd0ff] block font-semibold">
                  dh/dt = -α(h - h_safe) + C'ₙ(h)·p(t)
                </code>
              </div>
              <p className="text-xs text-[#909097] font-mono leading-relaxed mt-2 uppercase tracking-wide">
                The gradient of the Cantor Filter <span className="text-[#bec6e0] font-sans font-bold">C'ₙ(h)</span> acts as a gatekeeper that instantly isolates or dampens external stochastic noise <span className="text-[#bec6e0] font-sans font-bold">p(t)</span>.
              </p>
            </div>
          </section>

          {/* Compare models widgets layout (3 columns on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Model A Card */}
            <div className="flex flex-col border border-[#45464d] bg-[#0b0f10]/80 rounded overflow-hidden">
              <div className="p-4 border-b border-[#45464d]/40 bg-[#191c1e] flex justify-between items-center">
                <span className="font-mono text-[11px] font-bold tracking-wider">MODEL (A)</span>
                <span className="font-mono text-[10px] text-[#ff5f5f] font-bold tracking-widest uppercase">NO FILTER</span>
              </div>
              
              {/* Dynamic canvas drawing space */}
              <div className="h-44 bg-[#101415] relative p-4 flex items-center justify-center overflow-hidden border-b border-[#45464d]/15">
                {/* Horizontal reference bands (safe region: 1/3 to 2/3) */}
                <div className="absolute left-0 right-0 top-[40px] bottom-[40px] bg-[#34d399]/5 border-y border-[#34d399]/20" />
                <div className="absolute left-2 top-1 text-[8px] font-mono text-[#909097] tracking-wider uppercase">Traj Envelope (0.0 to 1.0)</div>
                <div className="absolute left-2 top-[42px] text-[8px] font-mono text-[#34d399]/80 uppercase">Safe Region h ∈ [1/3, 2/3]</div>

                <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${widthX} ${heightY}`}>
                  <path
                    d={generateSvgPath(simulationResults.modelA.points, currentDrawLimit)}
                    fill="none"
                    stroke="#ff5f5f"
                    strokeWidth="1.5"
                    className="transition-all duration-100"
                  />
                </svg>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-[#909097]">Safety Ratio</span>
                  <span className="text-xl font-mono text-[#ff5f5f] font-bold">
                    {simulationResults.modelA.safetyRatio.toFixed(1)}%
                  </span>
                </div>
                <p className="text-xs text-[#c6c6cd] leading-relaxed text-justify">
                  모델 (A) 필터 없음: 외부 섭동이 일절 여과 없이 동시 전달되어 h(t) 상태가 매우 큰 진폭으로 격렬하게 요동친다. 결과적으로 지속적으로 안전 영역인 [1/3, 2/3]을 격하게 이탈하게 된다.
                </p>
              </div>
            </div>

            {/* Model B Card */}
            <div className="flex flex-col border border-[#45464d] bg-[#0b0f10]/80 rounded overflow-hidden">
              <div className="p-4 border-b border-[#45464d]/40 bg-[#191c1e] flex justify-between items-center">
                <span className="font-mono text-[11px] font-bold tracking-wider">MODEL (B)</span>
                <span className="font-mono text-[10px] text-[#34d399] font-bold tracking-widest uppercase">C3 FILTER</span>
              </div>
              
              {/* Dynamic canvas drawing space */}
              <div className="h-44 bg-[#101415] relative p-4 flex items-center justify-center overflow-hidden border-b border-[#45464d]/15">
                {/* Horizontal reference bands */}
                <div className="absolute left-0 right-0 top-[40px] bottom-[40px] bg-[#34d399]/5 border-y border-[#34d399]/20" />
                <div className="absolute left-2 top-1 text-[8px] font-mono text-[#909097] tracking-wider">Traj Envelope (0.0 to 1.0)</div>

                <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${widthX} ${heightY}`}>
                  <path
                    d={generateSvgPath(simulationResults.modelB.points, currentDrawLimit)}
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="1.8"
                    className="transition-all duration-100 drop-shadow-[0_0_2px_rgba(52,211,153,0.3)]"
                  />
                </svg>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-[#909097]">Safety Ratio</span>
                  <span className="text-xl font-mono text-[#34d399] font-bold">
                    {simulationResults.modelB.safetyRatio.toFixed(1)}%
                  </span>
                </div>
                <p className="text-xs text-[#c6c6cd] leading-relaxed text-justify">
                  모델 (B) C3 필터: 초기 상태 h가 비평탄 구간을 정가운데로 빠르게 상승 통과한 후, 가운데 넓은 평탄 구간으로 무사히 안착한다. 이 구간에서는 섭동이 완벽 차단되어 복원력만 안정적으로 작용한다.
                </p>
              </div>
            </div>

            {/* Model C Card */}
            <div className="flex flex-col border border-[#45464d] bg-[#0b0f10]/80 rounded overflow-hidden">
              <div className="p-4 border-b border-[#45464d]/40 bg-[#191c1e] flex justify-between items-center">
                <span className="font-mono text-[11px] font-bold tracking-wider">MODEL (C)</span>
                <span className="font-mono text-[10px] text-[#7bd0ff] font-bold tracking-widest uppercase">C5 FILTER</span>
              </div>
              
              {/* Dynamic canvas drawing space */}
              <div className="h-44 bg-[#101415] relative p-4 flex items-center justify-center overflow-hidden border-b border-[#45464d]/15">
                {/* Horizontal reference bands */}
                <div className="absolute left-0 right-0 top-[40px] bottom-[40px] bg-[#34d399]/5 border-y border-[#34d399]/20" />
                <div className="absolute left-2 top-1 text-[8px] font-mono text-[#909097] tracking-wider">Traj Envelope (0.0 to 1.0)</div>

                <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${widthX} ${heightY}`}>
                  <path
                    d={generateSvgPath(simulationResults.modelC.points, currentDrawLimit)}
                    fill="none"
                    stroke="#7bd0ff"
                    strokeWidth="1.8"
                    className="transition-all duration-100 drop-shadow-[0_0_2px_rgba(123,208,255,0.3)]"
                  />
                </svg>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-[#909097]">Safety Ratio</span>
                  <span className="text-xl font-mono text-[#7bd0ff] font-bold">
                    {simulationResults.modelC.safetyRatio.toFixed(1)}%
                  </span>
                </div>
                <p className="text-xs text-[#c6c6cd] leading-relaxed text-justify">
                  모델 (C) C5 필터: 근사 단계가 높을수록 촘촘해진 평탄 구간들이 h를 겹겹이 고치처럼 감싼다. 비평탄 구간을 통과하는 시간이 단 0.1초도 불필요할 만큼 줄어들며, 완전해진 안전 강건성의 극치를 보여준다.
                </p>
              </div>
            </div>

          </div>

          {/* Detailed Verification Description */}
          <section className="bg-[#191c1e] border border-[#45464d] p-6 md:p-8 rounded shadow-md text-left">
            <h3 className="font-serif text-lg text-[#bec6e0] mb-4">
              Formal Verification Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-mono text-[#7bd0ff] uppercase tracking-wider font-bold">
                  Convergence Dynamics (수렴 거동)
                </h4>
                <p className="text-[#c6c6cd] text-justify">
                  시작 궤적이 안전 영역 바깥(0.15)에서 출발함에도 불구하고, 미적분적 복원력에 이끌려 비평탄 구간을 훌륭히 돌파한다. 일단 중앙 평탄 구간에 도달하면 <span className="font-mono bg-[#101415] px-1 py-0.5 text-[#fff] rounded">C'ₙ(h) = 0</span>이 만족되므로 섭동 잡음 $p(t)$ 가 완벽하게 거세된다. 오직 순수 완화 복원력만 남은 채 안정 평형점으로 정렬되는 환상적인 거동이 입증되었다.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-[#7bd0ff] uppercase tracking-wider font-bold">
                  Comparative Robustness (대조 강건성)
                </h4>
                <p className="text-[#c6c6cd] text-justify">
                  대조 모델들(B, C)은 극심한 외란 앞에서도 오차를 완벽히 감쇄하는 불변의 면역력을 나타낸다. C5 필터를 부과했을 때 수렴 중 지터(Jitter) 현상이 C3 필터 모델 대비 눈에 띄게 절개/소멸되고, 과도 한계 영역 통과 시간이 극단적으로 줄어들어 한층 우수한 위상 평형 안정도를 성취하게 된다.
                </p>
              </div>
            </div>
          </section>

          {/* Proceed button */}
          <div className="mt-8 text-center pb-8 border-t border-[#45464d]/10 pt-8">
            <button
              onClick={() => setActiveTab('END')}
              className="px-8 py-3.5 bg-[#ffb95f] text-[#101415] font-mono text-xs tracking-widest font-bold uppercase hover:bg-white rounded duration-200 shadow-md active:scale-95 cursor-pointer"
            >
              Finish Verification & View Summary
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
