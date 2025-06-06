// components/CardWrapper.tsx


export default function CardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        relative w-[360px] h-[800px] mx-auto
        rounded-xl shadow-md p-6
        overflow-y-auto
        flex flex-col items-center
      "
    >
      {children}
      
    </div>
  );
}
