import { notFound } from "next/navigation";
import { getInvitationBySlug } from "@/services/invitations";
import { getTemplate } from "@/templates/registry";
import { Clock } from "lucide-react";

interface InvitationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: InvitationPageProps) {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);
  if (!invitation) return { title: "Invitation Not Found" };

  const groom = invitation.data.groomName ?? "";
  const bride = invitation.data.brideName ?? "";
  return {
    title: `${groom} & ${bride} — Wedding Invitation`,
    description: `You're invited to celebrate the wedding of ${groom} and ${bride}`,
  };
}

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    notFound();
  }

  if (invitation.status === "expired") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory px-6">
        <div className="text-center max-w-md">
          <Clock className="w-12 h-12 text-wedding-muted mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-wedding-brown mb-2">Invitation Expired</h1>
          <p className="text-wedding-muted">
            This invitation has expired. Please contact the couple for more information.
          </p>
        </div>
      </div>
    );
  }

  if (invitation.status === "disabled" || invitation.status === "pending") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory px-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-2xl text-wedding-brown mb-2">Invitation Unavailable</h1>
          <p className="text-wedding-muted">This invitation is not currently active.</p>
        </div>
      </div>
    );
  }

  const entry = getTemplate(invitation.template_id);
  if (!entry) notFound();

  const { Component } = entry;
  return <Component data={invitation.data} />;
}
