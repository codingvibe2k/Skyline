import { LucideIcon } from "lucide-react";

interface VehicleSpecCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function VehicleSpecCard({
  icon: Icon,
  label,
  value,
}: VehicleSpecCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-brand-gold/15
        bg-brand-obsidian/60
        p-5
        backdrop-blur-sm
        transition-all
        duration-500
        hover:border-brand-gold/40
        hover:bg-brand-obsidian/80
      "
    >
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          bg-[radial-gradient(circle_at_top_right,rgba(225,196,153,0.12),transparent_55%)]
        "
      />

      <div className="relative z-10">
        <Icon
          size={22}
          className="
            mb-4
            text-brand-gold
          "
        />

        <p
          className="
            text-xs
            uppercase
            tracking-[0.25em]
            text-brand-platinum/50
          "
        >
          {label}
        </p>

        <p
          className="
            mt-2
            text-2xl
            font-medium
            text-brand-platinum
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}
