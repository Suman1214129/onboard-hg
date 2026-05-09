"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle, IdentificationBadge, ArrowRight, ShieldCheck, ArrowLeft } from "@phosphor-icons/react";

const PRIMARY = "#e07b2a";

export default function TutorIDSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-[#fafafa] flex-col items-center justify-center relative overflow-hidden px-6 text-center">
      
      {/* Background Subtle Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#e07b2a] opacity-[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2251cc] opacity-[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md px-8 py-6 flex items-center justify-between z-10">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium text-[#8888aa] hover:text-[#1a1c1e] transition-colors">
          <ArrowLeft size={18} weight="bold" />
          Back
        </button>
        <Image src="/logo.png" alt="HomeGuru Logo" width={110} height={34} priority />
      </div>

      <div className="w-full max-w-md flex flex-col items-center z-10 animate-in zoom-in-95 fade-in duration-700">
        
        {/* Animated Checkmark Group */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-[#e8f5e9] flex items-center justify-center  border border-[#c8e6c9]">
            <IdentificationBadge size={40} weight="duotone" color="#2e7d32" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
            <CheckCircle size={28} weight="fill" color="#2e7d32" className="animate-in zoom-in duration-500 delay-200" />
          </div>
        </div>

        <h1 className="text-[2rem] font-bold tracking-tight text-[#1a1c1e] leading-snug mb-2">
          Identity Verified
        </h1>
        
        <p className="text-[15px] text-[#44474f] leading-relaxed mb-8">
          Your details have been successfully fetched and verified via DigiLocker. You now have a verified badge on your profile.
        </p>

        {/* Verification Summary Card */}
        <div className="w-full bg-white border border-[#e1e2ec] rounded-[24px] p-6 mb-8 text-left  flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-[#e1e2ec] pb-4">
            <div className="w-10 h-10 rounded-full bg-[#f0f4ff] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} weight="fill" color="#2251cc" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#1a1c1e]">Govt. ID Verification</span>
              <span className="text-[12px] text-[#8888aa]">Source: DigiLocker API</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[13px] text-[#8888aa]">Name Matched</span>
            <span className="text-[13px] font-bold text-[#2e7d32] flex items-center gap-1">
              <CheckCircle size={14} weight="bold" /> Yes
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[13px] text-[#8888aa]">Document Type</span>
            <span className="text-[13px] font-medium text-[#1a1c1e]">Aadhaar Card</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[13px] text-[#8888aa]">Verification Time</span>
            <span className="text-[13px] font-medium text-[#1a1c1e]">Instant</span>
          </div>
        </div>

        <button
          onClick={() => router.push("/register/tutor/bank")}
          className="group w-full max-w-[280px] h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 active:scale-[0.98] hover:opacity-90"
          style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
        >
          Add Bank Account
          <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>

      </div>
    </div>
  );
}

