interface StatusChip {
  text: string;
}

interface StatusChipsProps {
  items: StatusChip[];
}

export default function StatusChips({ items }: StatusChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-inkMuted bg-surface border border-line rounded-full"
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}
