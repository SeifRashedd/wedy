import { cn } from "@/lib/utils";

interface FloralDecorationProps {
  className?: string;
}

export function FloralDecoration({ className }: FloralDecorationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("text-[#C9A962]", className)}
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        opacity="0.6"
        d="M100 20c-5 15-20 25-35 25 15 0 30 10 35 25 5-15 20-25 35-25-15 0-30-10-35-25z"
      />
      <path
        opacity="0.4"
        d="M100 180c-5-15-20-25-35-25 15 0 30-10 35-25 5 15 20 25 35 25-15 0-30 10-35 25z"
      />
      <circle cx="100" cy="100" r="8" opacity="0.5" />
      <path
        opacity="0.3"
        d="M30 100c15-5 25-20 25-35-0 15-10 30-25 35zm140 0c-15-5-25-20-25-35 0 15 10 30 25 35z"
      />
    </svg>
  );
}
