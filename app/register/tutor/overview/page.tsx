"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, SpinnerGap } from "@phosphor-icons/react";
import TeacherSprite from "../../../../assets/teacher.png";

const PRIMARY = "#e07b2a";
const PRIMARY_LIGHT = "#fce4d2";

const STEPS = [
  { title: "Subjects & Skills", desc: "Tell us what you can teach" },
  { title: "Qualification Test", desc: "Show us your problem-solving skills" },
  { title: "Listing Fee", desc: "₹499/year · valid for 365 days" },
  { title: "ID Verification", desc: "Upload a government-issued ID" },
  { title: "Go Live", desc: "Start getting students instantly" },
];

export default function TutorOverviewPage() {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < STEPS.length + 1) {
      const t = setTimeout(() => setVisibleCount(c => c + 1), 800);
      return () => clearTimeout(t);
    }
  }, [visibleCount]);

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* ── Left Panel ── */}
      <div className="w-1/2 relative overflow-hidden flex flex-col px-12 py-10 bg-gradient-to-br from-[#e6edfc] via-[#fcfcfd] to-[#fce4d2] border-r border-[#e1e2ec]">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-[#2251cc] opacity-[0.08] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] bg-[#e07b2a] opacity-[0.08] blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full">
          <Image src="/logo.png" alt="HomeGuru Logo" width={130} height={40} priority />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-8 text-center mt-8">
          <style>{`
            @keyframes play-role-sprite {
              from { transform: translateX(0); }
              to { transform: translateX(-100%); }
            }
            .role-sprite-anim {
              animation: play-role-sprite 2.5s steps(4) infinite;
            }
          `}</style>
          <div className="w-[140px] h-[140px] overflow-hidden">
            <img 
              src={TeacherSprite.src} 
              alt="Teacher Mascot" 
              className="h-[140px] max-w-none role-sprite-anim block"
              style={{ width: "calc(140px * 4)" }}
            />
          </div>

          <div>
            <p className="text-[2rem] font-medium tracking-tight text-[#1a1c1e] leading-snug">
              Share your
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#e07b2a] pb-1">
              knowledge.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            Join thousands of experts changing lives through teaching.
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center py-10 overflow-y-auto">
        <div className="w-full max-w-[420px] px-8 flex flex-col gap-6">

          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>
              Tutor Onboarding
            </p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Your journey to<br />becoming a <span style={{ color: PRIMARY }}>HomeGuru</span>
            </h1>
            <p className="text-[14px] text-[#44474f] mt-1.5 leading-relaxed">
              5 simple steps. Takes about 10 minutes.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            {STEPS.map((step, idx) => {
              const isVisible = visibleCount > idx;
              const isLast = idx === STEPS.length - 1;

              return (
                <div 
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-[16px] bg-[#ffffff] border border-[#e1e2ec] transition-all duration-700"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500" style={{ backgroundColor: isVisible ? PRIMARY_LIGHT : "#f4f4f8" }}>
                    {isLast ? (
                       <SpinnerGap size={20} weight="bold" color={isVisible ? PRIMARY : "#8888aa"} className={`animate-spin transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} />
                    ) : (
                       <div className={`transition-all duration-500 transform ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                         <Check size={20} weight="bold" color={PRIMARY} />
                       </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#1a1c1e] leading-snug">{step.title}</h3>
                    <p className="text-[13px] font-medium text-[#6b6f7a] mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => router.push("/register/tutor/subjects")}
            className={`group w-full h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-700 flex items-center justify-center gap-2 mt-4 active:scale-[0.98] hover:opacity-90 ${visibleCount > STEPS.length ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
          >
            Let's Begin
            <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>

        </div>
      </div>
    </div>
  );
}

