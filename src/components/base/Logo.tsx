import { Link } from "react-router-dom";

interface LogoProps {
  inverted?: boolean;
  compact?: boolean;
}

export default function Logo({ inverted = false, compact = false }: LogoProps) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="IIMB home">
      <span
        className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md transition-colors ${
          inverted ? "bg-background-50" : "bg-primary-800"
        }`}
      >
        <span
          className={`absolute inset-x-0 top-0 h-1/2 ${inverted ? "bg-accent-600" : "bg-accent-500"}`}
        />
        <span
          className={`relative font-heading text-lg font-semibold leading-none ${inverted ? "text-primary-900" : "text-background-50"}`}
        >
          II
        </span>
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={`font-heading text-xl font-semibold tracking-tight ${inverted ? "text-background-50" : "text-foreground-950"}`}
        >
          IIMB
        </span>
        {!compact ? (
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.16em] ${inverted ? "text-background-200/80" : "text-foreground-500"}`}
          >
            Management Bangalore
          </span>
        ) : null}
      </span>
    </Link>
  );
}