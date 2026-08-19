import { getAllTemplates, getTemplate } from "@/templates/registry";
import { mockStore } from "@/lib/mock-store";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { TemplateConfig } from "@/types";

export function getTemplateConfigs(): TemplateConfig[] {
  return getAllTemplates().map((t) => t.config);
}

export function getTemplateConfig(id: string): TemplateConfig | undefined {
  return getTemplate(id)?.config;
}

export function getTemplateOrderCount(templateId: string): number {
  if (!isSupabaseConfigured()) {
    return mockStore.getOrders().filter((o) => o.template_id === templateId).length;
  }
  return 0;
}

export function toggleTemplateActive(id: string, active: boolean): void {
  const entry = getTemplate(id);
  if (entry) {
    entry.config.active = active;
  }
}
