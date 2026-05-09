"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, RocketLaunch, CheckCircle, EnvelopeSimple } from "@phosphor-icons/react";

const PRIMARY = "#e07b2a";

export default function TutorTestReadyPage() {
  const router = useRouter();

  const checklist = [
    "Screen recording enabled",
    "Camera & mic connected",
    "Environment ready"
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center relative overflow-hidden">
      {/* Background Subtle Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#e07b2a] opacity-[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2251cc] opacity-[0.03] blur-[140px] rounded-full pointer-events-none" />

      {/* Top Navigation */}
      <div className="w-full max-w-[600px] px-8 py-6 flex items-center justify-between z-10">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium text-[#8888aa] hover:text-[#1a1c1e] transition-colors">
          <ArrowLeft size={18} weight="bold" />
          Back
        </button>
        <Image src="/logo.png" alt="HomeGuru Logo" width={110} height={34} priority />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-[600px] px-8 py-10 flex flex-col z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Rocket Icon */}
        <div className="mb-6">
          <RocketLaunch size={32} weight="duotone" style={{ color: PRIMARY }} className="animate-in zoom-in duration-500 delay-200" />
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[2.25rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
            Ready to start!
          </h1>
          <p className="text-[15px] text-[#44474f] mt-2 leading-relaxed">
            The timer starts as soon as you click below. Good luck!
          </p>
        </div>

        {/* Checklist */}
        <div className="flex flex-col gap-3">
          {checklist.map((text, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-4 px-5 py-4 bg-white border border-[#e1e2ec] rounded-[16px]"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <CheckCircle size={22} weight="fill" color={PRIMARY} className="animate-in zoom-in" style={{ animationDelay: `${(idx * 150) + 300}ms` }} />
              <span className="text-[15px] font-medium text-[#1a1c1e]">{text}</span>
            </div>
          ))}
        </div>

        {/* Support Link */}
        <div className="flex items-center gap-2 mt-8 text-[#8888aa]">
          <EnvelopeSimple size={18} weight="regular" />
          <p className="text-[14px]">
            Need help? <a href="mailto:support@homeguruworld.com" className="hover:underline transition-all" style={{ color: PRIMARY }}>support@homeguruworld.com</a>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-10">
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[14px] font-medium text-[#8888aa] hover:text-[#1a1c1e] transition-colors">
            <ArrowLeft size={18} weight="bold" />
            Back
          </button>

          <button
            onClick={() => router.push("/register/tutor/test/attempt")} // Next step placeholder (actual test environment)
            className="group px-8 h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 active:scale-[0.98] hover:opacity-90"
            style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
          >
            Start Test
            <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </div>
  );
}

