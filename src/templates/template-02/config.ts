import type { TemplateConfig } from "@/types";

export const templateConfig: TemplateConfig = {
  id: "template-02",
  name: "Midnight Gold",
  description: "Luxury dark theme with dramatic gold accents and bold animations.",
  price: 399,
  previewImage: "/templates/template-02-preview.jpg",
  active: true,
  steps: [
    { id: 1, title: "The Couple", description: "Names of the bride and groom" },
    { id: 2, title: "Event Details", description: "Date, time, and venue" },
    { id: 3, title: "Photos", description: "Hero image" },
    { id: 4, title: "Preview", description: "Review your invitation" },
  ],
  fields: [
    { name: "groomName", label: "Groom Name", type: "text", required: true, step: 1 },
    { name: "brideName", label: "Bride Name", type: "text", required: true, step: 1 },
    { name: "weddingDate", label: "Wedding Date", type: "date", required: true, step: 2 },
    { name: "weddingTime", label: "Wedding Time", type: "time", required: true, step: 2 },
    { name: "venue", label: "Venue", type: "text", required: true, step: 2 },
    { name: "location", label: "Location", type: "text", required: true, step: 2 },
    { name: "googleMapsUrl", label: "Google Maps URL", type: "url", required: false, step: 2 },
    { name: "mainImage", label: "Hero Photo", type: "image", required: true, step: 3 },
    { name: "story", label: "Tagline / Story", type: "textarea", required: false, step: 3 },
    { name: "rsvpEnabled", label: "Enable RSVP", type: "boolean", required: false, step: 3 },
  ],
};
