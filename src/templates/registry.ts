import type { ComponentType } from "react";
import type { InvitationData, TemplateConfig } from "@/types";
import { template01Config } from "./template-01/config";
import { templateConfig as template02Config } from "./template-02/config";
import { templateConfig as template03Config } from "./template-03/config";
import Template01 from "./template-01/Template01";
import Template02 from "./template-02/Template02";
import Template03 from "./template-03/Template03";
import { SAMPLE_INVITATION_DATA } from "@/lib/mock-data";

export interface TemplateEntry {
  config: TemplateConfig;
  Component: ComponentType<{ data: InvitationData; preview?: boolean }>;
  sampleData: InvitationData;
}

const registry: Record<string, TemplateEntry> = {
  "template-01": {
    config: template01Config,
    Component: Template01,
    sampleData: SAMPLE_INVITATION_DATA,
  },
  "template-02": {
    config: template02Config,
    Component: Template02,
    sampleData: {
      groomName: "Omar",
      brideName: "Salma",
      weddingDate: "2026-10-15",
      weddingTime: "19:00",
      venue: "Marriott Mena House",
      location: "Pyramids Road, Giza",
      googleMapsUrl: "https://maps.google.com/?q=Marriott+Mena+House",
      mainImage: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
      story: "Two souls, one destiny.",
      rsvpEnabled: true,
    },
  },
  "template-03": {
    config: template03Config,
    Component: Template03,
    sampleData: {
      groomName: "Youssef",
      brideName: "Jana",
      weddingDate: "2026-11-08",
      weddingTime: "18:30",
      venue: "The Nile Ritz-Carlton",
      location: "267 Corniche El Nil, Cairo",
      mainImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1529636798458-92179e477f6c?w=600&q=80",
        "https://images.unsplash.com/photo-1523438885200-635aba87a517?w=600&q=80",
      ],
      story: "Love brought us together, and now we invite you to celebrate with us.",
    },
  },
};

export function getTemplate(id: string): TemplateEntry | undefined {
  return registry[id];
}

export function getAllTemplates(): TemplateEntry[] {
  return Object.values(registry);
}

export function getActiveTemplates(): TemplateEntry[] {
  return getAllTemplates().filter((t) => t.config.active);
}
