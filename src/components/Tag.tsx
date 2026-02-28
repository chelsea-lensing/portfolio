interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  return (
    <div className="bg-white border border-border rounded-full px-2 py-1 flex items-center justify-center shrink-0">
      <p className="font-public-sans font-normal text-[14px] text-dark leading-[20px] whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}
