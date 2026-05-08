import Image from "next/image";

interface LeftPanelProps {
  bg: string;
  primary: string;
  onPrimaryContainer?: string;
  img?: string;
  line1: string;
  line2: string;
  sub: string;
  children?: React.ReactNode;
}

export default function LeftPanel({
  bg, primary, onPrimaryContainer = "#001258",
  img = "/owl.png", line1, line2, sub, children,
}: LeftPanelProps) {
  return (
    <div className="w-1/2 flex flex-col px-12 py-10 h-screen" style={{ backgroundColor: bg }}>
      <Image src="/logo.png" alt="HomeGuru" width={130} height={40} priority />

      <div className="flex flex-col items-center justify-center flex-1 gap-8 text-center">
        {/* owl + text tightly grouped */}
        <div className="flex flex-col items-center gap-4">
          <Image src={img} alt="Owl mascot" width={300} height={300} />
          <div>
            <p className="text-[2rem] font-medium tracking-[-0.02em] text-[#1a1c1e] leading-snug">{line1}</p>
            <p className="text-[2rem] font-semibold tracking-[-0.02em] italic leading-snug" style={{ color: primary }}>
              {line2}
            </p>
            <p className="text-sm leading-6 max-w-[200px] mx-auto mt-2" style={{ color: onPrimaryContainer }}>
              {sub}
            </p>
          </div>
        </div>

        {/* optional slot — chips, pills, etc */}
        {children}
      </div>
    </div>
  );
}
