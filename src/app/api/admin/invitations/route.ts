import { NextRequest, NextResponse } from "next/server";
import { getInvitations, filterInvitations, updateInvitationStatus } from "@/services/invitations";
import { verifyAdmin } from "@/lib/auth";
import type { InvitationStatus } from "@/types";

export async function GET(request: NextRequest) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = request.nextUrl.searchParams.get("status") as InvitationStatus | "all" | null;
  const invitations = await getInvitations();
  const filtered = filterInvitations(invitations, status ?? "all");

  return NextResponse.json(filtered);
}

export async function PATCH(request: NextRequest) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await request.json();
  if (!id || !status) {
    return NextResponse.json({ error: "ID and status required" }, { status: 400 });
  }

  const invitation = await updateInvitationStatus(id, status);
  if (!invitation) {
    return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
  }

  return NextResponse.json(invitation);
}
