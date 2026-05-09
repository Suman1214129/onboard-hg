"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, WarningCircle, ArrowRight } from "@phosphor-icons/react";

const PRIMARY = "#e07b2a";

export default function TutorTestSubmittedPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"completed" | "forced" | null>(null);

  useEffect(() => {
    const s = sessionStorage.getItem("test_status") as "completed" | "forced" | null;
    setStatus(s || "completed");
  }, []);

  if (!status) return null;

  return (
    <div className="flex min-h-screen bg-[#fafafa] flex-col items-center justify-center relative overflow-hidden px-6 text-center">
      
      {/* Background Subtle Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#e07b2a] opacity-[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2251cc] opacity-[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6  ${
          status === "forced" ? "bg-[#fff8f8] border border-[#ba1a1a]" : "bg-[#fcf4ed] border border-[#fce4d2]"
        }`}>
          {status === "forced" ? (
             <WarningCircle size={40} weight="duotone" color="#ba1a1a" />
          ) : (
             <CheckCircle size={40} weight="duotone" color={PRIMARY} />
          )}
        </div>

        <h1 className="text-[2rem] font-bold tracking-tight text-[#1a1c1e] leading-snug mb-3">
          {status === "forced" ? "Test Auto-Submitted" : "Test Submitted Successfully"}
        </h1>
        
        <p className="text-[15px] text-[#44474f] leading-relaxed mb-8">
          {status === "forced" 
            ? "Your test was automatically submitted because you exceeded the allowed number of proctoring warnings (e.g. switching tabs, screenshots). Our team will review your attempt."
            : "Great job! Your teaching assessment has been received. Our team will review your answers and get back to you within 24-48 hours."}
        </p>

        <div className="w-full h-px bg-[#e1e2ec] mb-8" />

        <button
          onClick={() => router.push("/register/tutor/test/cleared")}
          className="group w-full max-w-[240px] h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 active:scale-[0.98] hover:opacity-90"
          style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
        >
          Continue to Next Step
          <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>

      </div>
    </div>
  );
}

