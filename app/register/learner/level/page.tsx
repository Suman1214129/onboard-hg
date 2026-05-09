"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, ArrowLeft, HandWaving, Lightbulb, GraduationCap, TrendUp, Medal, Circle } from "@phosphor-icons/react";
import { Suspense } from "react";
import StudentSprite from "../../../../assets/student.png";

const PRIMARY = "#2251cc";
const PRIMARY_LIGHT = "#e6edfc";

const LEVELS = [
  {
    key: "new",
    levelIndicator: 1,
    icon: HandWaving,
    labelTemplate: "I'm new to {subject}",
    desc: "Just starting out â€” no prior experience.",
  },
  {
    key: "basics",
    levelIndicator: 2,
    icon: Lightbulb,
    labelTemplate: "I know some basics",
    desc: "Familiar with a few concepts but need guidance.",
  },
  {
    key: "handle_basic",
    levelIndicator: 3,
    icon: GraduationCap,
    labelTemplate: "I can handle basic {subject} concepts",
    desc: "Comfortable with fundamentals, ready to go deeper.",
  },
  {
    key: "work_various",
    levelIndicator: 4,
    icon: TrendUp,
    labelTemplate: "I can work with various {subject} topics",
    desc: "Good understanding across multiple areas.",
  },
  {
    key: "discuss_detail",
    levelIndicator: 5,
    icon: Medal,
    labelTemplate: "I can discuss most {subject} topics in detail",
    desc: "Strong grasp â€” looking to master advanced concepts.",
  },
] as const;

function LevelContent() {
  const router = useRouter();
  const params = useSearchParams();
  const subjectsParam = params.get("subjects") ?? "";
  const subjects = subjectsParam ? decodeURIComponent(subjectsParam).split(",") : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSubject = subjects[currentIndex] || "this subject";
  
  const [subjectLevels, setSubjectLevels] = useState<Record<string, string>>({});

  const currentLevelSelected = subjectLevels[currentSubject];

  const handleLevelSelect = (levelKey: string) => {
    setSubjectLevels(prev => ({ ...prev, [currentSubject]: levelKey }));
  };

  function handleContinue() {
    if (!currentLevelSelected) return;
    if (currentIndex < subjects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push("/register/learner/profile");
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      router.back();
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* â”€â”€ Left Panel â”€â”€ */}
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
              animation: play-role-sprite 2.5s steps(5) infinite;
            }
          `}</style>
          <div className="w-[140px] h-[140px] overflow-hidden">
            <img 
              src={StudentSprite.src} 
              alt="Learner Mascot" 
              className="h-[140px] max-w-none role-sprite-anim block"
              style={{ width: "calc(140px * 5)" }}
            />
          </div>

          <div>
            <p className="text-[2rem] font-medium tracking-tight text-[#1a1c1e] leading-snug">
              Every expert
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#2251cc] pb-1">
              was once a beginner.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            There's no wrong answer â€” be honest so we can find the perfect tutor for you.
          </p>

          {/* subject pill */}
          {subjects.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 absolute bottom-12">
              {subjects.map((s, idx) => (
                <span
                  key={s}
                  className="text-xs font-medium px-4 py-1.5 rounded-full border transition-all duration-300"
                  style={{ 
                    backgroundColor: idx === currentIndex ? PRIMARY : "#ffffff", 
                    color: idx === currentIndex ? "#ffffff" : "#44474f", 
                    borderColor: idx === currentIndex ? PRIMARY : "#e1e2ec",
                    transform: idx === currentIndex ? "scale(1.05)" : "scale(1)"
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* â”€â”€ Right Panel â”€â”€ */}
      <div className="w-1/2 bg-[#fafafa] overflow-y-auto custom-scrollbar">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #dce0ea; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c4c6d0; }
        `}</style>
        <div className="min-h-full w-full flex items-center justify-center py-16">
          <div className="w-full max-w-xl px-10 flex flex-col gap-5">

          <button onClick={handleBack} className="flex items-center gap-1.5 text-[13px] font-medium w-fit" style={{ color: PRIMARY }}>
            <ArrowLeft size={18} weight="bold" />
            Back
          </button>

          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2" style={{ color: PRIMARY }}>
              {subjects.length > 1 ? `Subject ${currentIndex + 1} of ${subjects.length}` : "Your level"}
            </p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              How comfortable are<br />you with {currentSubject}?
            </h1>
          </div>

          <div className="flex flex-col gap-2.5 mt-2">
            {LEVELS.map((level) => {
              const Icon = level.icon;
              const isSelected = currentLevelSelected === level.key;
              const labelText = level.labelTemplate.replace("{subject}", currentSubject);

              return (
                <div
                  key={level.key}
                  onClick={() => handleLevelSelect(level.key)}
                  className="flex items-center gap-4 px-5 py-4 rounded-[20px] border-[1.5px] transition-all cursor-pointer hover:bg-[#f4f4f8]"
                  style={{
                    backgroundColor: isSelected ? PRIMARY_LIGHT : "#f8f9fb",
                    borderColor: isSelected ? PRIMARY : "transparent"
                  }}
                >
                  {/* Indicator */}
                  <div className="flex flex-col gap-[3px] shrink-0">
                    {[5, 4, 3, 2, 1].map((dot) => (
                      <div 
                        key={dot} 
                        className="w-1 h-[6px] rounded-full transition-colors" 
                        style={{ backgroundColor: dot <= level.levelIndicator ? (isSelected ? PRIMARY : "#44474f") : "#dce0ea" }}
                      />
                    ))}
                  </div>

                  <div className="shrink-0 flex items-center justify-center w-8">
                    <Icon size={24} weight="regular" color={isSelected ? PRIMARY : "#44474f"} />
                  </div>

                  <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                    <p className="text-[15px] font-medium text-[#1a1c1e] truncate">{labelText}</p>
                    <p className="text-[13px] text-[#6b6f7a] truncate">{level.desc}</p>
                  </div>

                  <div className="shrink-0 pl-2">
                    {isSelected ? (
                      <CheckCircle size={22} weight="fill" color={PRIMARY} />
                    ) : (
                      <Circle size={22} weight="regular" color="#dce0ea" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={handleContinue}
            disabled={!currentLevelSelected}
            className={`group w-full h-[48px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 mt-4 sticky bottom-8 ${
              currentLevelSelected ? "active:scale-[0.98] hover:opacity-90 cursor-pointer shadow-sm" : "opacity-50 cursor-not-allowed"
            }`}
            style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
          >
            {currentIndex < subjects.length - 1 ? "Next subject" : "Continue"}
            <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 ${currentLevelSelected ? "group-hover:translate-x-1" : ""}`} />
          </button>

        </div>
        </div>
      </div>
    </div>
  );
}

export default function LearnerLevelPage() {
  return (
    <Suspense>
      <LevelContent />
    </Suspense>
  );
}
