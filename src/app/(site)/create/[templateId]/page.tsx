import { notFound } from "next/navigation";
import { getTemplate } from "@/templates/registry";
import { InvitationForm } from "@/components/create/InvitationForm";
import { CreatePageHeader } from "@/components/create/CreatePageHeader";

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
        <CreatePageHeader
          templateId={templateId}
          description={entry.config.description}
          price={entry.config.price}
        />

        <InvitationForm templateId={templateId} />
      </div>
    </div>
  );
}
