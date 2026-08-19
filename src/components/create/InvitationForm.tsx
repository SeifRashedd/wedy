"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Eye, Smartphone } from "lucide-react";
import { getTemplate } from "@/templates/registry";
import type { InvitationData, TemplateField } from "@/types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { LivePreview } from "./LivePreview";
import { isValidImageFile } from "@/lib/utils";

interface InvitationFormProps {
  templateId: string;
}

export function InvitationForm({ templateId }: InvitationFormProps) {
  const router = useRouter();
  const entry = getTemplate(templateId);
  const [step, setStep] = useState(1);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [data, setData] = useState<InvitationData>(() => ({
    ...entry?.sampleData,
    groomName: "",
    brideName: "",
    weddingDate: "",
    weddingTime: "",
    venue: "",
    location: "",
  }));

  if (!entry) return null;

  const { config } = entry;
  const maxStep = config.steps.length;
  const currentStepFields = config.fields.filter((f) => f.step === step);

  const updateField = useCallback((name: string, value: unknown) => {
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleImageUpload = (name: string, file: File) => {
    if (!isValidImageFile(file)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Please upload a JPEG, PNG, or WebP image under 5MB",
      }));
      return;
    }
    const url = URL.createObjectURL(file);
    updateField(name, url);
  };

  const handleGalleryUpload = (files: FileList) => {
    const valid: string[] = [];
    Array.from(files).forEach((file) => {
      if (isValidImageFile(file)) {
        valid.push(URL.createObjectURL(file));
      }
    });
    updateField("gallery", [...(data.gallery ?? []), ...valid]);
  };

  const validateStep = (): boolean => {
    const stepErrors: Record<string, string> = {};
    currentStepFields.forEach((field) => {
      if (field.required) {
        const value = data[field.name as keyof InvitationData];
        if (!value || (Array.isArray(value) && value.length === 0)) {
          stepErrors[field.name] = `${field.label} is required`;
        }
      }
    });
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < maxStep) setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!validateStep()) return;
    sessionStorage.setItem(
      "wedy_order",
      JSON.stringify({ templateId, data, amount: config.price })
    );
    router.push("/checkout");
  };

  const renderField = (field: TemplateField) => {
    const value = data[field.name as keyof InvitationData];

    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            key={field.name}
            id={field.name}
            label={field.label}
            required={field.required}
            value={(value as string) ?? ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            error={errors[field.name]}
            rows={4}
            placeholder={field.placeholder}
          />
        );
      case "boolean":
        return (
          <label key={field.name} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => updateField(field.name, e.target.checked)}
              className="w-5 h-5 rounded border-rose-dust/30 text-rose-dust focus:ring-rose-dust/20"
            />
            <span className="text-sm text-wedding-brown">{field.label}</span>
          </label>
        );
      case "image":
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-wedding-brown">
              {field.label}
              {field.required && <span className="text-rose-dust ml-1">*</span>}
            </label>
            {value && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value as string}
                alt="Preview"
                className="w-full h-40 object-cover rounded-xl"
              />
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(field.name, file);
              }}
              className="text-sm text-wedding-muted"
            />
            {errors[field.name] && (
              <p className="text-xs text-red-500">{errors[field.name]}</p>
            )}
          </div>
        );
      case "gallery":
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-wedding-brown">{field.label}</label>
            {data.gallery && data.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {data.gallery.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt="" className="aspect-square object-cover rounded-lg" />
                ))}
              </div>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(e) => e.target.files && handleGalleryUpload(e.target.files)}
              className="text-sm text-wedding-muted"
            />
          </div>
        );
      default:
        return (
          <Input
            key={field.name}
            id={field.name}
            label={field.label}
            type={field.type}
            required={field.required}
            value={(value as string) ?? ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            error={errors[field.name]}
            placeholder={field.placeholder}
          />
        );
    }
  };

  const currentStepInfo = config.steps.find((s) => s.id === step);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {config.steps.map((s) => (
            <button
              key={s.id}
              onClick={() => s.id <= step && setStep(s.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                s.id === step
                  ? "bg-rose-dust text-white"
                  : s.id < step
                    ? "bg-rose-blush text-wedding-brown"
                    : "bg-white text-wedding-muted border border-rose-dust/10"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-rose-dust/10">
          {currentStepInfo && (
            <div className="mb-6">
              <h2 className="font-serif text-2xl text-wedding-brown">{currentStepInfo.title}</h2>
              <p className="text-wedding-muted text-sm mt-1">{currentStepInfo.description}</p>
            </div>
          )}

          {step === maxStep ? (
            <div className="space-y-4">
              <p className="text-wedding-muted">
                Review your invitation in the preview panel. When you&apos;re happy, proceed to
                checkout.
              </p>
              <Button
                variant="outline"
                className="lg:hidden w-full"
                onClick={() => setShowMobilePreview(true)}
              >
                <Eye className="w-4 h-4" />
                View Preview
              </Button>
            </div>
          ) : (
            <div className="space-y-5">{currentStepFields.map(renderField)}</div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-rose-dust/10">
            <Button
              variant="ghost"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            {step < maxStep ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Proceed to Checkout</Button>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          className="lg:hidden w-full mt-4"
          onClick={() => setShowMobilePreview(!showMobilePreview)}
        >
          <Smartphone className="w-4 h-4" />
          {showMobilePreview ? "Hide Preview" : "Show Live Preview"}
        </Button>

        {showMobilePreview && (
          <div className="lg:hidden mt-4">
            <LivePreview templateId={templateId} data={data} />
          </div>
        )}
      </div>

      <div className="hidden lg:block">
        <LivePreview templateId={templateId} data={data} />
      </div>
    </div>
  );
}
