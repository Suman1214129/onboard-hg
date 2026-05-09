"use client";
import Image from "next/image";
import { useState } from "react";
import { CheckCircle, Circle, GraduationCap, ChalkboardTeacher, ArrowRight } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import DefaultSprite from "../assets/hoot.png";
import StudentSprite from "../assets/student.png";
import TeacherSprite from "../assets/teacher.png";

const THEME = {
  learner: {
    primary: "#2251cc",
    onPrimary: "#ffffff",
    primaryContainer: "#dce6fb",
    onPrimaryContainer: "#001258",
    secondaryContainer: "#dde1ff",
  },
  tutor: {
    primary: "#e07b2a",
    onPrimary: "#ffffff",
    primaryContainer: "#fde8d8",
    onPrimaryContainer: "#2d1600",
    secondaryContainer: "#ffdcc2",
  },
};

const INTRO_STEPS = [
  {
    title: "Hi, I'm Hoot!",
    desc: "I'll be your learning buddy on HomeGuru. Let me show you around!",
  },
  {
    title: "Learn anything",
    desc: "From academics to music, coding to cooking. Thousands of expert tutors are here for you.",
  },
  {
    title: "Book in seconds",
    desc: "Pick a tutor, choose a time that works for you, and you're all set. No hassle.",
  },
  {
    title: "Let's get started!",
    desc: "Create your free account in under 2 minutes and start learning today.",
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<"learner" | "tutor" | null>(null);

  const t = selected === "tutor" ? THEME.tutor : THEME.learner;

  let mascotSrc = DefaultSprite.src;
  let spriteFrames = 3; // hoot.png has 3 frames
  if (selected === "learner") {
    mascotSrc = StudentSprite.src;
    spriteFrames = 5; // student.png has 5 frames
  } else if (selected === "tutor") {
    mascotSrc = TeacherSprite.src;
    spriteFrames = 4; // teacher.png has 4 frames
  }

  if (step < 4) {
    const currentStep = INTRO_STEPS[step];
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff] relative overflow-hidden text-[#1a1c1e]">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#2251cc] opacity-[0.03] blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#e07b2a] opacity-[0.03] blur-[180px] rounded-full pointer-events-none" />

        <div className="absolute top-0 w-full px-12 py-10 flex justify-between items-center z-20">
          <Image src="/logo.png" alt="HomeGuru Logo" width={130} height={40} priority />
          <button 
            onClick={() => setStep(4)} 
            className="text-[15px] font-medium text-[#74777f] hover:text-[#1a1c1e] transition-colors px-4 py-2"
          >
            Skip
          </button>
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-2xl w-full px-6 mt-12">
          {/* Subtle Aesthetic Accent Ring behind Mascot */}
          <div className="relative flex items-center justify-center mb-12">
            <div className="absolute w-[240px] h-[240px] bg-gradient-to-tr from-[#e6edfc] to-[#fcecdb] rounded-full blur-2xl opacity-60 pointer-events-none" />
            <div className="w-[160px] h-[160px] overflow-hidden relative z-10 animate-smooth-float">
            <style>{`
              @keyframes play-intro-sprite {
                from { transform: translateX(0); }
                to { transform: translateX(-100%); }
              }
              .intro-sprite-anim {
                animation: play-intro-sprite 2.5s steps(3) infinite;
              }
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
              }
              .animate-smooth-float {
                animation: float 3.5s ease-in-out infinite;
              }
            `}</style>
            <img 
              src={DefaultSprite.src}
              alt="Hoot Mascot"
              className="h-[160px] max-w-none intro-sprite-anim block"
              style={{ width: "calc(160px * 3)" }}
            />
          </div>
          </div>

          <div key={step} className="h-[140px] flex flex-col items-center justify-start text-center w-full animate-in fade-in zoom-in-[0.98] slide-in-from-bottom-4 duration-700">
            <h1 className="text-[40px] font-extrabold tracking-[-0.03em] mb-4 text-[#1a1c1e] leading-tight">
              {currentStep.title}
            </h1>
            <p className="text-[18px] text-[#44474f] leading-relaxed max-w-[480px]">
              {currentStep.desc}
            </p>
          </div>

          <div className="flex flex-col items-center mt-12 gap-10 w-full">
            <div className="flex gap-3">
              {INTRO_STEPS.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 rounded-full transition-all duration-700 ease-out ${
                    idx === step ? "w-10 opacity-100" : "w-2 opacity-20"
                  }`}
                  style={{ backgroundColor: THEME.learner.primary }}
                />
              ))}
            </div>

            <button
              onClick={() => setStep(s => s + 1)}
              className="group w-full max-w-[320px] h-[40px] rounded-full text-white font-medium text-[14px] tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 active:scale-[0.98] hover:opacity-90"
              style={{ backgroundColor: THEME.learner.primary }}
            >
              {step === 3 ? "Let's Begin" : "Continue"}
              <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">

      {/* Left Panel */}
      <div className="w-1/2 relative overflow-hidden flex flex-col px-12 py-10 bg-gradient-to-br from-[#e6edfc] via-[#fcfcfd] to-[#fce4d2] border-r border-[#e1e2ec]">
        {/* Soft Aesthetic Gradient Lighting */}
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
              animation: play-role-sprite 2.5s steps(${spriteFrames}) infinite;
            }
          `}</style>
          <div className="w-[140px] h-[140px] overflow-hidden drop-shadow-sm">
            <img 
              key={mascotSrc}
              src={mascotSrc} 
              alt="Role Mascot" 
              className="h-[140px] max-w-none role-sprite-anim block"
              style={{ width: `calc(140px * ${spriteFrames})` }}
            />
          </div>

          <div>
            <p className="text-[2rem] font-medium tracking-tight text-[#1a1c1e] leading-snug">
              Every lesson,
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#e07b2a] pb-1">
              a leap forward.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            1-on-1 tutoring for every subject, every level, every goal.
          </p>

          {/* Minimal Chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {["10k+ Learners", "500+ Tutors", "4.9 ★ Rating"].map((chip) => (
              <span
                key={chip}
                className="text-[12px] font-medium px-4 py-1.5 rounded-full border border-[#e1e2ec] bg-white/60 backdrop-blur-md text-[#44474f] shadow-sm"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-4">

          <div className="mb-2">
            <p
              className="text-xs font-medium tracking-[0.15em] uppercase mb-3 transition-colors duration-500"
              style={{ color: t.primary }}
            >
              Welcome
            </p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Join as a Learner<br />or Tutor
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">Choose your role to get started.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full h-[160px]">
            {/* Learner Card */}
            <button
              onClick={() => setSelected("learner")}
              className={`group relative overflow-hidden flex flex-col p-5 rounded-[28px] border transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] text-left ${
                selected === "learner"
                  ? "border-transparent"
                  : "border-[#c4c6d0] bg-transparent hover:bg-[#f0f2f6]/50"
              }`}
              style={{ backgroundColor: selected === "learner" ? THEME.learner.primaryContainer : undefined }}
            >
              {/* Tasteful Background Icon */}
              <div
                className={`absolute -bottom-6 -right-6 transition-all duration-700 ease-out select-none pointer-events-none ${
                  selected === "learner" ? "opacity-20 scale-110 -rotate-6" : "opacity-5 scale-100 rotate-0"
                }`}
              >
                <GraduationCap size={140} weight="regular" color={THEME.learner.primary} />
              </div>

              <div className="relative z-10 w-full flex-1 flex flex-col">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <p
                      className="font-bold text-[18px] tracking-tight transition-colors duration-400"
                      style={{ color: selected === "learner" ? THEME.learner.onPrimaryContainer : "#1a1c1e" }}
                    >
                      Learner
                    </p>
                    <p
                      className="text-[13px] mt-1 font-medium transition-colors duration-400"
                      style={{ color: selected === "learner" ? THEME.learner.primary : "#74777f" }}
                    >
                      Find a tutor
                    </p>
                  </div>
                  <div className={`transition-all duration-400 transform ${selected === "learner" ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
                    <CheckCircle size={24} weight="fill" color={THEME.learner.primary} />
                  </div>
                </div>
              </div>
            </button>

            {/* Tutor Card */}
            <button
              onClick={() => setSelected("tutor")}
              className={`group relative overflow-hidden flex flex-col p-5 rounded-[28px] border transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] text-left ${
                selected === "tutor"
                  ? "border-transparent"
                  : "border-[#c4c6d0] bg-transparent hover:bg-[#f0f2f6]/50"
              }`}
              style={{ backgroundColor: selected === "tutor" ? THEME.tutor.primaryContainer : undefined }}
            >
              {/* Tasteful Background Icon */}
              <div
                className={`absolute -bottom-6 -right-6 transition-all duration-700 ease-out select-none pointer-events-none ${
                  selected === "tutor" ? "opacity-20 scale-110 -rotate-6" : "opacity-5 scale-100 rotate-0"
                }`}
              >
                <ChalkboardTeacher size={140} weight="regular" color={THEME.tutor.primary} />
              </div>

              <div className="relative z-10 w-full flex-1 flex flex-col">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <p
                      className="font-bold text-[18px] tracking-tight transition-colors duration-400"
                      style={{ color: selected === "tutor" ? THEME.tutor.onPrimaryContainer : "#1a1c1e" }}
                    >
                      Tutor
                    </p>
                    <p
                      className="text-[13px] mt-1 font-medium transition-colors duration-400"
                      style={{ color: selected === "tutor" ? THEME.tutor.primary : "#74777f" }}
                    >
                      Start teaching
                    </p>
                  </div>
                  <div className={`transition-all duration-400 transform ${selected === "tutor" ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
                    <CheckCircle size={24} weight="fill" color={THEME.tutor.primary} />
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* M3 Filled button */}
          <button
            onClick={() => selected && router.push(`/register/${selected}`)}
            className={`group w-full h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 mt-4 flex items-center justify-center gap-2 ${
              selected ? "active:scale-[0.98] hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
            style={{ backgroundColor: t.primary, color: t.onPrimary }}
            disabled={!selected}
          >
            Continue
            <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 ${selected ? "group-hover:translate-x-1" : ""}`} />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#e1e2ec]" />
            <span className="text-xs text-[#44474f]">or</span>
            <div className="flex-1 h-px bg-[#e1e2ec]" />
          </div>

          {/* M3 Text button */}
          <p className="text-center text-sm text-[#44474f]">
            Already have an account?{" "}
            <span
              onClick={() => router.push(`/login`)}
              className="font-medium cursor-pointer hover:underline transition-colors duration-300"
              style={{ color: t.primary }}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
