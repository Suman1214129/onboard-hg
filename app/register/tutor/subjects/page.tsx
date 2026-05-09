"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Books, Trophy, Medal, AirplaneTilt, Palette, Translate, CheckCircle } from "@phosphor-icons/react";
import TeacherSprite from "../../../../assets/teacher.png";

const PRIMARY = "#e07b2a";
const PRIMARY_LIGHT = "#fce4d2";

const CATEGORIES = [
  {
    id: "schooling",
    title: "Schooling",
    icon: Books,
    items: [
      "CBSE", "State Board", "ICSE", "IB", "IGCSE", 
      "Mathematics", "Science", "Physics", "Chemistry", 
      "Biology", "English", "Social Studies", "Accountancy", 
      "Economics", "Business Studies"
    ]
  },
  {
    id: "competitive",
    title: "Competitive",
    icon: Trophy,
    items: [
      "JEE Main", "JEE Advanced", "NEET", "CLAT (Law)", 
      "CUET", "UPSC / Civil Services", "SSC", "Banking / IBPS", 
      "CTET / PTET", "Nursing Entrance", "CA / CS / CMA", 
      "NDA / CDS", "GATE", "CAT / MBA Entrance", "State PSC"
    ]
  },
  {
    id: "olympiad",
    title: "Olympiads",
    icon: Medal,
    items: [
      "Math Olympiad (IMO)", "Science Olympiad (NSO)", 
      "English Olympiad (IEO)", "Cyber Olympiad (NCO)", 
      "GK Olympiad (IGKO)", "French Olympiad", "Physics Olympiad"
    ]
  },
  {
    id: "abroad",
    title: "Study Abroad",
    icon: AirplaneTilt,
    items: [
      "IELTS", "TOEFL", "PTE Academic", "SAT", 
      "ACT", "GMAT", "GRE", "Duolingo English Test"
    ]
  },
  {
    id: "languages",
    title: "Languages",
    icon: Translate,
    items: [
      "Spoken English", "Hindi", "French", "Spanish", 
      "German", "Japanese", "Mandarin", "Korean", "Arabic",
      "Tamil", "Telugu", "Marathi", "Bengali", "Kannada", "Malayalam", "Gujarati"
    ]
  },
  {
    id: "non_academic",
    title: "Non-Academic",
    icon: Palette,
    items: [
      "Vocal Music", "Instrumental Music", "Yoga & Fitness", 
      "Chess", "Dance / Choreography", "Art & Craft", 
      "Coding / Programming", "Public Speaking", "Personality Development", 
      "Photography", "Financial Literacy"
    ]
  }
];

export default function TutorSubjectsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("schooling");

  const toggleSubject = (subject: string) => {
    setSelected(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject) 
        : [...prev, subject]
    );
  };

  const canSubmit = selected.length > 0;
  const activeData = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="flex h-screen overflow-hidden">
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
              What will
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#e07b2a] pb-1">
              you teach?
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[280px] text-[#44474f] font-medium">
            Select all the categories and subjects you excel at to match with the perfect students.
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] overflow-y-auto custom-scrollbar relative flex flex-col">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #dce0ea; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c4c6d0; }
        `}</style>
        
        <div className="flex-1 w-full flex flex-col items-center py-12 pb-32">
          <div className="w-full max-w-[500px] px-8 flex flex-col gap-6">
            
            <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium w-fit transition-opacity hover:opacity-80" style={{ color: PRIMARY }}>
              <ArrowLeft size={18} weight="bold" />
              Back
            </button>

            <div>
              <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Step 1 of 5</p>
              <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
                Subjects & Skills
              </h1>
              <p className="text-[14px] text-[#44474f] mt-1.5 leading-relaxed">
                Browse through categories and choose everything you can confidently teach.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2.5 overflow-x-auto custom-scrollbar pb-3 mt-2 w-[calc(100%+2rem)] -ml-4 px-4 snap-x">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isAct = activeCategory === cat.id;
                const selectedCount = cat.items.filter(i => selected.includes(i)).length;
                return (
                  <button 
                    key={cat.id} 
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 snap-start px-4 py-2.5 rounded-[14px] text-[13.5px] font-medium transition-all duration-300 border flex items-center gap-2.5 ${
                      isAct 
                        ? 'bg-[#fce4d2] border-[#e07b2a] text-[#2d1600] ' 
                        : 'bg-[#ffffff] border-[#e1e2ec] text-[#44474f] hover:bg-[#f4f4f8]'
                    }`}
                  >
                    <Icon size={18} weight={isAct ? "duotone" : "regular"} color={isAct ? PRIMARY : "#8888aa"} />
                    {cat.title}
                    {selectedCount > 0 && (
                      <span className="bg-[#e07b2a] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1 font-bold">
                        {selectedCount}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Active Category Subjects Grid */}
            {activeData && (
              <div className="flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h3 className="text-[14px] font-bold text-[#1a1c1e] flex items-center gap-2">
                  <activeData.icon size={20} weight="duotone" color={PRIMARY} />
                  {activeData.title} Subjects
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {activeData.items.map((item) => {
                    const isSelected = selected.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleSubject(item)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-medium transition-all duration-200 border active:scale-[0.98] ${
                          isSelected 
                            ? "bg-[#e07b2a] border-[#e07b2a] text-white " 
                            : "bg-white border-[#e1e2ec] text-[#44474f] hover:border-[#c4c6d0] hover:bg-[#f4f4f8]"
                        }`}
                      >
                        {isSelected && <CheckCircle size={16} weight="fill" className="text-white animate-in zoom-in duration-200" />}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/90 backdrop-blur-md border-t border-[#e1e2ec] flex justify-center z-20">
          <div className="w-full max-w-[500px] px-8 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-[13px] font-medium text-[#6b6f7a]">
                {selected.length > 0 ? (
                  <span><span className="text-[#1a1c1e] font-bold text-[15px]" style={{ color: PRIMARY }}>{selected.length}</span> skills chosen</span>
                ) : (
                  "Select at least one skill"
                )}
              </p>
              {selected.length > 0 && (
                <p className="text-[11px] text-[#8888aa] truncate max-w-[180px]">
                  {selected.slice(0, 2).join(", ")} {selected.length > 2 && `+${selected.length - 2} more`}
                </p>
              )}
            </div>
            
            <button
              onClick={() => canSubmit && router.push("/register/tutor/test")} // Next step mock
              disabled={!canSubmit}
              className={`group h-[40px] px-8 rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 ${
                canSubmit ? "active:scale-[0.98] hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed"
              }`}
              style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
            >
              Continue
              <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 ${canSubmit ? "group-hover:translate-x-1" : ""}`} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

