import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, ArrowRight, Video, Scissors, Search, Sparkles, MousePointer2 } from 'lucide-react';

const TitleSlide = ({ onNext, isActive }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-12 relative">
      <div className="absolute top-12 left-12 font-heading font-bold text-2xl tracking-tight hero-anim">
        Videre
      </div>
      <div className="text-center max-w-6xl w-full flex flex-col items-center">
        <h1 className="font-heading font-black uppercase text-[12vw] leading-[0.85] tracking-[-0.04em] text-textDark hero-anim">
          OMNISCIENCE
        </h1>
        <h2 className="font-drama italic text-[4.5vw] leading-none mt-6 text-textDark/80 hero-anim font-light">
          Edit with perfect recall.
        </h2>

        <p className="mt-12 text-lg md:text-xl text-textDark/60 max-w-2xl text-center hero-anim font-medium font-sans">
          Multipurpose local AI-powered video editor. Experience seamless transcription, semantic scene search, and auto B-Roll embedding matching in a single tranquil workspace.
        </p>

        <button
          onClick={onNext}
          className="mt-16 flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-full font-heading font-bold tracking-wide text-lg btn-magnetic hero-anim"
        >
          <span>Begin Experience</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl mix-blend-overlay -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl mix-blend-overlay -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

const DiagnosticShuffler = ({ isActive }) => {
  // Array shifting every 3 seconds for Scene Context feature
  const [items, setItems] = useState([
    { id: 1, text: "\\\"so I landed the backflip\\\"", bg: "bg-surface" },
    { id: 2, text: "[SILENCE DETECTED: 2.1s]", bg: "bg-surface/80" },
    { id: 3, text: "\\\"wait, let me try that again\\\"", bg: "bg-surface/50" }
  ]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="bg-surface/50 rounded-[2rem] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 flex flex-col items-center relative overflow-hidden h-full">
      <div className="mb-8 w-full">
        <h3 className="font-heading font-bold text-xl text-textDark">Transcript Editor</h3>
        <p className="font-sans text-sm text-textDark/60 mt-1">Time-Aware Cut Detection</p>
      </div>

      <div className="relative w-full flex-1 flex items-center justify-center">
        {items.map((item, index) => {
          const isTop = index === 0;
          const isMid = index === 1;

          return (
            <div
              key={item.id}
              className={`absolute w-full p-4 rounded-xl border border-textDark/10 flex items-center gap-4 transition-all duration-[800ms] ${item.bg}`}
              style={{
                top: isTop ? '15%' : isMid ? '35%' : '55%',
                transform: `scale(${isTop ? 1 : isMid ? 0.95 : 0.9})`,
                zIndex: isTop ? 30 : isMid ? 20 : 10,
                opacity: isTop ? 1 : isMid ? 0.7 : 0.4,
                boxShadow: isTop ? '0 10px 25px -5px rgba(0,0,0,0.1)' : 'none',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <Scissors className="w-4 h-4 text-accent" />
              </div>
              <span className="font-sans font-medium text-textDark/90 truncate">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TelemetryTypewriter = ({ isActive }) => {
  const fullText = "> Querying scene context...\\n> Target: \\\"successfully did a backflip\\\"\\n> Scanning visual frames...\\n> 3 matches found in source\\n> Filtering out failed attempts...\\n> Clip 1: [02:14 - 02:18] Extracted.";
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      const reset = setTimeout(() => {
        setDisplayText('');
        setIndex(0);
      }, 0);
      return () => clearTimeout(reset);
    }

    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText.charAt(index));
        setIndex(i => i + 1);
      }, Math.random() * 30 + 20); // variable typing speed
      return () => clearTimeout(timeout);
    }
  }, [isActive, index]);

  return (
    <div className="bg-textDark rounded-[2rem] p-8 shadow-xl flex flex-col h-full overflow-hidden text-surface">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading font-bold text-xl">Scene Context Feed</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span className="font-data text-xs uppercase tracking-wider text-surface/50">Semantic Search</span>
        </div>
      </div>

      <p className="font-sans text-sm text-surface/60 mb-8 border-b border-surface/10 pb-4">
        Extracting clips based on visual actions
      </p>

      <div className="font-data text-sm leading-relaxed text-accent/90 whitespace-pre-wrap flex-1">
        {displayText.split('\\n').map((line, i) => (
          <div key={i} className="mb-2">{line}</div>
        ))}
        {index < fullText.length && <span className="inline-block w-2 h-4 bg-surface animate-pulse ml-1"></span>}
      </div>
    </div>
  );
};

const CursorProtocolScheduler = ({ isActive }) => {
  const containerRef = useRef();

  // Folders row mapping to B-Roll insertion on timeline
  const labels = ['Source', 'IMG', 'VID', 'B-Roll', 'VFX', 'SFX', 'Output'];

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Animate cursor moving across the grid, highlighting a cell, clicking save
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Initial setup
    gsap.set('.sim-cursor', { x: 0, y: 0, opacity: 0 });
    gsap.set('.grid-cell-3', { backgroundColor: 'transparent' });

    tl.to('.sim-cursor', { opacity: 1, duration: 0.3 })
      .to('.sim-cursor', { x: 140, y: 80, duration: 1, ease: 'power2.inOut' }) // Move to Wed cell
      .to('.sim-cursor', { scale: 0.8, duration: 0.1 }) // Click down
      .to('.grid-cell-3', { backgroundColor: '#93C5FD', duration: 0.2 }) // Accent highlight
      .to('.sim-cursor', { scale: 1, duration: 0.1 }) // Click up
      .to('.sim-cursor', { x: 220, y: 180, duration: 0.8, ease: 'power2.inOut' }) // Move to Save button
      .to('.sim-cursor', { scale: 0.8, duration: 0.1 }) // Click down
      .to('.sim-cursor', { scale: 1, duration: 0.1 }) // Click up
      .to('.sim-cursor', { opacity: 0, duration: 0.3 });

    return () => tl.kill();
  }, [isActive]);

  return (
    <div ref={containerRef} className="bg-surface/50 rounded-[2rem] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 flex flex-col relative h-full">
      <div className="mb-6 w-full">
        <h3 className="font-heading font-bold text-xl text-textDark">B-Roll Auto-Retrieval</h3>
        <p className="font-sans text-sm text-textDark/60 mt-1">Smart Embedding Matching & Sync</p>
      </div>

      <div className="mt-4 flex-1 flex flex-col justify-center items-center relative">
        <div className="grid grid-cols-7 gap-1 w-full max-w-[260px] relative z-10">
          {labels.map((label, i) => (
            <div key={i} className="text-center font-data text-[0.6rem] text-textDark/40 mb-2 truncate px-0.5">{label}</div>
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-md border border-textDark/10 transition-colors ${i === 3 ? 'grid-cell-3 bg-surface' : 'bg-surface'}`}
            ></div>
          ))}
        </div>

        <button className="mt-8 px-6 py-2 bg-textDark text-surface rounded-full text-xs font-heading tracking-wide btn-magnetic z-10 flex items-center gap-2">
          <Video className="w-3 h-3" />
          Fetch Context Folders
        </button>

        <div className="sim-cursor absolute top-0 left-0 z-20 pointer-events-none drop-shadow-md">
          <MousePointer2 className="w-6 h-6 text-textDark fill-surface" />
        </div>
      </div>
    </div>
  );
};

const TerminalPoint = ({ isActive }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-anim',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative p-12 bg-gradient-to-t from-backgroundDeeper to-background">
      <div className="text-center flex flex-col items-center max-w-4xl z-10">
        <h2 className="font-heading font-black text-[6vw] leading-[0.9] tracking-tight uppercase text-textDark cta-anim">
          The Future
        </h2>
        <h3 className="font-drama italic text-[5vw] leading-none mt-4 text-textDark/90 cta-anim">
          is localized.
        </h3>

        <button className="mt-24 group relative overflow-hidden bg-textDark text-surface px-16 py-6 rounded-[3rem] font-heading font-bold text-3xl tracking-wide btn-magnetic scale-110 cta-anim shadow-2xl">
          <span className="relative z-10 flex items-center gap-4">
            Launch the app
            <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
        </button>
      </div>

      <div className="absolute bottom-8 w-full px-12 flex justify-between items-center text-textDark/50 text-sm font-data cta-anim">
        <span>© 2026 Videre Sequence</span>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>System Local & Operational</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-textDark transition-colors">Documentation</a>
          <a href="#" className="hover:text-textDark transition-colors">Privacy</a>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const nextSlide = () => {
    if (activeIndex < 2) setActiveIndex(i => i + 1);
  };

  const prevSlide = () => {
    if (activeIndex > 0) setActiveIndex(i => i - 1);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        x: `-${activeIndex * 100}vw`,
        ease: 'power3.inOut',
        duration: 1.2
      });
    });
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-background">
      {activeIndex > 0 && (
        <button
          onClick={prevSlide}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-surface/30 hover:bg-surface/60 backdrop-blur-xl border border-white/40 transition-all hover-lift shadow-lg"
        >
          <ChevronLeft className="w-8 h-8 text-textDark" />
        </button>
      )}

      {activeIndex < 2 && (
        <button
          onClick={nextSlide}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-surface/30 hover:bg-surface/60 backdrop-blur-xl border border-white/40 transition-all hover-lift shadow-lg"
        >
          <ChevronRight className="w-8 h-8 text-textDark" />
        </button>
      )}

      <div className="flex w-[300vw] h-full" ref={containerRef}>
        <div className="w-screen h-full shrink-0 flex items-center justify-center">
          <TitleSlide isActive={activeIndex === 0} onNext={nextSlide} />
        </div>
        <div className="w-screen h-full shrink-0 flex items-center justify-center p-8 md:p-16">
          <div className="w-full h-full bg-surface/40 backdrop-blur-2xl rounded-[3rem] border border-white/50 shadow-2xl flex flex-col p-10 md:p-16 relative overflow-hidden">
            <h2 className="font-heading font-black text-4xl mb-2 text-textDark tracking-tight uppercase">THE ENGINE ROOM</h2>
            <p className="font-drama italic text-2xl text-textDark/60 mb-12">Intelligent parsing protocols actively engaged.</p>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
              <DiagnosticShuffler isActive={activeIndex === 1} />
              <TelemetryTypewriter isActive={activeIndex === 1} />
              <CursorProtocolScheduler isActive={activeIndex === 1} />
            </div>
          </div>
        </div>
        <div className="w-screen h-full shrink-0 flex items-center justify-center">
          <TerminalPoint isActive={activeIndex === 2} />
        </div>
      </div>
    </div>
  );
}
