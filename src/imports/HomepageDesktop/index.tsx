import svgPaths from "./svg-88qtr1km5l";
import imgFrame2 from "./e69d78d1a00d5fe688d283a6c69fbf69a9aa5013.png";
import imgHeroImage from "./bcf9b889c2c7102b590fc8ac64436f6803a343e6.png";
import img20210103Twd1729360XJpg from "./48a11c40cc3eb52ed458f2d72ad7caccdbaae61e.png";
import img20210103Twd1729360XJpg1 from "./efa0bd5e2ea18d83f03f6d64a48bfab6ca579348.png";
import img20210103Twd1729360XJpg2 from "./4d7b668ee67a6dd8112ba803349e670004e45211.png";
import img20210103Twd1729360XJpg3 from "./32ef9a9a9ea2c36b19e78818ac9625dbe6b40068.png";
import imgImage from "./56d36ce6e6123b7ac4b88619e45f092d3a0970f6.png";
import imgRectangle from "./b5a4ad80fa206158aff37df1c490b64f3159b3ed.png";
import { imgLink } from "./svg-irb7j";

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

function Frame2() {
  return (
    <div className="h-[907px] relative shrink-0 w-[1440px]">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgFrame2} />
        <div className="absolute bg-gradient-to-l from-[rgba(255,255,255,0)] inset-0 to-[rgba(255,255,255,0.73)]" />
      </div>
      <Navbar />
      <Hero />
    </div>
  );
}

function Link() {
  return (
    <div className="absolute bg-[#3A291F] h-[80px] left-0 right-1/2 top-0" data-name="Link">
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Brown:Regular',sans-serif] h-[15px] justify-center leading-[0] left-[calc(50%+0.18px)] not-italic text-[#FAF5EF] text-[16px] text-center top-1/2 tracking-[2px] uppercase w-[224.104px]">
        <p className="leading-[normal]">Book an appointment</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute bg-[#3a291f] border-l border-solid border-white h-[80px] left-1/2 right-0 top-0" data-name="Link">
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Brown:Regular',sans-serif] h-[15px] justify-center leading-[0] left-[calc(50%+0.19px)] not-italic text-[16px] text-center text-white top-1/2 tracking-[2px] uppercase w-[242.949px]">
        <p className="leading-[normal]">See my Work</p>
      </div>
    </div>
  );
}

function DivClassFeaturedHeroOverlay() {
  return (
    <div className="h-[80px] relative shrink-0 w-[1440px]" data-name="div class='featured-hero__overlay">
      <Link />
      <Link1 />
    </div>
  );
}

function Component20210103Twd1729360XJpg() {
  return (
    <div className="absolute inset-[0.1px_-15.5px_0.1px_-14.5px]" data-name="20210103_TWD_1729_360x.jpg">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img20210103Twd1729360XJpg} />
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute bg-[#d6735a] h-[389px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-14px_0px] mask-size-[288px_388.8px] top-0 w-[258px]" style={{ maskImage: `url("${imgLink}")` }} data-name="Link">
      <Component20210103Twd1729360XJpg />
    </div>
  );
}

function LinkMaskGroup() {
  return (
    <div className="h-[389px] relative shrink-0 w-full" data-name="Link:mask-group">
      <Link2 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="relative shrink-0 w-full" style={{ backgroundImage: "linear-gradient(-79.3271deg, rgb(152, 121, 67) 0%, rgb(214, 180, 112) 50%, rgb(152, 121, 67) 100%)" }}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <p className="[word-break:break-word] font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#3a291f] text-[14px] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Located in North Salt Lake
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[#6b4f3a] text-[14px] text-center" style={{ fontVariationSettings: '"wdth" 100' }}>
            Serving North Salt Lake, Woods Cross, Bountiful, and surrounding Utah areas.
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[260px]" data-name="Frame">
      <LinkMaskGroup />
      <Frame40 />
      <Frame41 />
    </div>
  );
}

function Component20210103Twd1729360XJpg1() {
  return (
    <div className="absolute inset-[0.1px_-15.5px_0.1px_-14.5px]" data-name="20210103_TWD_1729_360x.jpg">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img20210103Twd1729360XJpg1} />
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute bg-[#d6735a] h-[389px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-14px_0px] mask-size-[288px_388.8px] top-0 w-[258px]" style={{ maskImage: `url("${imgLink}")` }} data-name="Link">
      <Component20210103Twd1729360XJpg1 />
    </div>
  );
}

function LinkMaskGroup1() {
  return (
    <div className="h-[389px] relative shrink-0 w-full" data-name="Link:mask-group">
      <Link3 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="relative shrink-0 w-full" style={{ backgroundImage: "linear-gradient(-79.3271deg, rgb(152, 121, 67) 0%, rgb(214, 180, 112) 50%, rgb(152, 121, 67) 100%)" }}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <p className="[word-break:break-word] font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#3a291f] text-[14px] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Private Studio Setting
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[#6b4f3a] text-[14px] text-center" style={{ fontVariationSettings: '"wdth" 100' }}>
            Appointments take place in Audrey’s brand-new chic studio shed in a quiet residential area
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[260px]" data-name="Frame">
      <LinkMaskGroup1 />
      <Frame42 />
      <Frame43 />
    </div>
  );
}

function Component20210103Twd1729360XJpg2() {
  return (
    <div className="absolute inset-[0.1px_-15.5px_0.1px_-14.5px]" data-name="20210103_TWD_1729_360x.jpg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[129.46%] left-[-26.19%] max-w-none top-[-25.35%] w-[262.13%]" src={img20210103Twd1729360XJpg2} />
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute bg-[#d6735a] h-[389px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-14px_0px] mask-size-[288px_388.8px] top-0 w-[258px]" style={{ maskImage: `url("${imgLink}")` }} data-name="Link">
      <Component20210103Twd1729360XJpg2 />
    </div>
  );
}

function LinkMaskGroup2() {
  return (
    <div className="h-[389px] relative shrink-0 w-full" data-name="Link:mask-group">
      <Link4 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="relative shrink-0 w-full" style={{ backgroundImage: "linear-gradient(-79.3271deg, rgb(152, 121, 67) 0%, rgb(214, 180, 112) 50%, rgb(152, 121, 67) 100%)" }}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <p className="[word-break:break-word] font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#3a291f] text-[14px] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Custom Nail Services
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[#6b4f3a] text-[14px] text-center" style={{ fontVariationSettings: '"wdth" 100' }}>
            Gel nails, acrylic nails, manicures, fills, nail art, and seasonal designs
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[260px]" data-name="Frame">
      <LinkMaskGroup2 />
      <Frame44 />
      <Frame45 />
    </div>
  );
}

function Component20210103Twd1729360XJpg3() {
  return (
    <div className="absolute inset-[0.1px_-15.5px_0.1px_-14.5px]" data-name="20210103_TWD_1729_360x.jpg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[101.59%] left-[4.33%] max-w-none top-[-0.03%] w-[91.45%]" src={img20210103Twd1729360XJpg3} />
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute bg-[#d6735a] h-[389px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-14px_0px] mask-size-[288px_388.8px] top-0 w-[258px]" style={{ maskImage: `url("${imgLink}")` }} data-name="Link">
      <Component20210103Twd1729360XJpg3 />
    </div>
  );
}

function LinkMaskGroup3() {
  return (
    <div className="h-[389px] relative shrink-0 w-full" data-name="Link:mask-group">
      <Link5 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="relative shrink-0 w-full" style={{ backgroundImage: "linear-gradient(-79.3271deg, rgb(152, 121, 67) 0%, rgb(214, 180, 112) 50%, rgb(152, 121, 67) 100%)" }}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <p className="[word-break:break-word] font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#3a291f] text-[14px] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            One-on-One Appointments
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[#6b4f3a] text-[14px] text-center" style={{ fontVariationSettings: '"wdth" 100' }}>
            A comfortable, personal experience from start to finish
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[260px]" data-name="Frame">
      <LinkMaskGroup3 />
      <Frame46 />
      <Frame47 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[82px] items-start relative shrink-0 w-full" data-name="Frame">
      <Frame6 />
      <Frame7 />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function TrustStrip() {
  return (
    <div className="bg-[#FAF5EF] content-stretch flex flex-col gap-[56px] items-center px-[80px] py-[64px] relative shrink-0 w-[1440px]" data-name="trust-strip">
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3A291F] text-[56px] text-center w-full">A private nail studio experience designed to feel polished, personal, and relaxed.</p>
      <Frame5 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-gradient-to-b content-stretch flex from-[#987943] h-[45px] items-center justify-center px-[28px] py-[14px] relative rounded-[100px] shrink-0 to-[#987943] via-1/2 via-[#d6b470]" data-name="button">
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold h-full leading-[normal] relative shrink-0 text-[#3a291f] text-[14px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Explore Services
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-full items-center justify-center px-[32px] relative shrink-0 w-[510px]" data-name="Frame">
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular',sans-serif] leading-[1.1] min-w-full not-italic relative shrink-0 text-[#FAF5EF] text-[72px] w-[min-content]">Nails should feel like you - polished and intentional.</p>
      <p className="[word-break:break-word] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.7] min-w-full relative shrink-0 text-[#FAF5EF] text-[18px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Finding a nail tech who understands your style, pays attention to detail, and creates a comfortable appointment experience can make all the difference. At Your Nail Girl, Audrey, every set is designed to feel personal, elevated, and wearable — whether you love clean neutrals, soft glam, classic French tips, or custom nail art.
      </p>
      <Button1 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#3a291f] content-stretch flex items-center relative shrink-0" data-name="Background">
      <div className="h-[720px] relative shrink-0 w-[510px]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[106.25%] left-0 max-w-none top-[-3.13%] w-full" src={imgImage} />
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Frame10 />
      </div>
    </div>
  );
}

function ValueProp() {
  return (
    <div className="bg-[#FAF5EF] content-stretch flex items-center justify-center px-[80px] py-[120px] relative shrink-0 w-[1440px]" data-name="value-prop">
      <Background />
    </div>
  );
}

function Frame11() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-center w-[720px]" data-name="Frame">
      <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3A291F] text-[48px] w-full">Your appointment, made simple.</p>
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[#6b4f3a] text-[16px] w-full" style={{ fontVariationSettings: '"wdth" 100' }}>
        Booking with Your Nail Girl, Audrey is easy, personal, and designed to help you feel confident before you even sit down.
      </p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[#F5ECE0] flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="Frame">
      <div aria-hidden className="absolute border border-[#a8917e] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
        <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#c49a3c] text-[28px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          1
        </p>
        <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#3A291F] text-[14px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Pick a Base
        </p>
        <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#6b4f3a] text-[16px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Rorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#F5ECE0] flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="Frame">
      <div aria-hidden className="absolute border border-[#a8917e] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
        <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#c49a3c] text-[28px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          2
        </p>
        <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#3A291F] text-[14px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Choose a length
        </p>
        <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#6b4f3a] text-[16px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Rorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#F5ECE0] flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="Frame">
      <div aria-hidden className="absolute border border-[#a8917e] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
        <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#c49a3c] text-[28px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          3
        </p>
        <p className="font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#3A291F] text-[14px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Get Creative
        </p>
        <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#6b4f3a] text-[16px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Rorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0 w-full" data-name="Frame">
      <Frame13 />
      <Frame14 />
      <Frame15 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#3A291F] content-stretch flex items-center justify-center px-[28px] py-[14px] relative rounded-[100px] shrink-0" data-name="button">
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#F5ECE0] text-[14px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Schedule Now
      </p>
    </div>
  );
}

function HowItWorks() {
  return (
    <div className="bg-[#FAF5EF] content-stretch flex flex-col gap-[48px] items-center px-[80px] py-[120px] relative shrink-0 w-[1440px]" data-name="how-it-works">
      <Frame11 />
      <Frame12 />
      <Button2 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] items-center relative shrink-0 text-center w-full" data-name="Frame">
      <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#3A291F] text-[56px] w-[min-content]">Nail services designed for everyday beauty and special moments.</p>
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[#6b4f3a] text-[16px] w-[720px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        From simple, natural nails to custom statement sets, Audrey offers nail services that are polished, feminine, and tailored to your personal style.
      </p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#3A291F] text-[24px] w-[min-content]">Gel Manicure</p>
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#6b4f3a] text-[14px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Experience a luxurious gel manicure that lasts, providing a flawless finish and vibrant color.
      </p>
      <p className="[text-underline-position:from-font] decoration-from-font decoration-solid font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#c49a3c] text-[14px] underline uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        View Service
      </p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Frame">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center px-[16px] relative size-full">
          <div className="h-[320px] relative rounded-[8px] shrink-0 w-[188px]" data-name="Rectangle">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
              <img alt="" className="absolute h-full left-[-67.02%] max-w-none top-0 w-[223.4%]" src={imgRectangle} />
            </div>
          </div>
          <Frame20 />
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start px-[16px] relative size-full">
        <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#3A291F] text-[24px] w-[min-content]">Fill</p>
        <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#6b4f3a] text-[14px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Refresh your nails with our expert fill service, ensuring a seamless new look.
        </p>
        <p className="[text-underline-position:from-font] decoration-from-font decoration-solid font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#c49a3c] text-[14px] underline uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          View Service
        </p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-w-px relative" data-name="Frame">
      <div className="h-[320px] relative rounded-[8px] shrink-0 w-[188px]" data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
          <img alt="" className="absolute h-full left-[-67.02%] max-w-none top-0 w-[223.4%]" src={imgRectangle} />
        </div>
      </div>
      <Frame22 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start px-[16px] relative size-full">
        <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#3A291F] text-[24px] w-[min-content]">Overlay (Natural Nails)</p>
        <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#6b4f3a] text-[14px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Experience a seamless overlay that enhances your natural nails while providing a polished finish.
        </p>
        <p className="[text-underline-position:from-font] decoration-from-font decoration-solid font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#c49a3c] text-[14px] underline uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          View Service
        </p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-w-px relative" data-name="Frame">
      <div className="h-[320px] relative rounded-[8px] shrink-0 w-[188px]" data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
          <img alt="" className="absolute h-full left-[-67.02%] max-w-none top-0 w-[223.4%]" src={imgRectangle} />
        </div>
      </div>
      <Frame24 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0 w-full" data-name="Frame">
      <Frame19 />
      <Frame21 />
      <Frame23 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#3A291F] text-[24px] w-[min-content]">Extensions</p>
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#6b4f3a] text-[14px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Enhance your look with our exquisite nail extensions, tailored for elegance and durability.
      </p>
      <p className="[text-underline-position:from-font] decoration-from-font decoration-solid font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#c49a3c] text-[14px] underline uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        View Service
      </p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Frame">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center px-[16px] relative size-full">
          <div className="h-[320px] relative rounded-[8px] shrink-0 w-[188px]" data-name="Rectangle">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
              <img alt="" className="absolute h-full left-[-67.02%] max-w-none top-0 w-[223.4%]" src={imgRectangle} />
            </div>
          </div>
          <Frame27 />
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start px-[16px] relative size-full">
        <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#3A291F] text-[24px] w-[min-content]">Nail Art</p>
        <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#6b4f3a] text-[14px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Select your unique nail art, with pricing tailored per nail service.
        </p>
        <p className="[text-underline-position:from-font] decoration-from-font decoration-solid font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#c49a3c] text-[14px] underline uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          View Service
        </p>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-w-px relative" data-name="Frame">
      <div className="h-[320px] relative rounded-[8px] shrink-0 w-[188px]" data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
          <img alt="" className="absolute h-full left-[-67.02%] max-w-none top-0 w-[223.4%]" src={imgRectangle} />
        </div>
      </div>
      <Frame29 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start px-[16px] relative size-full">
        <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#3A291F] text-[24px] w-[min-content]">Full Removal</p>
        <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#6b4f3a] text-[14px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Gentle removal of old polish and enhancements to prepare your nails for a fresh, flawless look.
        </p>
        <p className="[text-underline-position:from-font] decoration-from-font decoration-solid font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#c49a3c] text-[14px] underline uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          View Service
        </p>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-w-px relative" data-name="Frame">
      <div className="h-[320px] relative rounded-[8px] shrink-0 w-[188px]" data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
          <img alt="" className="absolute h-full left-[-67.02%] max-w-none top-0 w-[223.4%]" src={imgRectangle} />
        </div>
      </div>
      <Frame31 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0 w-full" data-name="Frame">
      <Frame26 />
      <Frame28 />
      <Frame30 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Frame">
      <Frame18 />
      <Frame25 />
    </div>
  );
}

function Services() {
  return (
    <div className="bg-[#F5ECE0] content-stretch flex flex-col gap-[64px] items-start px-[80px] py-[120px] relative shrink-0 w-[1200px]" data-name="services">
      <Frame16 />
      <Frame17 />
    </div>
  );
}

function ValueProp1() {
  return (
    <div className="bg-[#FAF5EF] content-stretch flex items-center justify-center px-[80px] py-[120px] relative shrink-0 w-[1440px]" data-name="value-prop">
      <Services />
    </div>
  );
}

function Frame32() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-center w-[600px]" data-name="Frame">
      <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3A291F] text-[48px] w-full">Ready for your next fresh set?</p>
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[#6b4f3a] text-[16px] w-full" style={{ fontVariationSettings: '"wdth" 100' }}>
        Book your appointment with Your Nail Girl, Audrey in North Salt Lake and enjoy a private nail experience that feels chic, comfortable, and completely personalized.
      </p>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#3A291F] content-stretch flex items-center justify-center px-[28px] py-[14px] relative rounded-[100px] shrink-0" data-name="button">
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#F5ECE0] text-[14px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Book Now
      </p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center px-[28px] py-[14px] relative rounded-[100px] shrink-0" data-name="button">
      <div aria-hidden className="absolute border border-[#3A291F] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <p className="[word-break:break-word] font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#3A291F] text-[14px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        View Work
      </p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Frame">
      <Button3 />
      <Button4 />
    </div>
  );
}

function FinalCta() {
  return (
    <div className="bg-[#FAF5EF] content-stretch flex flex-col gap-[32px] items-center px-[80px] py-[100px] relative shrink-0 w-[1440px]" data-name="final-cta">
      <Frame32 />
      <Frame33 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[300px]" data-name="Frame">
      <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#F5ECE0] text-[24px] whitespace-nowrap">Your Nail Girl, Audrey</p>
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[1.6] min-w-full relative shrink-0 text-[#a8917e] text-[14px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Chic, custom nails in North Salt Lake, Utah
      </p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Frame">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Services
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        My Work
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        About
      </p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Frame">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Book Now
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Contact
      </p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex font-['Instrument_Sans:Regular',sans-serif] font-normal gap-[64px] items-start leading-[normal] relative shrink-0 text-[#F5ECE0] text-[14px] whitespace-nowrap" data-name="Frame">
      <Frame37 />
      <Frame38 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Frame">
      <Frame35 />
      <Frame36 />
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="arrow-right">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Privacy Policy
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Terms of Service
      </p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex font-['Instrument_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[normal] relative shrink-0 text-[#a8917e] text-[14px] w-full whitespace-nowrap" data-name="Frame">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        © 2026 Your Nail Girl, Audrey. All Rights Reserved.
      </p>
      <ArrowRight />
    </div>
  );
}

function Footer() {
  return (
    <div className="[word-break:break-word] bg-[#3A291F] content-stretch flex flex-col gap-[64px] items-start p-[80px] relative shrink-0 w-[1440px]" data-name="footer">
      <Frame34 />
      <Frame39 />
    </div>
  );
}

export default function HomepageDesktop() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="homepage-desktop">
      <Frame2 />
      <DivClassFeaturedHeroOverlay />
      <TrustStrip />
      <ValueProp />
      <HowItWorks />
      <ValueProp1 />
      <FinalCta />
      <Footer />
    </div>
  );
}