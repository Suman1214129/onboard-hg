"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Bank, ShieldCheck, User, Hash, Checks } from "@phosphor-icons/react";
import { useState } from "react";

const PRIMARY = "#e07b2a";

export default function TutorBankPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    accName: "",
    accNumber: "",
    confirmAccNumber: "",
    ifsc: ""
  });

  const isFormValid = formData.accName && formData.accNumber && formData.confirmAccNumber && formData.ifsc && (formData.accNumber === formData.confirmAccNumber);

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
            Final Step
          </p>
          <h1 className="text-[2.25rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
            Bank Account Details
          </h1>
          <p className="text-[15px] text-[#44474f] mt-2 leading-relaxed">
            Where should we send your earnings? Payments are securely settled directly to your bank account.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-[#fcf4ed] border border-[#fce4d2] rounded-[16px] p-4 flex items-start gap-3 mb-8">
          <div className="mt-0.5">
            <ShieldCheck size={20} weight="fill" color={PRIMARY} />
          </div>
          <p className="text-[13px] text-[#2d1600] leading-relaxed">
            <span className="font-bold">Important:</span> Ensure the Account Holder Name matches the name on your verified Govt. ID to avoid settlement failures.
          </p>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4 mb-8">
          
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium text-[#44474f]">Account Holder Name</label>
            <div className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200 bg-[#f4f4f8]">
              <User size={20} color="#8888aa" weight="duotone" />
              <input 
                type="text"
                value={formData.accName}
                onChange={(e) => setFormData({...formData, accName: e.target.value})}
                placeholder="Enter full name as per bank records"
                className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium text-[#44474f]">Account Number</label>
            <div className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200 bg-[#f4f4f8]">
              <Hash size={20} color="#8888aa" weight="duotone" />
              <input 
                type="password"
                value={formData.accNumber}
                onChange={(e) => setFormData({...formData, accNumber: e.target.value.replace(/\D/g, "")})}
                placeholder="Enter 9-18 digit account number"
                className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8] font-mono tracking-widest"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium text-[#44474f]">Re-enter Account Number</label>
            <div className={`flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200 ${
                formData.confirmAccNumber && formData.accNumber !== formData.confirmAccNumber 
                  ? "bg-[#fff8f8] border-[1.5px] border-[#ba1a1a]" 
                  : "bg-[#f4f4f8] border-[1.5px] border-transparent"
              }`}>
              <Checks size={20} color={formData.confirmAccNumber && formData.accNumber !== formData.confirmAccNumber ? "#ba1a1a" : "#8888aa"} weight="duotone" />
              <input 
                type="text"
                value={formData.confirmAccNumber}
                onChange={(e) => setFormData({...formData, confirmAccNumber: e.target.value.replace(/\D/g, "")})}
                placeholder="Re-enter account number"
                className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8] font-mono tracking-widest"
              />
            </div>
            {formData.confirmAccNumber && formData.accNumber !== formData.confirmAccNumber && (
              <span className="text-[12px] font-medium text-[#ba1a1a]">Account numbers do not match</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium text-[#44474f]">IFSC Code</label>
            <div className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200 bg-[#f4f4f8]">
              <Bank size={20} color="#8888aa" weight="duotone" />
              <input 
                type="text"
                value={formData.ifsc}
                onChange={(e) => setFormData({...formData, ifsc: e.target.value.toUpperCase()})}
                placeholder="Enter 11-character IFSC"
                maxLength={11}
                className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8] font-mono uppercase"
              />
            </div>
          </div>

        </div>

        <button
          onClick={() => router.push("/register/tutor/golive")} // Move to final Go Live page
          disabled={!isFormValid}
          className={`group w-full h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 mt-auto mb-10 ${
            isFormValid ? "active:scale-[0.98] hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed bg-[#e1e2ec] text-[#8888aa]"
          }`}
          style={isFormValid ? { backgroundColor: PRIMARY, color: "#ffffff" } : {}}
        >
          Verify & Go Live
          <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 ${isFormValid ? "group-hover:translate-x-1" : ""}`} />
        </button>

      </div>
    </div>
  );
}
