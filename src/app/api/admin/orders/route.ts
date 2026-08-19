import { NextRequest, NextResponse } from "next/server";
import { getOrders, filterOrders } from "@/services/orders";
import { verifyAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = request.nextUrl.searchParams.get("status");
  let orders = await getOrders();

  if (status === "pending") {
    orders = orders.filter((o) => o.order_status === "pending");
  }

  return NextResponse.json(orders);
}
