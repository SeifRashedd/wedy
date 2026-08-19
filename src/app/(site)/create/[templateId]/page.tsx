import { notFound } from "next/navigation";
import { getTemplate } from "@/templates/registry";
import { InvitationForm } from "@/components/create/InvitationForm";
import { formatCurrency } from "@/lib/utils";

interface CreatePageProps {
  params: Promise<{ templateId: string }>;
}

export async function generateMetadata({ params }: CreatePageProps) {
  const { templateId } = await params;
  const entry = getTemplate(templateId);
  return {
    title: entry ? `Create — ${entry.config.name}` : "Create Invitation",
  };
}

export default async function CreatePage({ params }: CreatePageProps) {
  const { templateId } = await params;
  const entry = getTemplate(templateId);

  if (!entry || !entry.config.active) {
    notFound();
  }

  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-rose-dust text-sm tracking-[0.2em] uppercase mb-2">Create Invitation</p>
          <h1 className="font-serif text-3xl text-wedding-brown">{entry.config.name}</h1>
          <p className="text-wedding-muted mt-2">
            {entry.config.description} · {formatCurrency(entry.config.price)}
          </p>
        </div>

        <InvitationForm templateId={templateId} />
      </div>
    </div>
  );
}
