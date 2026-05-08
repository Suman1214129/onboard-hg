"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PRIMARY       = "#2251cc";
const PRIMARY_LIGHT = "#dce6fb";

const LANGUAGES   = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi", "Gujarati", "Punjabi", "Urdu", "Other"];
const COUNTRIES   = ["India", "United States", "United Kingdom", "Canada", "Australia", "UAE", "Singapore", "Other"];
const INDIA_STATES = ["Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal", "Other"];
const GENDERS     = [
  { key: "male",   icon: "man",    label: "Male"   },
  { key: "female", icon: "woman",  label: "Female" },
  { key: "other",  icon: "person", label: "Other"  },
];

const STEPS = ["Identity", "Location"] as const;
type Step = 0 | 1;

const LEFT = [
  { line1: "Nice to",    line2: "meet you.",   sub: "A few details help us personalise your experience." },
  { line1: "Where are",  line2: "you from?",   sub: "We'll find tutors near you too." },
];

function InputField({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-medium text-[#44474f]">{label}</label>
      <div className="flex items-center gap-3 rounded-[14px] px-4 py-3 bg-white" style={{ border: "1.5px solid #e1e2ec" }}>
        <span className="material-symbols-rounded text-[18px] shrink-0" style={{ color: "#8888aa" }}>{icon}</span>
        {children}
      </div>
    </div>
  );
}

function SelectField({ icon, label, value, onChange, options, placeholder }: {
  icon: string; label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string;
}) {
  return (
    <InputField icon={icon} label={label}>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="flex-1 bg-transparent text-[13.5px] outline-none appearance-none"
        style={{ color: value ? "#1a1c1e" : "#9a9aa8" }}>
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="material-symbols-rounded text-[16px] shrink-0" style={{ color: "#8888aa" }}>expand_more</span>
    </InputField>
  );
}

export default function AboutPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(0);

  // Step 0
  const [name,   setName]   = useState("");
  const [dob,    setDob]    = useState("");
  const [gender, setGender] = useState("");
  // Step 1
  const [language, setLanguage] = useState("");
  const [country,  setCountry]  = useState("");
  const [state,    setState]    = useState("");
  const [city,     setCity]     = useState("");

  const canNext = [
    name.trim() && dob && gender,
    language && country && city.trim(),
  ][step];

  function next() {
    if (step < 1) setStep(1);
    else router.push("/onboard/complete");
  }

  const panel = LEFT[step];

  return (
    <div className="flex h-screen overflow-hidden">

      {/* ── Left Panel ── */}
      <div className="w-1/2 flex flex-col px-12 py-10 h-screen" style={{ backgroundColor: PRIMARY_LIGHT }}>
        <Image src="/logo.png" alt="HomeGuru" width={130} height={40} priority />

        <div className="flex flex-col items-center justify-center flex-1 gap-8 text-center">
          <div className="rounded-[28px] p-5" style={{ backgroundColor: `${PRIMARY}18` }}>
            <Image src="/owl.png" alt="Owl mascot" width={260} height={260} />
          </div>
          <div>
            <p className="text-[2rem] font-medium tracking-[-0.02em] text-[#1a1c1e] leading-snug">{panel.line1}</p>
            <p className="text-[2rem] font-semibold tracking-[-0.02em] italic leading-snug" style={{ color: PRIMARY }}>{panel.line2}</p>
          </div>
          <p className="text-sm leading-6 max-w-[200px]" style={{ color: "#001258" }}>{panel.sub}</p>
        </div>


      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-5">

          {step > 0 && (
            <button onClick={() => setStep(0)} className="flex items-center gap-1.5 text-[13px] font-medium w-fit" style={{ color: PRIMARY }}>
              <span className="material-symbols-rounded text-[18px]">arrow_back</span>Back
            </button>
          )}

          {/* ── Step 0: Identity ── */}
          {step === 0 && (
            <>
              <div>
                <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>About you</p>
                <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">Tell us a little<br />about yourself</h1>
                <p className="text-sm text-[#44474f] mt-1.5">This helps tutors connect with you better.</p>
              </div>
              <div className="flex flex-col gap-3">
                <InputField icon="badge" label="Full name">
                  <input type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)}
                    className="flex-1 bg-transparent text-[13.5px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]" />
                </InputField>
                <InputField icon="cake" label="Date of birth">
                  <input type="date" value={dob} onChange={e => setDob(e.target.value)}
                    className="flex-1 bg-transparent text-[13.5px] outline-none"
                    style={{ color: dob ? "#1a1c1e" : "#9a9aa8" }} />
                </InputField>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-[#44474f]">I&apos;m</label>
                  <div className="flex gap-2">
                    {GENDERS.map(({ key, icon, label }) => {
                      const isOn = gender === key;
                      return (
                        <button key={key} onClick={() => setGender(key)}
                          className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[14px] transition-all duration-200"
                          style={{ border: `1.5px solid ${isOn ? PRIMARY : "#e1e2ec"}`, backgroundColor: isOn ? PRIMARY_LIGHT : "#ffffff" }}>
                          <span className="material-symbols-rounded text-[20px]" style={{ color: isOn ? PRIMARY : "#8888aa" }}>{icon}</span>
                          <span className="text-[12px] font-medium" style={{ color: isOn ? PRIMARY : "#44474f" }}>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Step 1: Language + Location ── */}
          {step === 1 && (
            <>
              <div>
                <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Location</p>
                <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">Where are<br />you based?</h1>
                <p className="text-sm text-[#44474f] mt-1.5">Helps us find tutors near you.</p>
              </div>
              <div className="flex flex-col gap-3">
                <SelectField icon="translate" label="Preferred language" value={language} onChange={setLanguage} options={LANGUAGES} placeholder="Select a language" />
                <SelectField icon="public" label="Country" value={country} onChange={v => { setCountry(v); setState(""); }} options={COUNTRIES} placeholder="Select your country" />
                {country === "India" && (
                  <SelectField icon="map" label="State" value={state} onChange={setState} options={INDIA_STATES} placeholder="Select your state" />
                )}
                <InputField icon="location_city" label="City">
                  <input type="text" placeholder="Your city" value={city} onChange={e => setCity(e.target.value)}
                    className="flex-1 bg-transparent text-[13.5px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]" />
                </InputField>
              </div>
            </>
          )}

          <button
            onClick={next}
            disabled={!canNext}
            className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ backgroundColor: canNext ? PRIMARY : `${PRIMARY}40`, color: "#fff", cursor: canNext ? "pointer" : "not-allowed" }}
          >
            {step === 1 ? "All done" : "Continue"}
            <span className="material-symbols-rounded text-[18px]">{step === 1 ? "check" : "arrow_forward"}</span>
          </button>

        </div>
      </div>
    </div>
  );
}
