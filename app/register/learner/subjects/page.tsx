"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, ArrowLeft, Calculator, Atom, Flask, Leaf, BookOpenText, Scroll, GlobeHemisphereWest, Translate, TrendUp, Desktop, Brain, Scales, ChartBar, Briefcase, CurrencyCircleDollar, MusicNotes, Palette, Code, GameController, Robot, PersonSimpleRun, SoccerBall, Flower, Camera, PuzzlePiece, MicrophoneStage, CookingPot, PiggyBank } from "@phosphor-icons/react";
import { Suspense } from "react";
import StudentSprite from "../../../../assets/student.png";

const PRIMARY = "#2251cc";
const PRIMARY_LIGHT = "#dce6fb";

const SUBJECTS = {
  academic: [
    {
      group: "Math & Sciences",
      items: [
        { label: "Maths", icon: Calculator },
        { label: "Physics", icon: Atom },
        { label: "Chemistry", icon: Flask },
        { label: "Biology", icon: Leaf },
        { label: "Computer Sc.", icon: Desktop },
      ]
    },
    {
      group: "Humanities & Social",
      items: [
        { label: "History", icon: Scroll },
        { label: "Geography", icon: GlobeHemisphereWest },
        { label: "Economics", icon: TrendUp },
        { label: "Psychology", icon: Brain },
        { label: "Law", icon: Scales },
      ]
    },
    {
      group: "Languages",
      items: [
        { label: "English", icon: BookOpenText },
        { label: "Hindi", icon: Translate },
        { label: "French", icon: GlobeHemisphereWest },
        { label: "Spanish", icon: Translate },
      ]
    },
    {
      group: "Business",
      items: [
        { label: "Accounting", icon: ChartBar },
        { label: "Business Studies", icon: Briefcase },
        { label: "Finance", icon: CurrencyCircleDollar },
      ]
    }
  ],
  "non-academic": [
    {
      group: "Creative Arts",
      items: [
        { label: "Music", icon: MusicNotes },
        { label: "Art & Craft", icon: Palette },
        { label: "Photography", icon: Camera },
        { label: "Dance", icon: PersonSimpleRun },
      ]
    },
    {
      group: "Tech & Coding",
      items: [
        { label: "Web Dev", icon: Code },
        { label: "Game Design", icon: GameController },
        { label: "Robotics", icon: Robot },
      ]
    },
    {
      group: "Sports & Wellness",
      items: [
        { label: "Sports", icon: SoccerBall },
        { label: "Yoga", icon: Flower },
        { label: "Meditation", icon: Flower },
      ]
    },
    {
      group: "Life Skills & Hobbies",
      items: [
        { label: "Chess", icon: PuzzlePiece },
        { label: "Public Speaking", icon: MicrophoneStage },
        { label: "Cooking", icon: CookingPot },
        { label: "Personal Finance", icon: PiggyBank },
      ]
    }
  ],
} as const;

const LEFT_PANEL = {
  academic: {
    line1: "Pick your",
    line2: "subjects.",
    sub: "Choose everything you want to learn â€” no limits.",
  },
  "non-academic": {
    line1: "Pick your",
    line2: "passions.",
    sub: "Choose everything you want to explore â€” no limits.",
  },
};

type Category = keyof typeof SUBJECTS;

function SubjectsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const category = (params.get("category") ?? "academic") as Category;
  const subjects = SUBJECTS[category];
  const panel = LEFT_PANEL[category];

  const [selected, setSelected] = useState<Set<string>>(new Set());

  // reset on category change
  useEffect(() => { setSelected(new Set()); }, [category]);

  function toggle(label: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  function handleContinue() {
    if (!selected.size) return;
    const list = Array.from(selected).join(",");
    router.push(`/register/learner/level?category=${category}&subjects=${encodeURIComponent(list)}`);
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
          <div className="w-[140px] h-[140px] overflow-hidden drop-shadow-sm">
            <img 
              src={StudentSprite.src} 
              alt="Learner Mascot" 
              className="h-[140px] max-w-none role-sprite-anim block"
              style={{ width: "calc(140px * 5)" }}
            />
          </div>

          <div>
            <p className="text-[2rem] font-medium tracking-tight text-[#1a1c1e] leading-snug">
              {panel.line1}
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#2251cc] pb-1">
              {panel.line2}
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            {panel.sub}
          </p>

          {/* selected count pill */}
          {selected.size > 0 && (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full absolute bottom-12"
              style={{ backgroundColor: `${PRIMARY}15` }}
            >
              <CheckCircle size={16} weight="fill" color={PRIMARY} />
              <span className="text-[13px] font-semibold" style={{ color: PRIMARY }}>
                {selected.size} selected
              </span>
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
          <div className="w-full max-w-[480px] px-10 flex flex-col gap-6">

          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium w-fit" style={{ color: PRIMARY }}>
            <ArrowLeft size={18} weight="bold" />
            Back
          </button>

          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>
              {category === "academic" ? "Subjects" : "Skills"}
            </p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Which ones do<br />you want to learn?
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">Select all that apply.</p>
          </div>

          {/* Subject Categories Grid */}
          <div className="flex flex-col gap-8 mt-2">
            {subjects.map((groupData) => (
              <div key={groupData.group}>
                <p className="text-[12px] font-bold tracking-[0.05em] uppercase mb-3 ml-1" style={{ color: "#8888aa" }}>
                  {groupData.group}
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {groupData.items.map(({ label, icon: Icon }) => {
                    const isOn = selected.has(label);
                    return (
                      <button
                        key={label}
                        onClick={() => toggle(label)}
                        className="flex items-center gap-3 px-3.5 py-3 rounded-[12px] border text-left transition-all duration-200"
                        style={{
                          border: `1.5px solid ${isOn ? PRIMARY : "#e1e2ec"}`,
                          backgroundColor: isOn ? PRIMARY_LIGHT : "#ffffff",
                        }}
                      >
                        <Icon
                          size={20}
                          weight={isOn ? "duotone" : "regular"}
                          color={isOn ? PRIMARY : "#8888aa"}
                          className="shrink-0 transition-colors duration-200"
                        />
                        <span
                          className="text-[13px] font-medium leading-tight flex-1 transition-colors duration-200"
                          style={{ color: isOn ? PRIMARY : "#1a1c1e" }}
                        >
                          {label}
                        </span>
                        {isOn && <CheckCircle size={16} weight="fill" color={PRIMARY} className="shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selected.size}
            className={`group w-full h-[44px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 mt-4 sticky bottom-8 ${
              selected.size ? "active:scale-[0.98] hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
            style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
          >
            Continue
            <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 ${selected.size ? "group-hover:translate-x-1" : ""}`} />
          </button>

        </div>
        </div>
      </div>
    </div>
  );
}

export default function LearnerSubjectsPage() {
  return (
    <Suspense>
      <SubjectsContent />
    </Suspense>
  );
}
