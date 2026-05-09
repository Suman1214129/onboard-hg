"use client";
import { useRouter } from "next/navigation";
import { Confetti, ArrowRight, Star } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const PRIMARY = "#e07b2a";

export default function TutorTestClearedPage() {
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

      {/* Confetti effect (CSS based simple animation) */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: ${PRIMARY};
          border-radius: 50%;
          animation: float-up 3s ease-in forwards;
          opacity: 0;
        }
      `}</style>
      
      {mounted && Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i} 
          className="particle z-0" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: '100%',
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            backgroundColor: ['#e07b2a', '#2251cc', '#fce4d2', '#8888aa'][Math.floor(Math.random() * 4)]
          }} 
        />
      ))}

      <div className="w-full max-w-md flex flex-col items-center z-10 animate-in zoom-in duration-700">
        
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-[#fcf4ed] border-[4px] border-white  flex items-center justify-center z-10 relative">
            <Confetti size={48} weight="duotone" color={PRIMARY} />
          </div>
          <div className="absolute -top-2 -right-4 animate-bounce delay-100">
            <Star size={24} weight="fill" color="#FFD700" />
          </div>
          <div className="absolute top-10 -left-6 animate-bounce delay-300">
            <Star size={20} weight="fill" color="#FFD700" />
          </div>
        </div>

        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-[#2251cc]">
          Assessment Passed
        </p>

        <h1 className="text-[2.25rem] font-bold tracking-tight text-[#1a1c1e] leading-snug mb-3">
          Congratulations!
        </h1>
        
        <p className="text-[15px] text-[#44474f] leading-relaxed mb-10">
          You have successfully cleared the HomeGuru Teaching Assessment. Your expertise has been verified, and you're now one step closer to taking your first class!
        </p>

        <button
          onClick={() => router.push("/register/tutor/fee")}
          className="group w-full max-w-[280px] h-[48px] rounded-full text-[15px] font-bold tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 active:scale-[0.98] hover:opacity-90  "
          style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
        >
          Proceed to Activation
          <ArrowRight size={20} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>

      </div>
    </div>
  );
}

