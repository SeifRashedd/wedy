"use client";

interface TemplateToggleProps {
  templateId: string;
  active: boolean;
}

export function TemplateToggle({ templateId, active: initialActive }: TemplateToggleProps) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full ${
        initialActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
      }`}
    >
      {initialActive ? "Active" : "Inactive"}
    </span>
  );
}
