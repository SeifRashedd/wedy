import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-ivory/80 backdrop-blur-md border-b border-rose-dust/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Heart className="w-5 h-5 text-rose-dust fill-rose-dust/20 group-hover:fill-rose-dust/40 transition-colors" />
          <span className="font-serif text-xl text-wedding-brown tracking-wide">Wedy</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/templates"
            className="text-sm text-wedding-muted hover:text-wedding-brown transition-colors"
          >
            Templates
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm text-wedding-muted hover:text-wedding-brown transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#features"
            className="text-sm text-wedding-muted hover:text-wedding-brown transition-colors"
          >
            Features
          </Link>
        </nav>

        <Link href="/login">
          <Button variant="outline" size="sm">
            Admin
          </Button>
        </Link>
      </div>
    </header>
  );
}
