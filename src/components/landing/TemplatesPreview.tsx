"use client";

import Link from "next/link";
import { Eye, Heart } from "lucide-react";
import { getActiveTemplates } from "@/templates/registry";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TemplatePreviewModal } from "@/components/templates/TemplatePreviewModal";
import { useState } from "react";

export function TemplatesPreview() {
  const templates = getActiveTemplates();
  const [previewId, setPreviewId] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 bg-cream/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-rose-dust text-sm tracking-[0.3em] uppercase mb-3">Our Collection</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-wedding-brown mb-4">
            Choose Your Perfect Design
          </h2>
          <p className="text-wedding-muted max-w-lg mx-auto">
            Each template is crafted with attention to detail, designed to make your special day
            unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => {
            const { config } = template;
            const previewImage =
              config.id === "template-01"
                ? "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"
                : config.id === "template-02"
                  ? "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80"
                  : "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80";

            return (
              <Card key={config.id} hover className="overflow-hidden group">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewImage}
                    alt={config.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wedding-brown/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl">{config.name}</h3>
                    <p className="text-sm opacity-80 mt-1">{formatCurrency(config.price)}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-wedding-muted text-sm mb-4 line-clamp-2">
                    {config.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setPreviewId(config.id)}
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                    <Link href={`/create/${config.id}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        <Heart className="w-4 h-4" />
                        Choose
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {previewId && (
        <TemplatePreviewModal templateId={previewId} onClose={() => setPreviewId(null)} />
      )}
    </section>
  );
}
