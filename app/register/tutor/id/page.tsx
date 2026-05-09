"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, ShieldCheck, LockKey, IdentificationCard, FileArrowUp, CheckCircle } from "@phosphor-icons/react";
import { useState } from "react";

const PRIMARY = "#e07b2a";

export default function TutorIDVerificationPage() {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleDigilocker = () => {
    setIsVerifying(true);
    // Simulate API redirect / verification delay
    setTimeout(() => {
      router.push("/register/tutor/id/success");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center relative overflow-hidden">
      {/* Background Subtle Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#e07b2a] opacity-[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2251cc] opacity-[0.03] blur-[140px] rounded-full pointer-events-none" />

      {/* Top Navigation */}
      <div className="w-full max-w-[500px] px-8 py-6 flex items-center justify-between z-10">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-80" style={{ color: PRIMARY }}>
          <ArrowLeft size={18} weight="bold" />
          Back
        </button>
        <Image src="/logo.png" alt="HomeGuru Logo" width={110} height={34} priority />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-[500px] px-8 py-6 flex flex-col z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>
            Step 4 of 5
          </p>
          <h1 className="text-[2.25rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
            Identity Verification
          </h1>
          <p className="text-[15px] text-[#44474f] mt-2 leading-relaxed">
            As a trusted platform, we require all tutors to verify their identity. We use DigiLocker for instant, secure verification.
          </p>
        </div>

        {/* DigiLocker Card */}
        <div className="bg-white border border-[#e1e2ec] rounded-[24px] overflow-hidden mb-6 relative ">
          <div className="p-6 pb-5 flex items-start gap-4 border-b border-[#e1e2ec]">
            <div className="w-12 h-12 rounded-full bg-[#f0f4ff] flex items-center justify-center shrink-0">
              <ShieldCheck size={28} weight="duotone" color="#2251cc" />
            </div>
            <div className="flex flex-col pt-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[16px] font-bold text-[#1a1c1e]">DigiLocker Verification</span>
                <span className="px-2 py-0.5 rounded-[4px] bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-bold uppercase tracking-[0.1em]">Recommended</span>
              </div>
              <p className="text-[13px] text-[#6b6f7a] leading-relaxed">
                Fetch your Aadhaar or PAN instantly from the Govt. of India's secure DigiLocker platform. No manual uploads needed.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#fafafa] flex flex-col items-center">
            {isVerifying ? (
               <div className="flex flex-col items-center gap-3 w-full animate-in fade-in">
                 <div className="w-8 h-8 border-[3px] border-[#c4c6d0] border-t-[#2251cc] rounded-full animate-spin" />
                 <span className="text-[13px] font-medium text-[#44474f]">Connecting to DigiLocker...</span>
               </div>
            ) : (
              <button
                onClick={handleDigilocker}
                className="group w-full h-[44px] rounded-full text-[14px] font-bold tracking-[0.1px] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]  hover:"
                style={{ backgroundColor: "#2251cc", color: "#ffffff" }}
              >
                Continue with DigiLocker
                <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

