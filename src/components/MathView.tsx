import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Info, HelpCircle } from 'lucide-react';
import { TabId } from '../types';

interface MathViewProps {
  setActiveTab: (tab: TabId) => void;
}

export default function MathView({ setActiveTab }: MathViewProps) {
  const [order, setOrder] = useState<number>(4);

  // Dynamically compute stats based on Cantor order n
  const measureOfStep = useMemo(() => {
    return Math.pow(2 / 3, order);
  }, [order]);

  const derivativeIntensity = useMemo(() => {
    return Math.pow(3 / 2, order);
  }, [order]);

  // Recursively generate Cantor staircase function points in [0, 400] scale
  const cantorPoints = useMemo(() => {
    const scaleX = 400;
    const scaleY = 400;

    interface Point {
      x: number;
      y: number;
    }

    // Recursive subdivisions
    function subdivide(p1: Point, p2: Point, depth: number): Point[] {
      if (depth === 0) {
        return [p1, p2];
      }

      const dx = (p2.x - p1.x) / 3;
      const dy = (p2.y - p1.y) / 2;

      const leftMid: Point = { x: p1.x + dx, y: p1.y + dy };
      const rightMid: Point = { x: p1.x + 2 * dx, y: p1.y + dy };

      return [
        ...subdivide(p1, leftMid, depth - 1),
        ...subdivide(leftMid, rightMid, depth - 1).slice(1), // remove duplicate mid point
        ...subdivide(rightMid, p2, depth - 1).slice(1)
      ];
    }

    const start: Point = { x: 0, y: 0 };
    const end: Point = { x: scaleX, y: scaleY };

    return subdivide(start, end, order);
  }, [order]);

  // SVG Path generation
  const pathData = useMemo(() => {
    if (cantorPoints.length === 0) return '';
    const pointsStr = cantorPoints
      .map((p) => `${p.x.toFixed(2)},${(400 - p.y).toFixed(2)}`)
      .join(' L ');
    return `M ${pointsStr}`;
  }, [cantorPoints]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-5xl mx-auto px-6 md:px-10 pb-24 pt-12 text-[#e0e3e5]"
    >
      {/* Specification Title */}
      <section className="mb-12 border-b border-[#45464d]/40 pb-8">
        <div className="flex flex-col gap-2 mb-6">
          <span className="font-mono text-[11px] text-[#7bd0ff] tracking-[0.3em] uppercase">
            FORMAL SPECIFICATION
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#e0e3e5] tracking-tight">
            Cantor's Staircase Visualization
          </h2>
        </div>
        <p className="text-[#c6c6cd] text-base md:text-lg leading-relaxed text-left text-justify select-text">
          칸토어 계단함수 <span className="font-mono text-[#7bd0ff]">$C(x)$</span>는 구간 <span className="font-mono text-[#7bd0ff]">[0, 1]</span>에서 다음과 같이 재귀적으로 구성된다. 먼저 0차 근사를 항등함수 <span className="font-mono text-[#7bd0ff]">$C_0(x)=x$</span>로 정의한 뒤, 각 단계에서 비평탄 구간의 가운데 <span className="font-mono text-[#7bd0ff]">1/3</span>을 제거하고 해당 구간에서 함수값을 상수로 고정한다. 즉 극한 함수 <span className="font-mono text-[#7bd0ff]">$C(x)$</span>는 거의 모든 곳에서 도함수가 0이면서 <span className="font-mono text-[#7bd0ff]">$C(0)=0$</span>에서 <span className="font-mono text-[#7bd0ff]">$C(1)=1$</span>까지 연속적으로 증가하는 특이 연속함수이다 (악마의 계단).
        </p>
      </section>

      {/* Main Grid: Parameters + SVG Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Side: Parameters Form */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 border border-[#45464d] bg-[#191c1e] rounded shadow-md text-left">
            <h3 className="font-mono text-xs text-[#bec6e0] uppercase tracking-wider mb-6 pb-2 border-b border-[#45464d]/35">
              Simulation Parameters
            </h3>
            
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="font-mono text-[11px] text-[#909097] tracking-wider uppercase">
                    APPROXIMATION_ORDER (n)
                  </label>
                  <span className="font-mono text-2xl text-[#7bd0ff] font-bold">
                    {order}
                  </span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={order}
                  onChange={(e) => setOrder(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#45464d] rounded-lg appearance-none cursor-pointer accent-[#7bd0ff] focus:outline-none"
                  style={{
                    WebkitAppearance: 'none'
                  }}
                />
                
                <div className="flex justify-between text-[10px] font-mono text-[#909097]">
                  <span>Order 0</span>
                  <span>Order 6</span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#45464d]/50 flex flex-col gap-4 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-[#909097] tracking-wider">MEASURE_OF_STEP (2/3)ⁿ</span>
                  <span className="text-[#e0e3e5] select-all font-semibold font-mono">
                    {measureOfStep.toFixed(6)}{order > 4 ? '...' : ''}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#909097] tracking-wider">DERIVATIVE_INTENSITY (3/2)ⁿ</span>
                  <span className="text-[#e0e3e5] select-all font-semibold font-mono">
                    {derivativeIntensity.toFixed(4)}{order > 4 ? '...' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info block: Fractal Redistribution */}
          <div className="p-5 border-l-4 border-[#7bd0ff] bg-[#0f172a] rounded-r text-left">
            <div className="flex items-center gap-2 mb-3 text-[#7bd0ff]">
              <Info className="w-4 h-4" />
              <h4 className="font-mono text-xs uppercase tracking-widest font-bold">
                Fractal Redistribution
              </h4>
            </div>
            <p className="text-xs text-[#798098] leading-relaxed text-justify">
              정적분을 통한 칸토어 도함수 검증: 비평탄 구간의 측도가 아무리 작아져도, 해당 구간에서의 도함수 값이 정확히 그만큼 커지므로 정적분 값이 보존된다. 이는 칸토어 함수의 특징인 "질량을 잃지 않으면서" 점점 더 좁은 영역에 집중시키는 프랙탈적 재분배의 수학적 표현으로 해석할 수 있다.
            </p>
          </div>
        </aside>

        {/* Right Side: Visualizing Canvas */}
        <section className="lg:col-span-8 flex flex-col gap-3">
          <div className="relative w-full aspect-square border border-[#45464d] bg-[#0f172a] flex items-center justify-center overflow-hidden rounded shadow-xl">
            
            {/* Grid Pattern Background */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #bec6e0 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Custom Interactive SVG Graph */}
            <div className="w-full h-full p-8 md:p-12 relative flex items-center justify-center">
              <svg 
                viewBox="0 0 400 400" 
                className="w-full h-full overflow-visible"
              >
                {/* Horizontal reference tick values */}
                <line x1="0" y1="0" x2="400" y2="0" stroke="#45464d" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="0" y1="200" x2="400" y2="200" stroke="#45464d" strokeWidth="1" strokeDasharray="3,3" />
                
                {/* Vertical reference tick values */}
                <line x1="200" y1="0" x2="200" y2="400" stroke="#45464d" strokeWidth="1" strokeDasharray="3,3" />

                {/* Plot the actual staircase path */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="#7bd0ff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300 drop-shadow-[0_0_4px_rgba(123,208,255,0.4)]"
                />

                {/* Horizontal & Vertical Axes */}
                <line x1="0" y1="400" x2="400" y2="400" stroke="#909097" strokeWidth="1.5" />
                <line x1="0" y1="0" x2="0" y2="400" stroke="#909097" strokeWidth="1.5" />

                {/* Graph Ticks */}
                <text x="-15" y="10" fontSize="11" fill="#909097" fontFamily="monospace">1.0</text>
                <text x="-15" y="205" fontSize="11" fill="#909097" fontFamily="monospace">0.5</text>
                <text x="-15" y="400" fontSize="11" fill="#909097" fontFamily="monospace">0.0</text>

                <text x="0" y="418" fontSize="11" fill="#909097" fontFamily="monospace">0.0</text>
                <text x="188" y="418" fontSize="11" fill="#909097" fontFamily="monospace">0.5</text>
                <text x="385" y="418" fontSize="11" fill="#909097" fontFamily="monospace">1.0</text>

                {/* Y-axis label */}
                <text x="-12" y="55" fontSize="12" fill="#7bd0ff" fontFamily="sans-serif" transform="rotate(-90 -12 55)" letterSpacing="0.05em">Cn(x)</text>

                {/* X-axis label */}
                <text x="200" y="435" fontSize="12" fill="#909097" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.05em">Segment x</text>
              </svg>
            </div>

            {/* Float Label */}
            <div className="absolute top-4 right-4 bg-[#101415] px-3 py-1.5 border border-[#45464d] text-[9px] font-mono text-[#909097] rounded shadow-md uppercase tracking-wider">
              RENDER_MODE: MONOTONIC_STEP
            </div>
          </div>
          <span className="text-[10px] text-[#909097] text-center mt-1 block italic">
            [그림 2.1] Cantor staircase n={[order]} 단계의 극한 재귀선형 보간 (Order가 높을수록 계단이 촘촘해집니다)
          </span>
        </section>
      </div>

      {/* Math Derivative Proof Panels */}
      <section className="mb-12 flex flex-col gap-6 text-left">
        <h3 className="text-xl md:text-2xl font-serif text-[#bec6e0] border-b border-[#45464d]/30 pb-4">
          Formal Verification of Derivatives
        </h3>
        
        <div className="border-l border-[#45464d] pl-6 md:pl-10 flex flex-col gap-6">
          <div className="p-8 bg-[#0b0f10] border border-[#45464d]/40 rounded relative overflow-hidden flex flex-col items-center justify-center">
            <span className="text-[10px] font-mono text-[#909097] uppercase tracking-widest mb-4">
              Generalization of n-th Approximation Derivative
            </span>
            {/* Textbook Equation Render */}
            <div className="flex items-center gap-4 py-4 md:py-6 text-lg md:text-2xl font-serif text-[#e0e3e5] overflow-x-auto max-w-full">
              <span className="font-mono text-[#7bd0ff] font-semibold text-xl md:text-2xl">C'ₙ(x)</span>
              <span className="text-2xl md:text-3xl font-light">=</span>
              <div className="flex items-center gap-3">
                <span className="text-5xl md:text-6xl font-extralight text-[#45464d]">{'{'}</span>
                <div className="flex flex-col gap-4 text-sm md:text-lg font-mono">
                  <div className="flex items-center gap-6">
                    <span className="text-[#eee] bg-[#1d2022] px-2 py-0.5 rounded border border-[#45464d]/30 font-semibold">(3 / 2)ⁿ</span>
                    <span className="text-xs text-[#909097]/95 italic">on non-flat segments (measure: (2/3)ⁿ)</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[#ff5f5f] font-semibold">0</span>
                    <span className="text-xs text-[#909097]/95 italic">on flat segments (measure: 1 - (2/3)ⁿ)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-[#45464d] bg-[#191c1e] rounded">
              <h4 className="font-mono text-xs text-[#7bd0ff] uppercase tracking-wider mb-3">
                Derivation Logic (도함수 유도)
              </h4>
              <p className="text-sm text-[#c6c6cd] leading-relaxed text-justify">
                칸토어 계단 함수의 n차 도함수 유도: 일반화하면, n차 근사의 도함수는 이값(Two-valued) 함수가 되며, 단계 n이 증가할수록 비평탄 구간의 전체 측도는 <span className="font-mono text-xs text-[#bec6e0] bg-[#101415] px-1 py-0.5 rounded">(2/3)ⁿ ⇒ 0</span>으로 수렴하고, 해당 구간에서의 도함수 값은 <span className="font-mono text-xs text-[#bec6e0] bg-[#101415] px-1 py-0.5 rounded">(3/2)ⁿ ⇒ ∞</span>으로 발산하게 된다.
              </p>
            </div>
            
            <div className="p-6 border border-[#45464d] bg-[#191c1e] rounded">
              <h4 className="font-mono text-xs text-[#7bd0ff] uppercase tracking-wider mb-3">
                Invariant Mass (변화량 불변)
              </h4>
              <p className="text-sm text-[#c6c6cd] leading-relaxed text-justify">
                놀랍게도 두 값의 곱은 항상 <span className="font-mono text-xs text-[#bec6e0] bg-[#101415] px-1 py-0.5 rounded">(2/3)ⁿ × (3/2)ⁿ = 1</span>을 이룬다. 이는 극한 상태에서 비평탄 구간이 점으로 쪼개져 소멸하더라도, 전구간 변화량의 누적 총합(에너지)은 완벽히 1로 보존됨을 수학적으로 증명하며, 뛰어난 복원적 정적분 가능성을 유지한다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Button footer */}
      <section className="mt-16 text-center">
        <button
          onClick={() => setActiveTab('SIM')}
          className="px-8 py-3.5 bg-[#7bd0ff] text-[#101415] font-mono text-xs tracking-widest font-bold uppercase hover:bg-white hover:text-[#101415] rounded duration-200 shadow-md active:scale-95 cursor-pointer"
        >
          Proceed to Architecture Simulation
        </button>
      </section>
    </motion.div>
  );
}
