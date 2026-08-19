import { NextRequest, NextResponse } from "next/server";
import { approveOrder } from "@/services/orders";
import { verifyAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId } = await request.json();
  if (!orderId) {
    return NextResponse.json({ error: "Order ID required" }, { status: 400 });
  }

  const result = await approveOrder(orderId);
  if (!result) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    invitationUrl: result.invitationUrl,
  });
}
