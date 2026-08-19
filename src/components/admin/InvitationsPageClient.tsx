"use client";

import { useEffect, useState } from "react";
import { Copy, Check, ExternalLink, Power } from "lucide-react";
import type { Invitation, InvitationStatus } from "@/types";
import { formatDate } from "@/lib/utils";
import { getTemplate } from "@/templates/registry";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function InvitationsPageClient() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [filter, setFilter] = useState<InvitationStatus | "all">("all");
  const [copied, setCopied] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/invitations?status=${filter}`)
      .then((r) => r.json())
      .then((data) => {
        setInvitations(data);
        setLoading(false);
      });
  }, [filter]);

  const copyUrl = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/i/${slug}`);
    setCopied(slug);
    setTimeout(() => setCopied(null), 2000);
  };

  const updateStatus = async (id: string, status: InvitationStatus) => {
    await fetch("/api/admin/invitations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setInvitations((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status } : inv))
    );
  };

  const filters: { label: string; value: InvitationStatus | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Expired", value: "expired" },
    { label: "Pending", value: "pending" },
    { label: "Disabled", value: "disabled" },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl text-wedding-brown mb-2">Invitations</h1>
      <p className="text-wedding-muted text-sm mb-6">Manage active and expired invitations</p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => {
              setLoading(true);
              setFilter(f.value);
            }}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              filter === f.value
                ? "bg-rose-dust text-white"
                : "bg-white text-wedding-muted border border-rose-dust/20 hover:border-rose-dust/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-wedding-muted">Loading...</p>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-rose-dust/10 bg-rose-blush/20">
                  <th className="text-left px-4 py-3 font-medium text-wedding-muted">Couple</th>
                  <th className="text-left px-4 py-3 font-medium text-wedding-muted">Template</th>
                  <th className="text-left px-4 py-3 font-medium text-wedding-muted">URL</th>
                  <th className="text-left px-4 py-3 font-medium text-wedding-muted">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-wedding-muted">Expiry</th>
                  <th className="text-left px-4 py-3 font-medium text-wedding-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invitations.map((inv) => (
                  <tr key={inv.id} className="border-b border-rose-dust/5">
                    <td className="px-4 py-3">
                      {inv.data.groomName} & {inv.data.brideName}
                    </td>
                    <td className="px-4 py-3">
                      {getTemplate(inv.template_id)?.config.name ?? inv.template_id}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">/i/{inv.slug}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs capitalize ${
                          inv.status === "active"
                            ? "bg-green-100 text-green-700"
                            : inv.status === "expired"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-wedding-muted">
                      {inv.expiry_date ? formatDate(inv.expiry_date) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => copyUrl(inv.slug)}>
                          {copied === inv.slug ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                        <a href={`/i/${inv.slug}`} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </a>
                        {inv.status === "active" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateStatus(inv.id, "disabled")}
                          >
                            <Power className="w-3 h-3" />
                          </Button>
                        )}
                        {inv.status === "disabled" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateStatus(inv.id, "active")}
                          >
                            Reactivate
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
