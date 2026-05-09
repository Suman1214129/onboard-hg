"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Globe, InstagramLogo, FacebookLogo, YoutubeLogo, Users, Megaphone, LinkedinLogo, WhatsappLogo, XLogo, GraduationCap, Backpack, ArrowLeft } from "@phosphor-icons/react";
import StudentSprite from "../../../../assets/student.png";

const PRIMARY = "#2251cc";

const SOURCES = [
  { key: "google", label: "Google", icon: Globe, color: "#4285F4" },
  { key: "youtube", label: "YouTube", icon: YoutubeLogo, color: "#FF0000" },
  { key: "instagram", label: "Instagram", icon: InstagramLogo, color: "#E1306C" },
  { key: "family_friends", label: "Family / Friends", icon: Users, color: PRIMARY },
  { key: "school_college", label: "School / College", icon: GraduationCap, color: PRIMARY },
  { key: "other", label: "Other", icon: Megaphone, color: PRIMARY },
];

export default function LearnerSourcePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

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
              Welcome to
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#2251cc] pb-1">
              our community.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            We'd love to know how you found out about HomeGuru.
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
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Let's connect</p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Where did you<br />hear about us?
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">This helps us understand our community better.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            {SOURCES.map((src) => {
              const Icon = src.icon;
              const isSelected = selected === src.key;
              return (
                <button
                  key={src.key}
                  onClick={() => setSelected(src.key)}
                  className={`group relative overflow-hidden flex flex-col items-start justify-between p-4 min-h-[96px] rounded-[24px] border transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] text-left ${
                    isSelected ? "border-transparent" : "border-[#c4c6d0] bg-transparent hover:bg-[#f0f2f6]/50"
                  }`}
                  style={{ backgroundColor: isSelected ? `${src.color}15` : undefined }}
                >
                  {/* Background Icon */}
                  <div
                    className={`absolute -bottom-4 -right-4 transition-all duration-700 ease-out select-none pointer-events-none ${
                      isSelected ? "opacity-20 scale-110 -rotate-6" : "opacity-[0.04] scale-100 rotate-0"
                    }`}
                  >
                    <Icon size={72} weight="fill" color={src.color} />
                  </div>

                  <div className="relative z-10 flex flex-col w-full h-full gap-3 mt-1">
                    <Icon size={24} color={isSelected ? src.color : "#8888aa"} weight={isSelected ? "fill" : "regular"} />
                    <span className="text-[14px] font-semibold tracking-tight transition-colors" style={{ color: isSelected ? src.color : "#1a1c1e" }}>{src.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => selected && router.push("/register/learner/interests")}
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
