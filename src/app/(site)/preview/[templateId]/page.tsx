import { notFound } from "next/navigation";
import Link from "next/link";
import { getTemplate } from "@/templates/registry";
import { Button } from "@/components/ui/Button";
import { Heart } from "lucide-react";

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
      <div className="sticky top-16 z-40 bg-ivory/90 backdrop-blur-md border-b border-rose-dust/10 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-serif text-lg text-wedding-brown">{config.name}</p>
            <p className="text-xs text-wedding-muted">Preview with sample data</p>
          </div>
          <Link href={`/create/${config.id}`}>
            <Button size="sm">
              <Heart className="w-4 h-4" />
              Choose Template
            </Button>
          </Link>
        </div>
      </div>
      <Component data={sampleData} preview />
    </div>
  );
}
