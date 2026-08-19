import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function InvitationNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory px-6">
      <div className="text-center max-w-md">
        <Heart className="w-12 h-12 text-rose-dust mx-auto mb-4 opacity-50" />
        <h1 className="font-serif text-2xl text-wedding-brown mb-2">Invitation Not Found</h1>
        <p className="text-wedding-muted mb-6">
          This invitation link doesn&apos;t exist or may have been removed.
        </p>
        <Link href="/">
          <Button>Go to Wedy</Button>
        </Link>
      </div>
    </div>
  );
}
