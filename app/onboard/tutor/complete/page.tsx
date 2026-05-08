"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PRIMARY       = "#e07b2a";
const PRIMARY_LIGHT = "#fde8d8";

export default function TutorCompletePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">

      {/* ── Left Panel ── */}
      <div className="w-1/2 flex flex-col px-12 py-10" style={{ backgroundColor: PRIMARY_LIGHT }}>
        <Image src="/logo.png" alt="HomeGuru" width={130} height={40} priority />
        <div className="flex flex-col items-center justify-center flex-1 gap-8 text-center">
          <Image src="/about.png" alt="Owl celebrating" width={300} height={300} />
          <div>
            <p className="text-[2rem] font-medium tracking-[-0.02em] text-[#1a1c1e] leading-snug">You&apos;re all</p>
            <p className="text-[2rem] font-semibold tracking-[-0.02em] italic leading-snug" style={{ color: PRIMARY }}>set to teach.</p>
          </div>
          <p className="text-sm leading-6 max-w-[200px]" style={{ color: "#2d1600" }}>
            Your profile is live. Learners can now find and book you.
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-5">

          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Welcome aboard</p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Your tutor profile<br />is ready 🎉
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">
              Here&apos;s what happens next.
            </p>
          </div>

          {/* Next steps */}
          <div className="flex flex-col gap-2.5">
            {[
              { icon: "manage_search", title: "Get discovered",    desc: "Learners searching for your subjects will find your profile." },
              { icon: "event_available", title: "Accept bookings", desc: "You'll get notified when a learner books a session with you." },
              { icon: "payments",      title: "Get paid",          desc: "Earnings are transferred after each completed session." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 px-5 py-4 rounded-[16px] bg-white" style={{ border: "1.5px solid #e1e2ec" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: PRIMARY_LIGHT }}>
                  <span className="material-symbols-rounded text-[20px]" style={{ color: PRIMARY }}>{icon}</span>
                </div>
                <div>
                  <p className="font-semibold text-[14px] text-[#1a1c1e]">{title}</p>
                  <p className="text-[12px] text-[#6b6f7a] mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push("/")}
            className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ backgroundColor: PRIMARY, color: "#fff" }}
          >
            Go to my dashboard
            <span className="material-symbols-rounded text-[18px]">arrow_forward</span>
          </button>

        </div>
      </div>
    </div>
  );
}
