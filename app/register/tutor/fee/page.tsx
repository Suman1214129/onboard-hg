"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle, ShieldCheck, LockKey, CreditCard } from "@phosphor-icons/react";

const PRIMARY = "#e07b2a";

const FEATURES = [
  "Verified Tutor Badge on profile",
  "Unlimited student matches worldwide",
  "Zero commission on your first 5 classes",
  "Secure payments & scheduling tools",
  "24/7 priority tutor support"
];

export default function TutorListingFeePage() {
  const router = useRouter();

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
        
        <div className="mb-6">
          <p className="text-xs font-bold tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>
            Step 3 of 5
          </p>
          <h1 className="text-[2.25rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
            Annual Listing Fee
          </h1>
          <p className="text-[15px] text-[#44474f] mt-2 leading-relaxed">
            A nominal fee to verify your profile and maintain the quality of our tutoring network.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-white border border-[#e1e2ec] rounded-[24px] overflow-hidden mt-2 relative ">
          
          {/* Top Banner */}
          <div className="bg-[#fcf4ed] px-6 py-4 border-b border-[#fce4d2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck size={24} weight="duotone" color={PRIMARY} />
              <span className="text-[14px] font-bold text-[#1a1c1e]">Premium Listing</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white text-[11px] font-bold tracking-[0.1em] uppercase text-[#e07b2a] border border-[#fce4d2]">
              1 Year
            </span>
          </div>

          {/* Price Area */}
          <div className="px-6 py-8 border-b border-[#e1e2ec]">
            <div className="flex items-baseline gap-1">
              <span className="text-[2rem] font-bold text-[#1a1c1e]">₹499</span>
              <span className="text-[14px] font-medium text-[#8888aa]">/ year</span>
            </div>
            <p className="text-[13px] text-[#6b6f7a] mt-1">Valid for 365 days from activation.</p>
          </div>

          {/* Features Area */}
          <div className="px-6 py-6 bg-[#fafafa]">
            <p className="text-[12px] font-bold tracking-[0.1em] text-[#8888aa] uppercase mb-4">What's Included</p>
            <ul className="flex flex-col gap-3.5">
              {FEATURES.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={18} weight="fill" color={PRIMARY} className="shrink-0 mt-0.5" />
                  <span className="text-[14px] text-[#44474f] font-medium leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Security Note */}
        <div className="flex flex-col items-center mt-6 gap-2">
          <div className="flex items-center gap-1.5 text-[#8888aa]">
            <LockKey size={14} weight="bold" />
            <p className="text-[12px] font-medium uppercase tracking-[0.1em]">Secured by Razorpay</p>
          </div>
          <div className="flex items-center gap-2 text-[#c4c6d0]">
            <CreditCard size={24} weight="duotone" />
            <div className="w-8 h-5 border border-[#e1e2ec] rounded-[4px] flex items-center justify-center font-bold text-[10px] text-[#8888aa] bg-white">UPI</div>
            <div className="w-8 h-5 border border-[#e1e2ec] rounded-[4px] flex items-center justify-center font-bold text-[10px] text-[#8888aa] bg-white">NB</div>
          </div>
        </div>

        <button
          onClick={() => router.push("/register/tutor/fee/success")}
          className="group w-full h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 mt-6 active:scale-[0.98] hover:opacity-90 mb-10"
          style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
        >
          Pay Securely
          <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>

      </div>
    </div>
  );
}

