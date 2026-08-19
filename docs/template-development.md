# Template Development Guide

This guide explains how to add a new wedding invitation template to Wedy.

## Quick Start

Adding `template-04` requires these steps:

```
1. Create src/templates/template-04/
2. Add Template04.tsx
3. Add config.ts
4. Add components/ (optional)
5. Register in registry.ts
6. Done
```

No changes to the core application architecture are required.

---

## Step-by-Step

### 1. Create the Template Folder

```
src/templates/template-04/
├── Template04.tsx
├── config.ts
├── components/
│   └── (template-specific components)
├── assets/
│   └── (images, SVGs)
└── styles/
    └── (optional CSS modules)
```

### 2. Define Configuration

Create `config.ts`:

```typescript
import type { TemplateConfig } from "@/types";

export const templateConfig: TemplateConfig = {
  id: "template-04",
  name: "Your Template Name",
  description: "Short description for the template card.",
  price: 349,
  previewImage: "/templates/template-04-preview.jpg",
  active: true,
  steps: [
    { id: 1, title: "The Couple", description: "Names" },
    { id: 2, title: "Details", description: "Date and venue" },
    { id: 3, title: "Preview", description: "Review" },
  ],
  fields: [
    { name: "groomName", label: "Groom Name", type: "text", required: true, step: 1 },
    { name: "brideName", label: "Bride Name", type: "text", required: true, step: 1 },
    { name: "weddingDate", label: "Wedding Date", type: "date", required: true, step: 2 },
    { name: "venue", label: "Venue", type: "text", required: true, step: 2 },
    // Add only the fields YOUR template needs
  ],
};
```

### 3. Build the Template Component

Create `Template04.tsx`:

```typescript
"use client";

import type { InvitationData } from "@/types";

interface Template04Props {
  data: InvitationData;
  preview?: boolean;
}

export default function Template04({ data, preview = false }: Template04Props) {
  return (
    <div className="template-04 min-h-screen">
      <h1>{data.groomName} & {data.brideName}</h1>
      {/* Your unique design here */}
    </div>
  );
}
```

**Rules:**
- Must accept `data: InvitationData` and optional `preview?: boolean`
- Use `"use client"` if you need hooks or animations
- Keep all template-specific code inside this folder
- Do NOT import from other template folders

### 4. Register the Template

Add to `src/templates/registry.ts`:

```typescript
import { templateConfig as template04Config } from "./template-04/config";
import Template04 from "./template-04/Template04";

// Add to registry object:
"template-04": {
  config: template04Config,
  Component: Template04,
  sampleData: {
    groomName: "Sample Groom",
    brideName: "Sample Bride",
    weddingDate: "2026-12-01",
    weddingTime: "19:00",
    venue: "Sample Venue",
    // ... realistic preview data
  },
},
```

### 5. Add Preview Image (Optional)

Place a preview image at `public/templates/template-04-preview.jpg` for the template cards.

### 6. Seed Database (Production)

Add a row to the `templates` table:

```sql
INSERT INTO templates (id, name, description, price, preview_image, active)
VALUES ('template-04', 'Your Template Name', 'Description', 349, '/templates/template-04-preview.jpg', true);
```

---

## Field Types

| Type | Description | Form Input |
|------|-------------|------------|
| `text` | Single line text | `<input type="text">` |
| `textarea` | Multi-line text | `<textarea>` |
| `date` | Date picker | `<input type="date">` |
| `time` | Time picker | `<input type="time">` |
| `url` | URL input | `<input type="url">` |
| `image` | Single image upload | File input |
| `gallery` | Multiple images | Multi file input |
| `boolean` | Toggle/checkbox | Checkbox |

## Available Data Fields

Templates receive `InvitationData`:

```typescript
interface InvitationData {
  groomName?: string;
  brideName?: string;
  weddingDate?: string;
  weddingTime?: string;
  venue?: string;
  location?: string;
  googleMapsUrl?: string;
  mainImage?: string;
  gallery?: string[];
  story?: string;
  rsvpEnabled?: boolean;
  guestWishesEnabled?: boolean;
}
```

Use only the fields your template needs. Do not require fields your design doesn't use.

## Design Guidelines

- Each template should look **visually distinct**
- Mobile-first (test at 360px, 390px, 414px)
- Avoid horizontal scrolling
- Optimize images (use Unsplash URLs or WebP)
- Animations should be subtle and performant
- Use Framer Motion for scroll/entrance animations

## Testing Your Template

1. Run `npm run dev`
2. Visit `/preview/template-04` for full preview
3. Visit `/create/template-04` to test the form + live preview
4. After admin approval, visit `/i/[slug]` for live invitation

## Adding New Data Fields

If your template needs a field not in `InvitationData`:

1. Add the field to `src/types/index.ts` → `InvitationData`
2. Add the field to your template's `config.ts` fields array
3. Use the field in your template component

The form system automatically renders fields based on `config.ts`.
