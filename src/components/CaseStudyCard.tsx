import Tag from "./Tag";

interface CaseStudyCardProps {
  company: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
}

export default function CaseStudyCard({ company, title, description, tags, href = "#" }: CaseStudyCardProps) {
  return (
    <a
      href={href}
      className="bg-white flex flex-col gap-4 overflow-hidden cursor-pointer shrink-0
        w-[240px] p-4 rounded-2xl
        lg:w-[343px] lg:p-6 lg:rounded-[32px]"
    >

      {/* Image area: hover scoped to this div only */}
      <div className="group relative shrink-0 w-full h-[208px] lg:h-[343px]">
        <div className="absolute inset-0 bg-[#d9d9d9] transition-opacity duration-300 lg:group-hover:opacity-0" />
        <div className="absolute inset-0 bg-cream flex items-center justify-center p-6
          opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100">
          <p className="font-public-sans font-normal text-[12px] text-black text-center leading-[20px]">
            {description}
          </p>
        </div>
      </div>

      {/* Company + title */}
      <div className="shrink-0 flex flex-col gap-2 items-start w-full font-poiret text-black leading-normal">
        <p className="text-[12px] tracking-[1.5px] whitespace-nowrap">{company}</p>
        <p className="text-[20px] lg:text-[24px] w-full">{title}</p>
      </div>

      {/* Tags — mt-auto pins to bottom, space above grows with card height */}
      <div className="flex flex-wrap gap-2 items-start w-full mt-auto">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </a>
  );
}
