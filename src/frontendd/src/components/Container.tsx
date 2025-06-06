// components/Container.tsx

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  bgColor?: string; // 기본값은 'bg-[#FAFAFA]'
}

export default function Container({ children, size = 'sm', bgColor = 'bg-[#FAFAFA]' }: ContainerProps) {
  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
  }[size];

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor}`}>
      <div className={`w-full ${maxWidthClass} mx-auto px-4`}>
        {children}
      </div>
    </div>
  );
}
