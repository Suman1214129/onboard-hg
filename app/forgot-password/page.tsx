"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeSimple, CheckCircle, WarningCircle } from "@phosphor-icons/react";

const PRIMARY       = "#2251cc";
const PRIMARY_LIGHT = "#dce6fb";

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email,   setEmail]   = useState("");
  const [touched, setTouched] = useState(false);
  const [sent,    setSent]    = useState(false);

  const emailValid = isValidEmail(email);
  const emailError = touched && email && !emailValid;

  function handleSend() {
    if (!emailValid) return;
    setSent(true);
  }

  return (
    <div className="flex min-h-screen">

      {/* ── Left Panel ── */}
      <div className="w-1/2 flex flex-col px-12 py-10" style={{ backgroundColor: PRIMARY_LIGHT }}>
        <Image src="/logo.png" alt="HomeGuru" width={130} height={40} priority />
        <div className="flex flex-col items-center justify-center flex-1 gap-8 text-center">
          <Image src="/authenticate.png" alt="Owl" width={300} height={300} />
          <div>
            <p className="text-[2rem] font-medium tracking-[-0.02em] text-[#1a1c1e] leading-snug">Happens to</p>
            <p className="text-[2rem] font-semibold tracking-[-0.02em] italic leading-snug" style={{ color: PRIMARY }}>
              the best of us.
            </p>
          </div>
          <p className="text-sm leading-6 max-w-[200px]" style={{ color: "#001258" }}>
            We&apos;ll send a reset link to your inbox. Back in seconds.
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-4">

          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium w-fit" style={{ color: PRIMARY }}>
            <span className="material-symbols-rounded text-[18px]">arrow_back</span>Back
          </button>

          {!sent ? (
            <>
              <div className="mb-2">
                <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Reset password</p>
                <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">Forgot your<br />password?</h1>
                <p className="text-sm text-[#44474f] mt-1.5">Enter your email and we&apos;ll send you a reset link.</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-medium text-[#44474f]">Email address</label>
                <div
                  className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                  style={{
                    backgroundColor: "#f4f4f8",
                    outline: email ? (emailValid ? `2px solid ${PRIMARY}` : touched ? "2px solid #c0392b" : "2px solid transparent") : "2px solid transparent",
                  }}
                >
                  <EnvelopeSimple size={20} color={email && emailValid ? PRIMARY : "#8888aa"} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(true)}
                    className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                  />
                  {email && (emailValid
                    ? <CheckCircle size={18} color={PRIMARY} weight="fill" />
                    : touched && <WarningCircle size={18} color="#c0392b" weight="fill" />
                  )}
                </div>
                {emailError && <p className="text-[11.5px] text-[#c0392b] flex items-center gap-1"><WarningCircle size={13} weight="fill" />Enter a valid email address</p>}
              </div>

              <button
                onClick={handleSend}
                disabled={!emailValid}
                className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 mt-1"
                style={{ backgroundColor: emailValid ? PRIMARY : `${PRIMARY}40`, color: "#fff", cursor: emailValid ? "pointer" : "not-allowed" }}
              >
                Send reset link
                <span className="material-symbols-rounded text-[18px]">send</span>
              </button>

              <p className="text-center text-sm text-[#44474f]">
                Remember it?{" "}
                <span onClick={() => router.push("/login")} className="font-medium cursor-pointer hover:underline" style={{ color: PRIMARY }}>Sign in</span>
              </p>
            </>
          ) : (
            <>
              <div className="mb-2">
                <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Check your inbox</p>
                <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">Reset link<br />sent!</h1>
                <p className="text-sm text-[#44474f] mt-1.5">We sent a password reset link to</p>
                <p className="text-[13.5px] font-semibold mt-0.5" style={{ color: PRIMARY }}>{email}</p>
              </div>

              <div className="flex flex-col gap-3">
                <EnvelopeSimple size={36} color={PRIMARY} weight="duotone" />
                <p className="text-[12.5px] text-[#9a9aa8] leading-relaxed">
                  Click the link in the email to reset your password. Check your spam folder if you don&apos;t see it.
                </p>
              </div>

              <button
                onClick={() => router.push("/login")}
                className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ backgroundColor: PRIMARY, color: "#fff" }}
              >
                Back to sign in
                <span className="material-symbols-rounded text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={() => { setSent(false); setEmail(""); setTouched(false); }}
                className="text-center text-[13px] font-medium"
                style={{ color: "#9a9aa8" }}
              >
                Use a different email
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
