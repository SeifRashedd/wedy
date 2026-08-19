import { notFound } from "next/navigation";
import { getTemplate } from "@/templates/registry";
import { PreviewToolbar } from "@/components/templates/PreviewToolbar";

interface PreviewPageProps {
  params: Promise<{ templateId: string }>;
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { templateId } = await params;
  const entry = getTemplate(templateId);

  if (!entry) notFound();

  const { Component, config, sampleData } = entry;

  return (
    <div>
      <PreviewToolbar templateId={config.id} templateName={config.name} />
      <Component data={sampleData} preview />
    </div>
  );
}
