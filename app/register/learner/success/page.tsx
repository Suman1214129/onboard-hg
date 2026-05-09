"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import StudentSprite from "../../../../assets/student.png";
import { CheckCircle, CircleNotch } from "@phosphor-icons/react";

const PRIMARY = "#2251cc";

export default function LearnerSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard"); // Redirect to dashboard
    }, 3000); // 3 second delay
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Left Panel ── */}
      <div className="w-1/2 relative overflow-hidden flex flex-col px-12 py-10 bg-gradient-to-br from-[#e6edfc] via-[#fcfcfd] to-[#fce4d2] border-r border-[#e1e2ec]">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-[#2251cc] opacity-[0.08] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] bg-[#e07b2a] opacity-[0.08] blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full">
          <img src="/logo.png" alt="HomeGuru Logo" className="w-[130px] h-[40px] object-contain" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-8 text-center mt-8">
          <style>{`
            @keyframes play-role-sprite {
              from { transform: translateX(0); }
              to { transform: translateX(-100%); }
            }
            .role-sprite-anim {
              animation: play-role-sprite 2.5s steps(5) infinite;
            }
          `}</style>
          <div className="w-[140px] h-[140px] overflow-hidden">
            <img 
              src={StudentSprite.src} 
              alt="Learner Mascot" 
              className="h-[140px] max-w-none role-sprite-anim block"
              style={{ width: "calc(140px * 5)" }}
            />
          </div>

          <div>
            <p className="text-[2rem] font-medium tracking-tight text-[#1a1c1e] leading-snug">
              You are
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#e07b2a] pb-1">
              all set.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            Welcome to HomeGuru. Get ready to explore a world of learning!
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center max-w-sm px-8">
          <div className="w-20 h-20 rounded-full bg-[#e6edfc] flex items-center justify-center mb-6">
            <CheckCircle size={48} weight="fill" color={PRIMARY} />
          </div>
          
          <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug mb-3">
            Profile Created!
          </h1>
          
          <p className="text-[14px] text-[#44474f] font-medium leading-relaxed mb-10">
            Your learning journey is about to begin. We are redirecting you to your personalized dashboard.
          </p>

          <div className="flex items-center gap-3 text-[#8888aa]">
            <CircleNotch size={20} className="animate-spin" weight="bold" />
            <span className="text-[13px] font-semibold tracking-wide uppercase">Redirecting...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
