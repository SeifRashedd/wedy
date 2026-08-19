import { getAllTemplates } from "@/templates/registry";
import { getTemplateOrderCount } from "@/services/templates";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eye } from "lucide-react";
import { TemplateToggle } from "@/components/admin/TemplateToggle";

export const metadata = { title: "Templates — Wedy Admin" };

export default function AdminTemplatesPage() {
  const templates = getAllTemplates();

  return (
    <div>
      <h1 className="font-serif text-2xl text-wedding-brown mb-2">Templates</h1>
      <p className="text-wedding-muted text-sm mb-8">
        Manage template availability. Templates are code-based.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(({ config }) => {
          const orderCount = getTemplateOrderCount(config.id);
          const previewImage =
            config.id === "template-01"
              ? "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80"
              : config.id === "template-02"
                ? "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80"
                : "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80";

          return (
            <Card key={config.id} className="overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewImage} alt={config.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-lg text-wedding-brown">{config.name}</h3>
                  <TemplateToggle templateId={config.id} active={config.active} />
                </div>
                <p className="text-sm text-wedding-muted mb-3">{config.description}</p>
                <div className="flex justify-between items-center text-sm mb-4">
                  <span className="text-rose-dust font-serif">{formatCurrency(config.price)}</span>
                  <span className="text-wedding-muted">{orderCount} orders</span>
                </div>
                <Link href={`/preview/${config.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="w-4 h-4" />
                    Preview
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
