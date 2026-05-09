"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Clock, WarningCircle, CalendarPlus, Notepad } from "@phosphor-icons/react";

const PRIMARY = "#e07b2a";
const PRIMARY_LIGHT = "#fce4d2";

// Mocking selected subjects since there's no global state yet
const mockSelectedSubjects = ["CBSE", "Mathematics", "Science"];

export default function TutorTestOverviewPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center relative overflow-hidden">
      {/* Background Subtle Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#e07b2a] opacity-[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2251cc] opacity-[0.03] blur-[140px] rounded-full pointer-events-none" />

      {/* Top Navigation */}
      <div className="w-full max-w-3xl px-8 py-6 flex items-center justify-between z-10">
        <Image src="/logo.png" alt="HomeGuru Logo" width={110} height={34} priority />
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-80" style={{ color: PRIMARY }}>
          <ArrowLeft size={18} weight="bold" />
          Back
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-xl px-8 py-10 flex flex-col z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>
            Qualification Test
          </p>
          <h1 className="text-[2.25rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
            Teaching Assessment
          </h1>
          <p className="text-[15px] text-[#44474f] mt-2 leading-relaxed">
            Answer questions to demonstrate your teaching knowledge and approach.
          </p>
        </div>

        {/* Selected Subjects Badge */}
        <div className="mb-8">
          <p className="text-[12px] font-medium text-[#6b6f7a] mb-2 uppercase tracking-wide">
            Assessment tailored for your selected subjects
          </p>
          <div className="flex flex-wrap gap-2">
            {mockSelectedSubjects.map(subject => (
              <span key={subject} className="px-3 py-1.5 rounded-[8px] bg-white border border-[#e1e2ec] text-[13px] font-medium text-[#1a1c1e] ">
                {subject}
              </span>
            ))}
            <span className="px-3 py-1.5 rounded-[8px] bg-transparent border border-dashed border-[#c4c6d0] text-[13px] font-medium text-[#8888aa]">
              + Edit
            </span>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white border border-[#e1e2ec] rounded-[24px] p-6 mb-6  flex items-center gap-6">
          <div className="flex flex-col items-center justify-center min-w-[80px] border-r border-[#e1e2ec] pr-6">
            <h2 className="text-[2.5rem] font-extrabold text-[#1a1c1e] leading-none tracking-tight">15</h2>
            <p className="text-[14px] font-medium text-[#6b6f7a] mt-1">min</p>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Notepad size={18} weight="duotone" color={PRIMARY} />
              <p className="text-[15px] font-bold text-[#1a1c1e]">
                10 MCQs + 2 written questions
              </p>
            </div>
            <p className="text-[14px] text-[#6b6f7a]">
              Teaching aptitude & subject knowledge
            </p>
          </div>
        </div>

        {/* Warning Note */}
        <div className="bg-[#fff8f3] border border-[#fce4d2] rounded-[16px] p-4 mb-10 flex items-start gap-3">
          <WarningCircle size={20} weight="fill" color={PRIMARY} className="shrink-0 mt-0.5" />
          <p className="text-[13.5px] text-[#5e3a1f] leading-relaxed">
            <strong className="font-bold">Note:</strong> 1 attempt every 45 days. Ensure stable internet and a quiet environment before starting.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-auto">
          <button
            onClick={() => router.push("/register/tutor/test/instructions")}
            className="group w-full h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 active:scale-[0.98] hover:opacity-90"
            style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
          >
            Start Now
            <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => {}} // Placeholder for schedule later
            className="w-full h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-300 flex items-center justify-center gap-2 border border-[#e1e2ec] text-[#44474f] bg-white hover:bg-[#f4f4f8] active:scale-[0.98]"
          >
            <CalendarPlus size={20} weight="regular" />
            Schedule Later
          </button>
        </div>

      </div>
    </div>
  );
}

