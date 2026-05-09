"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, User, Calendar, MapPin, ArrowLeft, CaretDown, CaretLeft, CaretRight, IdentificationBadge, Translate, GraduationCap, GlobeHemisphereWest, MapTrifold, UploadSimple, ShieldCheck, WarningCircle, ChatCircleText } from "@phosphor-icons/react";
import TeacherSprite from "../../../../assets/teacher.png";

const PRIMARY = "#e07b2a";

const INDIA_STATES_CITIES: Record<string, string[]> = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "Dwarka"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Asansol"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Agra", "Varanasi", "Meerut"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"]
};

function M3Dropdown({ label, value, onChange, options, placeholder, icon: Icon }: any) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o: any) => o.value === value)?.label;

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="text-[12px] font-medium text-[#44474f]">{label}</label>
      <div 
        className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200 bg-[#f4f4f8] cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Icon size={20} color="#8888aa" weight="duotone" className="shrink-0" />
        <div className="flex-1 flex items-center justify-between min-w-0">
          <span className="text-[14px] truncate" style={{ color: value ? "#1a1c1e" : "#9a9aa8" }}>
            {selectedLabel || placeholder}
          </span>
          <CaretDown size={16} weight="bold" color="#8888aa" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[16px] border border-[#e1e2ec] p-1.5 z-50 flex flex-col gap-0.5 max-h-[220px] overflow-y-auto custom-scrollbar shadow-lg">
            {options.map((opt: any) => {
               const isSelected = value === opt.value;
               return (
                 <button
                   key={opt.value}
                   type="button"
                   onClick={() => { onChange(opt.value); setOpen(false); }}
                   className="flex items-center px-3 py-2.5 rounded-[12px] transition-colors hover:bg-[#f4f4f8] text-left"
                   style={{ backgroundColor: isSelected ? "#fce4d2" : "transparent" }}
                 >
                   <span className="text-[13px] font-medium" style={{ color: isSelected ? PRIMARY : "#1a1c1e" }}>{opt.label}</span>
                 </button>
               )
            })}
          </div>
        </>
      )}
    </div>
  );
}

function CombinedLanguageFluencyDropdown({ language, setLanguage, fluency, setFluency }: any) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const languages = [
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "Other", value: "other" },
  ];

  const fluencies = [
    { label: "Basic", value: "basic" },
    { label: "Conversational", value: "conversational" },
    { label: "Fluent", value: "fluent" },
    { label: "Native / Bilingual", value: "native" },
  ];

  const selectedLangLabel = languages.find(l => l.value === language)?.label;
  const selectedFluencyLabel = fluencies.find(f => f.value === fluency)?.label;

  const displayValue = (language && fluency) 
    ? `${selectedLangLabel} • ${selectedFluencyLabel}`
    : language 
      ? `${selectedLangLabel} • Select fluency` 
      : "Select language & fluency";

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="text-[12px] font-medium text-[#44474f]">Primary Language & Fluency</label>
      <div 
        className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200 bg-[#f4f4f8] cursor-pointer"
        onClick={() => { setOpen(!open); setStep(language && !fluency ? 2 : 1); }}
      >
        <Translate size={20} color="#8888aa" weight="duotone" className="shrink-0" />
        <div className="flex-1 flex items-center justify-between min-w-0">
          <span className="text-[14px] truncate" style={{ color: (language && fluency) ? "#1a1c1e" : "#9a9aa8" }}>
            {displayValue}
          </span>
          <CaretDown size={16} weight="bold" color="#8888aa" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[16px] border border-[#e1e2ec] p-2 z-50 flex flex-col gap-1 shadow-lg">
            {step === 1 && (
              <>
                <div className="px-2 py-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#8888aa] uppercase tracking-wider">Select Language</span>
                </div>
                {languages.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setLanguage(opt.value); 
                      setStep(2); 
                    }}
                    className="flex items-center px-3 py-2.5 rounded-[12px] transition-colors hover:bg-[#f4f4f8] text-left"
                  >
                    <span className="text-[13px] font-medium text-[#1a1c1e]">{opt.label}</span>
                  </button>
                ))}
              </>
            )}

            {step === 2 && (
              <>
                <div className="px-2 py-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#8888aa] uppercase tracking-wider">Fluency ({selectedLangLabel})</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setStep(1); }}
                    className="text-[11px] text-[#e07b2a] font-bold hover:underline"
                  >
                    Change
                  </button>
                </div>
                {fluencies.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setFluency(opt.value); 
                      setOpen(false); 
                    }}
                    className="flex items-center px-3 py-2.5 rounded-[12px] transition-colors hover:bg-[#f4f4f8] text-left"
                  >
                    <span className="text-[13px] font-medium text-[#1a1c1e]">{opt.label}</span>
                  </button>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function M3DatePicker({ label, value, onChange, icon: Icon, error }: any) {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2000, 0, 1)); 

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const handleDayClick = (day: number) => {
     const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
     const yyyy = newDate.getFullYear();
     const mm = String(newDate.getMonth() + 1).padStart(2, '0');
     const dd = String(newDate.getDate()).padStart(2, '0');
     onChange(`${yyyy}-${mm}-${dd}`);
     setOpen(false);
  }

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="text-[12px] font-medium text-[#44474f]">{label}</label>
      <div 
        className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200 bg-[#f4f4f8] cursor-pointer"
        onClick={() => setOpen(!open)}
        style={{ border: error ? "1.5px solid #e07b2a" : "1.5px solid transparent" }}
      >
        <Icon size={20} color={error ? PRIMARY : "#8888aa"} weight="duotone" className="shrink-0" />
        <div className="flex-1 text-[14px]" style={{ color: value ? "#1a1c1e" : "#9a9aa8" }}>
          {value ? value : "YYYY-MM-DD"}
        </div>
      </div>
      
      {error && <p className="text-[11.5px] text-[#e07b2a] flex items-center gap-1 mt-0.5"><WarningCircle size={13} weight="fill" /> {error}</p>}

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-[20px] border border-[#e1e2ec] p-4 z-50 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <button onClick={prevMonth} type="button" className="p-1 hover:bg-[#f4f4f8] rounded-full text-[#44474f]"><CaretLeft size={16} /></button>
              <span className="text-[13px] font-bold text-[#1a1c1e]">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
              <button onClick={nextMonth} type="button" className="p-1 hover:bg-[#f4f4f8] rounded-full text-[#44474f]"><CaretRight size={16} /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="text-[11px] font-semibold text-[#8888aa]">{d}</div>)}
              {Array.from({length: firstDay}).map((_, i) => <div key={`empty-${i}`} />)}
              {Array.from({length: daysInMonth}).map((_, i) => {
                const day = i + 1;
                const dStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                const isSelected = dStr === value;
                return (
                  <button 
                    key={day}
                    onClick={() => handleDayClick(day)}
                    type="button"
                    className={`w-7 h-7 mx-auto flex items-center justify-center rounded-full text-[12px] transition-colors ${isSelected ? "text-white font-semibold" : "text-[#1a1c1e] hover:bg-[#f4f4f8]"}`}
                    style={{ backgroundColor: isSelected ? PRIMARY : "transparent" }}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function TutorProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const first = sessionStorage.getItem('hg_firstName') || '';
    const last = sessionStorage.getItem('hg_lastName') || '';
    if (first || last) setName(`${first} ${last}`.trim());
  }, []);
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [fluency, setFluency] = useState("");
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState<string[]>([]);

  const calculateAge = (dobString: string) => {
    if (!dobString) return 0;
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  };

  const age = calculateAge(dob);
  const ageError = dob && age < 18 ? "You must be at least 18 years old to tutor." : "";

  const canSubmit = name.trim().length > 0 && dob && !ageError && gender && language && fluency && type && country && state.trim().length > 0 && city.trim().length > 0;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Left Panel ── */}
      <div className="w-1/2 relative overflow-hidden flex flex-col px-12 py-10 bg-gradient-to-br from-[#e6edfc] via-[#fcfcfd] to-[#fce4d2] border-r border-[#e1e2ec]">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-[#2251cc] opacity-[0.08] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] bg-[#e07b2a] opacity-[0.08] blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full">
          <Image src="/logo.png" alt="HomeGuru Logo" width={130} height={40} priority />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-8 text-center mt-8">
          <style>{`
            @keyframes play-role-sprite {
              from { transform: translateX(0); }
              to { transform: translateX(-100%); }
            }
            .role-sprite-anim {
              animation: play-role-sprite 2.5s steps(4) infinite;
            }
          `}</style>
          <div className="w-[140px] h-[140px] overflow-hidden">
            <img 
              src={TeacherSprite.src} 
              alt="Teacher Mascot" 
              className="h-[140px] max-w-none role-sprite-anim block"
              style={{ width: "calc(140px * 4)" }}
            />
          </div>

          <div>
            <p className="text-[2rem] font-medium tracking-tight text-[#1a1c1e] leading-snug">
              Nice to
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#e07b2a] pb-1">
              meet you.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            Just a few more details to set up your tutor profile.
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] overflow-y-auto custom-scrollbar">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #dce0ea; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c4c6d0; }
        `}</style>
        <div className="min-h-full w-full flex items-center justify-center py-16">
          <div className="w-full max-w-md px-10 flex flex-col gap-5">
            <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium w-fit" style={{ color: PRIMARY }}>
              <ArrowLeft size={18} weight="bold" />
              Back
            </button>

            <div>
              <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Profile</p>
              <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
                Tell us a bit<br />about yourself
              </h1>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-medium text-[#44474f]">Full name</label>
                <div className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200 bg-[#f4f4f8]">
                  <User size={20} color="#8888aa" weight="duotone" />
                  <input
                    type="text"
                    placeholder="e.g. Aditi Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                  />
                </div>
              </div>

              {/* Date of Birth with age validation */}
              <M3DatePicker 
                label="Date of Birth"
                value={dob}
                onChange={setDob}
                icon={Calendar}
                error={ageError}
              />

              {/* Gender */}
              <M3Dropdown 
                label="Gender"
                value={gender}
                onChange={setGender}
                icon={IdentificationBadge}
                placeholder="Select"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                  { label: "Prefer not to say", value: "prefer-not-to-say" },
                ]}
              />

              <CombinedLanguageFluencyDropdown 
                language={language}
                setLanguage={setLanguage}
                fluency={fluency}
                setFluency={setFluency}
              />

              {/* Type / Role */}
              <M3Dropdown 
                label="What best describes you?"
                value={type}
                onChange={setType}
                icon={GraduationCap}
                placeholder="Select your profession"
                options={[
                  { label: "Professional Teacher", value: "professional_teacher" },
                  { label: "Working Professional", value: "working_professional" },
                  { label: "College Student", value: "college_student" },
                  { label: "Freelance Tutor", value: "freelancer" },
                ]}
              />


              {/* Country */}
              <M3Dropdown 
                label="Country"
                value={country}
                onChange={setCountry}
                icon={GlobeHemisphereWest}
                placeholder="Select country"
                options={[
                  { label: "India", value: "india" },
                  { label: "United States", value: "usa" },
                  { label: "United Kingdom", value: "uk" },
                  { label: "Canada", value: "canada" },
                  { label: "Australia", value: "australia" },
                  { label: "Other", value: "other" },
                ]}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* State */}
                {country === "india" ? (
                  <M3Dropdown 
                    label="State"
                    value={INDIA_STATES_CITIES[state] ? state : ""}
                    onChange={(val: string) => { setState(val); setCity(""); }}
                    icon={MapTrifold}
                    placeholder="Select state"
                    options={Object.keys(INDIA_STATES_CITIES).map(s => ({ label: s, value: s }))}
                  />
                ) : (
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-[12px] font-medium text-[#44474f]">State / Province</label>
                    <div className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200 bg-[#f4f4f8]">
                      <MapTrifold size={20} color="#8888aa" weight="duotone" className="shrink-0" />
                      <input
                        type="text"
                        placeholder="e.g. MH"
                        value={state}
                        onChange={(e) => { setState(e.target.value); setCity(""); }}
                        className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8] min-w-0"
                      />
                    </div>
                  </div>
                )}

                {/* City */}
                {country === "india" && INDIA_STATES_CITIES[state] ? (
                  <M3Dropdown 
                    label="City"
                    value={city}
                    onChange={setCity}
                    icon={MapPin}
                    placeholder="Select city"
                    options={INDIA_STATES_CITIES[state].map(c => ({ label: c, value: c }))}
                  />
                ) : (
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-[12px] font-medium text-[#44474f]">City</label>
                    <div className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200 bg-[#f4f4f8]">
                      <MapPin size={20} color="#8888aa" weight="duotone" className="shrink-0" />
                      <input
                        type="text"
                        placeholder="e.g. Mumbai"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8] min-w-0"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Degrees / Certificates — Multiple Upload */}
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-[12px] font-medium text-[#44474f] flex items-center justify-between">
                  <span>Degrees / Certificates</span>
                  <span className="text-[10px] bg-[#f4f4f8] px-2 py-0.5 rounded-full text-[#6b6f7a]">Optional</span>
                </label>

                {files.length > 0 && (
                  <div className="flex flex-col gap-2 mb-1">
                    {files.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-3 rounded-[16px] px-4 py-3 bg-[#f4f4f8]">
                        <ShieldCheck size={18} weight="duotone" color={PRIMARY} className="shrink-0" />
                        <span className="flex-1 text-[13px] font-medium text-[#1a1c1e] truncate">{f}</span>
                        <button type="button" onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))} className="text-[12px] font-medium text-[#ba1a1a] hover:underline shrink-0">Remove</button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="flex items-center justify-center gap-3 rounded-[16px] px-4 py-5 border-[1.5px] border-dashed border-[#c4c6d0] transition-all duration-200 hover:bg-[#f4f4f8] cursor-pointer">
                  <input type="file" className="hidden" multiple onChange={(e) => {
                    const newFiles = Array.from(e.target.files || []).map(f => f.name);
                    setFiles(prev => [...prev, ...newFiles]);
                    e.target.value = "";
                  }} accept=".pdf,.png,.jpg,.jpeg" />
                  <div className="flex flex-col items-center gap-1.5">
                    <UploadSimple size={22} color="#8888aa" weight="duotone" />
                    <span className="text-[13px] text-[#44474f] font-medium">{files.length > 0 ? "Add more files" : "Upload qualifications"}</span>
                    <span className="text-[11px] text-[#8888aa]">PDF, JPG, PNG up to 5MB each</span>
                  </div>
                </label>
              </div>

            </div>

            <button
              onClick={() => canSubmit && router.push("/register/tutor/overview")}
              disabled={!canSubmit}
              className={`group w-full h-[44px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 mt-4 sticky bottom-8 ${
                canSubmit ? "active:scale-[0.98] hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed"
              }`}
              style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
            >
              Continue
              <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 ${canSubmit ? "group-hover:translate-x-1" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

