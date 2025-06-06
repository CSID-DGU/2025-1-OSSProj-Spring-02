// components/DonationBodyCard.tsx
interface BodyProps {
  summaryTitle: string;
  description: string[];
  bottomImage: string;
}

export default function DonationBodyCard({ summaryTitle, description, bottomImage }: BodyProps) {
  return (
    <div className="text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-wrap mb-4">
      <p className="font-semibold mb-2">{summaryTitle}</p>
      {description.map((line, idx) => (
        <p key={idx} className="mb-1">{line}</p>
      ))}

      {bottomImage && (
        <div className="mt-4">
          <img src={bottomImage} alt="donation" className="w-full rounded-lg" />
        </div>
        )}
    </div>
  );
}
