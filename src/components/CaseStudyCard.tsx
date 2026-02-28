import Tag from "./Tag";

interface CaseStudyCardProps {
  company: string;
  title: string;
  tags: string[];
}

export default function CaseStudyCard({ company, title, tags }: CaseStudyCardProps) {
  return (
    <div className="bg-white flex flex-col gap-4 items-start overflow-hidden p-6 rounded-[32px] w-[343px] shrink-0">
      {/* Image placeholder */}
      <div className="bg-[#d9d9d9] h-[400px] w-full rounded-lg" />

      {/* Text */}
      <div className="flex flex-col items-start w-full">
        <div className="flex flex-col gap-2 items-start w-full font-poiret text-black leading-normal">
          <p className="text-[12px] tracking-[1.5px] whitespace-nowrap">{company}</p>
          <p className="text-[24px] w-full">{title}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 items-start flex-wrap">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
}
