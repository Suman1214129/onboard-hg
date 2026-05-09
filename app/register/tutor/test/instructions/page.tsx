"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Clock, WarningCircle } from "@phosphor-icons/react";

const PRIMARY = "#e07b2a";
const PRIMARY_LIGHT = "#fce4d2";

export default function TutorTestInstructionsPage() {
  const router = useRouter();

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
        
        {/* Badge */}
        <div className="flex items-center w-fit gap-2 px-3 py-1.5 rounded-[8px] bg-white border border-[#e1e2ec] mb-6">
          <Clock size={16} weight="bold" style={{ color: PRIMARY }} />
          <span className="text-[11px] font-bold tracking-[0.1em] uppercase" style={{ color: PRIMARY }}>
            This section is not timed
          </span>
        </div>

        {/* Header */}
        <h1 className="text-[2.25rem] font-bold tracking-tight text-[#1a1c1e] leading-snug mb-10">
          Before you begin
        </h1>

        <div className="flex flex-col gap-10">
          {/* Instructions Section */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <h3 className="text-[12px] font-bold tracking-[0.1em] text-[#1a1c1e] uppercase">
                Instructions
              </h3>
              <div className="flex-1 h-px bg-[#e1e2ec]" />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <WarningCircle size={20} weight="regular" color={PRIMARY} className="shrink-0 mt-0.5" />
                <p className="text-[15px] text-[#44474f] leading-relaxed">
                  Timer starts when the test begins. You cannot pause.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} weight="regular" color="#8888aa" className="shrink-0 mt-0.5" />
                <p className="text-[15px] text-[#44474f] leading-relaxed">
                  You get 1 attempt every 45 days.
                </p>
              </div>
            </div>
          </div>

          {/* Setup Section */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <h3 className="text-[12px] font-bold tracking-[0.1em] text-[#1a1c1e] uppercase">
                Setup
              </h3>
              <div className="flex-1 h-px bg-[#e1e2ec]" />
            </div>

            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8888aa] mt-2 shrink-0" />
                <p className="text-[15px] text-[#44474f] leading-relaxed">
                  Use <strong className="font-bold text-[#1a1c1e]">Google Chrome</strong> (not incognito).
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8888aa] mt-2 shrink-0" />
                <p className="text-[15px] text-[#44474f] leading-relaxed">
                  Close all other browser tabs.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8888aa] mt-2 shrink-0" />
                <p className="text-[15px] text-[#44474f] leading-relaxed">
                  Working camera & microphone required — this is proctored.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8888aa] mt-2 shrink-0" />
                <p className="text-[15px] text-[#44474f] leading-relaxed">
                  No additional monitors.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-10">
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[14px] font-medium text-[#8888aa] hover:text-[#1a1c1e] transition-colors">
            <ArrowLeft size={18} weight="bold" />
            Back
          </button>

          <button
            onClick={() => router.push("/register/tutor/test/permissions")}
            className="group px-8 h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 active:scale-[0.98] hover:opacity-90"
            style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
          >
            Next
            <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </div>
  );
}

