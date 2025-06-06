interface SectionTitleProps {
  text: string;
}

export default function SectionTitle({ text }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2 mt-4 mb-4 w-full">
      <div className="w-1 h-5 bg-[#FFD735]" />
      <h2
        className="text-[20px] font-semibold leading-[20px] text-[#3D3D3D]"
        style={{ fontFamily: 'Open Sans, sans-serif' }}
      >
        {text}
      </h2>
    </div>
  )
}



