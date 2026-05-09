"use client";
import { useRouter } from "next/navigation";
import { RocketLaunch, ArrowRight, CheckCircle, Student, Wallet, ShieldCheck, Sparkle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const PRIMARY = "#e07b2a";

export default function TutorGoLivePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#fafafa] flex-col items-center justify-center relative overflow-hidden px-6 text-center">
      
      {/* Background Subtle Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#e07b2a] opacity-[0.05] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2251cc] opacity-[0.03] blur-[140px] rounded-full pointer-events-none" />

      {/* Confetti effect */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background-color: ${PRIMARY};
          border-radius: 50%;
          animation: float-up 3s ease-in forwards;
          opacity: 0;
        }
      `}</style>
      
      {mounted && Array.from({ length: 25 }).map((_, i) => (
        <div 
          key={i} 
          className="particle z-0" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: '100%',
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2.5 + Math.random() * 2}s`,
            backgroundColor: ['#e07b2a', '#2251cc', '#fce4d2', '#8888aa'][Math.floor(Math.random() * 4)]
          }} 
        />
      ))}

      <div className="w-full max-w-md flex flex-col items-center z-10 animate-in zoom-in-95 duration-700">
        
        {/* Logo */}
        <div className="mb-10">
          <Image src="/logo.png" alt="HomeGuru Logo" width={130} height={40} priority />
        </div>

        {/* Hero Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-[#fcf4ed] flex items-center justify-center z-10 relative">
            <RocketLaunch size={48} weight="duotone" color={PRIMARY} />
          </div>
          <div className="absolute -top-4 -right-6 animate-bounce delay-100">
            <Sparkle size={28} weight="fill" color="#FFD700" />
          </div>
          <div className="absolute top-12 -left-8 animate-bounce delay-300">
            <Sparkle size={20} weight="fill" color="#FFD700" />
          </div>
        </div>

        {/* Text Area */}
        <div className="flex items-center gap-2 mb-3 bg-[#e8f5e9] px-3 py-1 rounded-full border border-[#c8e6c9]">
          <div className="w-2 h-2 rounded-full bg-[#2e7d32] animate-pulse" />
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#2e7d32]">
            Profile Live
          </p>
        </div>

        <h1 className="text-[2.25rem] font-bold tracking-tight text-[#1a1c1e] leading-snug mb-3">
          You're all set!
        </h1>
        
        <p className="text-[15px] text-[#44474f] leading-relaxed mb-10 max-w-sm">
          Welcome to the HomeGuru educator network. Your profile is now visible to thousands of learners worldwide.
        </p>

        {/* Feature Checklist */}
        <div className="w-full flex flex-col gap-3 mb-10 text-left">
          <div className="flex items-center gap-4 bg-white border border-[#e1e2ec] p-4 rounded-[16px]">
            <div className="w-10 h-10 rounded-full bg-[#f0f4ff] flex items-center justify-center shrink-0">
              <Student size={20} color="#2251cc" weight="duotone" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#1a1c1e]">Ready for Students</span>
              <span className="text-[12px] text-[#8888aa]">Accept bookings instantly</span>
            </div>
            <CheckCircle size={20} weight="fill" color="#2e7d32" className="ml-auto" />
          </div>

          <div className="flex items-center gap-4 bg-white border border-[#e1e2ec] p-4 rounded-[16px]">
            <div className="w-10 h-10 rounded-full bg-[#fcf4ed] flex items-center justify-center shrink-0">
              <Wallet size={20} color={PRIMARY} weight="duotone" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#1a1c1e]">Payments Configured</span>
              <span className="text-[12px] text-[#8888aa]">Weekly automatic settlements</span>
            </div>
            <CheckCircle size={20} weight="fill" color="#2e7d32" className="ml-auto" />
          </div>

          <div className="flex items-center gap-4 bg-white border border-[#e1e2ec] p-4 rounded-[16px]">
            <div className="w-10 h-10 rounded-full bg-[#f4f4f8] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} color="#44474f" weight="duotone" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#1a1c1e]">Verified Educator</span>
              <span className="text-[12px] text-[#8888aa]">Govt. ID verified via DigiLocker</span>
            </div>
            <CheckCircle size={20} weight="fill" color="#2e7d32" className="ml-auto" />
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard")} // Final destination
          className="group w-full max-w-[280px] h-[44px] rounded-full text-[15px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 active:scale-[0.98] hover:opacity-90"
          style={{ backgroundColor: "#1a1c1e", color: "#ffffff" }}
        >
          Continue to Dashboard
          <ArrowRight size={20} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>

      </div>
    </div>
  );
}
