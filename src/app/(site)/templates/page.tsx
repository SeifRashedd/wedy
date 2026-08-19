import Link from "next/link";
import { getActiveTemplates } from "@/templates/registry";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Heart, Eye } from "lucide-react";

export const metadata = {
  title: "Templates — Wedy",
};

export default function TemplatesPage() {
  const templates = getActiveTemplates();

  return (
    <div className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl text-wedding-brown mb-4">
            Wedding Invitation Templates
          </h1>
          <p className="text-wedding-muted max-w-lg mx-auto">
            Each design is unique. Choose the one that reflects your love story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map(({ config }) => {
            const previewImage =
              config.id === "template-01"
                ? "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"
                : config.id === "template-02"
                  ? "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80"
                  : "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80";

            return (
              <Card key={config.id} hover className="overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewImage}
                    alt={config.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-xl text-wedding-brown">{config.name}</h2>
                  <p className="text-wedding-muted text-sm mt-2 mb-3">{config.description}</p>
                  <p className="text-rose-dust font-serif text-lg mb-4">
                    {formatCurrency(config.price)}
                  </p>
                  <div className="flex gap-2">
                    <Link href={`/preview/${config.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-4 h-4" />
                        Preview
                      </Button>
                    </Link>
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
    </div>
  );
}
