import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white/70 backdrop-blur-sm rounded-2xl border border-rose-dust/10 shadow-sm",
        hover && "hover:shadow-md hover:border-rose-dust/20 transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
