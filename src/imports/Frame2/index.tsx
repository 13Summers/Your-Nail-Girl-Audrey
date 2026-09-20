import svgPaths from "./svg-yd3d1j4bea";
import imgFrame2 from "./e69d78d1a00d5fe688d283a6c69fbf69a9aa5013.png";
import imgHeroImage from "./bcf9b889c2c7102b590fc8ac64436f6803a343e6.png";

function Frame1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-center justify-center relative shrink-0 text-[#3a291f] w-[186px] whitespace-nowrap">
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[normal] mb-[-7px] relative shrink-0 text-[16px] uppercase" style={{ fontVariationSettings: '"wdth" 100' }}>
        YOUR NAIL GIRL
      </p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[60px] not-italic relative shrink-0 text-[60px]">AUDREY</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Instrument_Sans:Medium',sans-serif] font-medium gap-[32px] items-center leading-[normal] relative shrink-0 text-[#3a291f] text-[14px] whitespace-nowrap" data-name="Frame">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Portfolio
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Services
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        About
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Contact
      </p>
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="search">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="search">
          <path d={svgPaths.p1615880} id="Vector" stroke="var(--stroke-0, #3A291F)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#3A291F] content-stretch flex items-center justify-center px-[28px] py-[14px] relative rounded-[100px] shrink-0" data-name="button">
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#FAF5EF] text-[14px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Book Now
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Frame">
      <Search />
      <Button />
    </div>
  );
}

function Navbar() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] content-stretch flex h-[88px] items-center justify-between left-0 px-[80px] shadow-[0px_4px_15.5px_0px_rgba(239,232,225,0.25)] top-0 w-[1440px]" data-name="navbar">
      <Frame1 />
      <Frame />
      <Frame3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-[#3a291f] w-full" data-name="Frame">
      <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[72px] w-full">Chic, Custom Nails in North Salt Lake</p>
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: '"wdth" 100' }}>
        Your Nail Girl, Audrey is a private nail studio in North Salt Lake offering gel nails, acrylics, manicures, and custom nail art for clients in North Salt Lake, Woods Cross, Bountiful, and surrounding Davis County areas.
      </p>
    </div>
  );
}

function HeroContent() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="hero-content">
      <div className="content-stretch flex flex-col gap-[40px] items-start pr-[80px] relative size-full">
        <Frame4 />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="absolute content-stretch flex h-[819px] items-center left-0 overflow-clip px-[80px] top-[88px] w-[1440px]" data-name="hero">
      <HeroContent />
      <div className="h-full relative shrink-0 w-[720px]" data-name="hero-image">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgHeroImage} />
      </div>
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="relative size-full">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgFrame2} />
        <div className="absolute bg-gradient-to-l from-[rgba(255,255,255,0)] inset-0 to-[rgba(255,255,255,0.73)]" />
      </div>
      <Navbar />
      <Hero />
    </div>
  );
}