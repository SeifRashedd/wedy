import type { TemplateConfig } from "@/types";

export const templateConfig: TemplateConfig = {
  id: "template-03",
  name: "Romantic Bloom",
  description: "Soft floral romantic design with photo-focused layout and gentle animations.",
  price: 349,
  previewImage: "/templates/template-03-preview.jpg",
  active: true,
  steps: [
    { id: 1, title: "The Couple", description: "Your names" },
    { id: 2, title: "Wedding Day", description: "When and where" },
    { id: 3, title: "Memories", description: "Photos and story" },
    { id: 4, title: "Preview", description: "Review your invitation" },
  ],
  fields: [
    { name: "groomName", label: "Groom Name", type: "text", required: true, step: 1 },
    { name: "brideName", label: "Bride Name", type: "text", required: true, step: 1 },
    { name: "weddingDate", label: "Wedding Date", type: "date", required: true, step: 2 },
    { name: "weddingTime", label: "Ceremony Time", type: "time", required: true, step: 2 },
    { name: "venue", label: "Venue", type: "text", required: true, step: 2 },
    { name: "location", label: "Address", type: "text", required: false, step: 2 },
    { name: "mainImage", label: "Couple Photo", type: "image", required: true, step: 3 },
    { name: "gallery", label: "Photo Gallery", type: "gallery", required: false, step: 3 },
    { name: "story", label: "Our Story", type: "textarea", required: false, step: 3 },
  ],
};
