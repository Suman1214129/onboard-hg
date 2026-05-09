"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, CaretDown, Student, GraduationCap, Medal, Books, Buildings, ChalkboardTeacher } from "@phosphor-icons/react";
import StudentSprite from "../../../../assets/student.png";

const PRIMARY = "#2251cc";

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
                   style={{ backgroundColor: isSelected ? "#e6edfc" : "transparent" }}
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

export default function LearnerEducationPage() {
  const router = useRouter();
  
  const [role, setRole] = useState("");
  useEffect(() => {
    const savedRole = sessionStorage.getItem('hg_learner_role');
    if (savedRole) setRole(savedRole);
    else router.replace("/register/learner/profile");
  }, [router]);

  // School Student State
  const [board, setBoard] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [school, setSchool] = useState("");

  // College Student State
  const [collegeField, setCollegeField] = useState("");
  const [collegeYear, setCollegeYear] = useState("");

  // Aspirant State
  const [aspirantField, setAspirantField] = useState("");

  let canSubmit = false;
  if (role === "school_student") canSubmit = board !== "" && studentClass !== "";
  else if (role === "college_student") canSubmit = collegeField.trim() !== "" && collegeYear !== "";
  else if (role === "aspirant") canSubmit = aspirantField !== "";

  if (!role) return null;

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
              Shape your
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#e07b2a] pb-1">
              learning path.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            We use this to customize the experience exactly for your goals.
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
              <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Education Details</p>
              <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
                {role === "school_student" ? "Your academics" : role === "college_student" ? "Your college path" : "Your aspirations"}
              </h1>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              
              {role === "school_student" && (
                <>
                  <M3Dropdown 
                    label="Which board?"
                    value={board}
                    onChange={setBoard}
                    icon={ChalkboardTeacher}
                    placeholder="Select board"
                    options={[
                      { label: "CBSE", value: "cbse" },
                      { label: "ICSE", value: "icse" },
                      { label: "State Board", value: "state" },
                      { label: "IB / Cambridge", value: "international" },
                      { label: "Other", value: "other" },
                    ]}
                  />

                  <M3Dropdown 
                    label="Current class"
                    value={studentClass}
                    onChange={setStudentClass}
                    icon={Books}
                    placeholder="Select class"
                    options={[
                      { label: "Class 1", value: "1" },
                      { label: "Class 2", value: "2" },
                      { label: "Class 3", value: "3" },
                      { label: "Class 4", value: "4" },
                      { label: "Class 5", value: "5" },
                      { label: "Class 6", value: "6" },
                      { label: "Class 7", value: "7" },
                      { label: "Class 8", value: "8" },
                      { label: "Class 9", value: "9" },
                      { label: "Class 10", value: "10" },
                      { label: "Class 11", value: "11" },
                      { label: "Class 12", value: "12" },
                    ]}
                  />

                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-[#44474f]">School name <span className="text-[#8888aa] font-normal">(Optional)</span></label>
                    <div className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200 bg-[#f4f4f8]">
                      <Buildings size={20} color="#8888aa" weight="duotone" />
                      <input
                        type="text"
                        placeholder="e.g. Delhi Public School"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                      />
                    </div>
                  </div>
                </>
              )}

              {role === "college_student" && (
                <>
                  <M3Dropdown 
                    label="Field of study"
                    value={collegeField}
                    onChange={setCollegeField}
                    icon={GraduationCap}
                    placeholder="Select your field"
                    options={[
                      { label: "Engineering (B.Tech / B.E.)", value: "engineering" },
                      { label: "Medicine (MBBS / BDS)", value: "medicine" },
                      { label: "Commerce & Finance (B.Com / BBA)", value: "commerce" },
                      { label: "Science (B.Sc)", value: "science" },
                      { label: "Arts & Humanities (B.A.)", value: "arts" },
                      { label: "Computer Applications (BCA)", value: "computer_apps" },
                      { label: "Law (LLB)", value: "law" },
                      { label: "Architecture (B.Arch)", value: "architecture" },
                      { label: "Other", value: "other" },
                    ]}
                  />

                  <M3Dropdown 
                    label="Current year"
                    value={collegeYear}
                    onChange={setCollegeYear}
                    icon={Student}
                    placeholder="Select year"
                    options={[
                      { label: "1st Year", value: "1" },
                      { label: "2nd Year", value: "2" },
                      { label: "3rd Year", value: "3" },
                      { label: "4th Year", value: "4" },
                      { label: "5th Year or higher", value: "5" },
                    ]}
                  />
                </>
              )}

              {role === "aspirant" && (
                <>
                  <M3Dropdown 
                    label="Target field"
                    value={aspirantField}
                    onChange={setAspirantField}
                    icon={Medal}
                    placeholder="Select target exam or field"
                    options={[
                      { label: "Engineering (JEE, etc.)", value: "engineering" },
                      { label: "Medical (NEET, etc.)", value: "medical" },
                      { label: "Government Jobs (UPSC, SSC, etc.)", value: "govt" },
                      { label: "Olympiads / Scholarships", value: "olympiad" },
                      { label: "Law (CLAT, etc.)", value: "law" },
                      { label: "Business & Management", value: "business" },
                      { label: "Other", value: "other" },
                    ]}
                  />
                </>
              )}

            </div>

            <button
              onClick={() => canSubmit && router.push("/register/learner/success")}
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
