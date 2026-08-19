import { mockStore } from "@/lib/mock-store";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Invitation, InvitationStatus } from "@/types";

export async function getInvitations(): Promise<Invitation[]> {
  if (!isSupabaseConfigured()) {
    mockStore.checkExpiredInvitations();
    return mockStore.getInvitations();
  }

  const supabase = await createClient();
  if (!supabase) return mockStore.getInvitations();

  const { data } = await supabase
    .from("invitations")
    .select("*")
    .order("created_at", { ascending: false });

  return (data as Invitation[]) ?? mockStore.getInvitations();
}

export async function getInvitationBySlug(slug: string): Promise<Invitation | null> {
  if (!isSupabaseConfigured()) {
    mockStore.checkExpiredInvitations();
    return mockStore.getInvitationBySlug(slug) ?? null;
  }

  const supabase = await createClient();
  if (!supabase) return mockStore.getInvitationBySlug(slug) ?? null;

  const { data } = await supabase.from("invitations").select("*").eq("slug", slug).single();

  if (!data) return null;

  const invitation = data as Invitation;
  if (
    invitation.status === "active" &&
    invitation.expiry_date &&
    new Date(invitation.expiry_date) < new Date()
  ) {
    await supabase.from("invitations").update({ status: "expired" }).eq("id", invitation.id);
    return { ...invitation, status: "expired" };
  }

  return invitation;
}

export async function updateInvitationStatus(
  id: string,
  status: InvitationStatus
): Promise<Invitation | null> {
  if (!isSupabaseConfigured()) {
    return mockStore.updateInvitation(id, { status }) ?? null;
  }

  const supabase = await createClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("invitations")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  return data as Invitation | null;
}

export function filterInvitations(
  invitations: Invitation[],
  status?: InvitationStatus | "all"
): Invitation[] {
  if (!status || status === "all") return invitations;
  return invitations.filter((i) => i.status === status);
}
