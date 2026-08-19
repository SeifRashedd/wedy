import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/services/orders";
import { isValidImageFile, generateId } from "@/lib/utils";
import type { InvitationData, PaymentMethod } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const customer_name = formData.get("customer_name") as string;
    const customer_phone = formData.get("customer_phone") as string;
    const customer_email = formData.get("customer_email") as string;
    const template_id = formData.get("template_id") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const payment_method = formData.get("payment_method") as PaymentMethod;
    const invitation_data = JSON.parse(formData.get("invitation_data") as string) as InvitationData;
    const screenshot = formData.get("screenshot") as File;

    if (!customer_name || !customer_phone || !customer_email || !template_id || !payment_method) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!screenshot || !isValidImageFile(screenshot)) {
      return NextResponse.json(
        { error: "Invalid payment screenshot. Must be JPEG, PNG, or WebP under 5MB." },
        { status: 400 }
      );
    }

    let screenshotPath: string | null = null;

    if (isSupabaseConfigured()) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const fileName = `${generateId()}-${screenshot.name}`;
      const buffer = Buffer.from(await screenshot.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from("payment-screenshots")
        .upload(fileName, buffer, { contentType: screenshot.type });

      if (uploadError) {
        return NextResponse.json({ error: "Failed to upload screenshot" }, { status: 500 });
      }

      screenshotPath = fileName;
    } else {
      screenshotPath = `mock/${generateId()}-${screenshot.name}`;
    }

    const order = await createOrder({
      customer_name,
      customer_phone,
      customer_email,
      template_id,
      amount,
      payment_method,
      payment_screenshot: screenshotPath,
      invitation_data,
    });

    return NextResponse.json({ id: order.id, status: "pending" });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
