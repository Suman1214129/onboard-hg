"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle, Receipt, ArrowRight, DownloadSimple, ArrowLeft } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const PRIMARY = "#e07b2a";

export default function TutorFeeSuccessPage() {
  const router = useRouter();
  const [dateStr, setDateStr] = useState("");
  const [txnId, setTxnId] = useState("");

  useEffect(() => {
    setDateStr(new Date().toLocaleString("en-US", { 
      year: "numeric", month: "long", day: "numeric", 
      hour: "2-digit", minute: "2-digit" 
    }));
    setTxnId("txn_" + Math.random().toString(36).substring(2, 15).toUpperCase());
  }, []);

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
        
        {/* Animated Checkmark */}
        <div className="w-20 h-20 rounded-full bg-[#e8f5e9] flex items-center justify-center mb-6  border border-[#c8e6c9]">
          <CheckCircle size={44} weight="fill" color="#2e7d32" className="animate-in zoom-in duration-500 delay-200" />
        </div>

        <h1 className="text-[2rem] font-bold tracking-tight text-[#1a1c1e] leading-snug mb-2">
          Payment Successful
        </h1>
        
        <p className="text-[15px] text-[#44474f] leading-relaxed mb-8">
          Thank you! Your premium listing is now active. A receipt has been sent to your registered email.
        </p>

        {/* Receipt Card */}
        <div className="w-full bg-white border border-[#e1e2ec] rounded-[24px] p-6 mb-8 text-left relative overflow-hidden ">
          {/* Decorative receipt tear effect at top/bottom could go here */}
          
          <div className="flex items-center justify-between border-b border-[#e1e2ec] pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Receipt size={24} weight="duotone" color={PRIMARY} />
              <span className="text-[15px] font-bold text-[#1a1c1e]">Transaction Details</span>
            </div>
            <span className="text-[18px] font-bold text-[#1a1c1e]">₹499.00</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[#8888aa]">Date</span>
              <span className="text-[13px] font-medium text-[#1a1c1e]">{dateStr}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[#8888aa]">Transaction ID</span>
              <span className="text-[13px] font-medium text-[#1a1c1e] font-mono">{txnId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[#8888aa]">Plan</span>
              <span className="text-[13px] font-medium text-[#1a1c1e]">1 Year Premium Listing</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[#8888aa]">Status</span>
              <span className="text-[12px] font-bold text-[#2e7d32] bg-[#e8f5e9] px-2 py-0.5 rounded-full">Completed</span>
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center gap-2 text-[13px] font-bold text-[#2251cc] mt-6 hover:underline transition-all">
            <DownloadSimple size={16} weight="bold" />
            Download Invoice PDF
          </button>
        </div>

        <button
          onClick={() => router.push("/register/tutor/id")}
          className="group w-full max-w-[280px] h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 active:scale-[0.98] hover:opacity-90"
          style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
        >
          Proceed to ID Verification
          <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>

      </div>
    </div>
  );
}

