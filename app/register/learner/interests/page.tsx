"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight, ArrowLeft, BookOpenText, Palette } from "@phosphor-icons/react";
import StudentSprite from "../../../../assets/student.png";

const PRIMARY = "#2251cc";
const PRIMARY_LIGHT = "#dce6fb";

const OPTIONS = {
  academic: {
    icon: BookOpenText,
    label: "Academic",
    tagline: "School subjects, exams & competitive prep",
    tags: ["Maths", "Science", "English", "History", "Physics", "Chemistry", "Biology", "Languages"],
    color: "#2251cc",
  },
  "non-academic": {
    icon: Palette,
    label: "Non-Academic",
    tagline: "Creative skills, hobbies & personal growth",
    tags: ["Music", "Art & Craft", "Coding", "Sports", "Dance", "Yoga", "Photography", "Chess"],
    color: "#e07b2a",
  },
} as const;

type Option = keyof typeof OPTIONS;

export default function LearnerInterestsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Option | null>(null);

  return (
    <div className="flex min-h-screen">

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
              Tell us what
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#2251cc] pb-1">
              excites you.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            We'll personalise your experience around your interests.
          </p>
        </div>
      </div>

      {/* â”€â”€ Right Panel â”€â”€ */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-5">

          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium w-fit" style={{ color: PRIMARY }}>
            <ArrowLeft size={18} weight="bold" />
            Back
          </button>

          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Personalise</p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              What are you<br />interested in?
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">Pick one â€” we&apos;ll match you with the right tutors.</p>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-3">
            {(["academic", "non-academic"] as Option[]).map((key) => {
              const opt = OPTIONS[key];
              const isSelected = selected === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className="w-full text-left rounded-[24px] overflow-hidden transition-all duration-300 relative group"
                  style={{
                    border: `2px solid ${isSelected ? opt.color : "#e1e2ec"}`,
                    backgroundColor: isSelected ? `${opt.color}08` : "#ffffff",
                  }}
                >
                  {/* Header */}
                  <div className="px-5 pt-5 pb-4 flex items-center gap-4 relative z-10">
                    <div
                      className="w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{ backgroundColor: isSelected ? opt.color : "#f4f4f8" }}
                    >
                      <opt.icon
                        size={24}
                        weight={isSelected ? "fill" : "duotone"}
                        color={isSelected ? "#ffffff" : opt.color}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="font-bold text-[16px] leading-tight transition-colors duration-300"
                        style={{ color: isSelected ? opt.color : "#1a1c1e" }}
                      >
                        {opt.label}
                      </p>
                      <p className="text-[12.5px] text-[#6b6f7a] mt-1 leading-relaxed">{opt.tagline}</p>
                    </div>

                    {isSelected
                      ? <CheckCircle size={24} weight="fill" color={opt.color} className="shrink-0" />
                      : <div className="w-6 h-6 rounded-full border-2 shrink-0 transition-colors group-hover:border-[#a0a3b0]" style={{ borderColor: "#dce0ea" }} />
                    }
                  </div>

                  {/* Tags */}
                  <div
                    className="px-5 pb-4 pt-3 flex flex-wrap gap-2"
                    style={{ borderTop: `1px solid ${isSelected ? `${opt.color}20` : "#f0f0f5"}` }}
                  >
                    {opt.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11.5px] font-medium px-3 py-1 rounded-full border transition-all duration-200"
                        style={{
                          backgroundColor: isSelected ? `${opt.color}10` : "#f4f4f8",
                          color: isSelected ? opt.color : "#5c5f6a",
                          borderColor: isSelected ? `${opt.color}25` : "transparent",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <button
            onClick={() => selected && router.push(`/register/learner/subjects?category=${selected}`)}
            disabled={!selected}
            className={`group w-full h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 mt-2 ${
              selected ? "active:scale-[0.98] hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
            style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
          >
            Continue
            <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 ${selected ? "group-hover:translate-x-1" : ""}`} />
          </button>

        </div>
      </div>
    </div>
  );
}
