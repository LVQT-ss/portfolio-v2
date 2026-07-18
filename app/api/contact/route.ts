import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * TODO before going live — pick ONE delivery method:
 *  1. Resend (recommended): `npm i resend`, set RESEND_API_KEY in Vercel env,
 *     then uncomment the block below.
 *  2. Formspree/Basin: point the form action there instead and delete this route.
 *
 * Until then, submissions are accepted and logged server-side only.
 */
export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 100);
  const email = (body.email ?? "").trim().slice(0, 200);
  const message = (body.message ?? "").trim().slice(0, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  // --- Resend integration (uncomment after `npm i resend` + env var) ---
  // const { Resend } = await import("resend");
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "Portfolio <onboarding@resend.dev>",
  //   to: "levietquocthinh@gmail.com",
  //   replyTo: email,
  //   subject: `Portfolio contact from ${name}`,
  //   text: message,
  // });

  console.log("[contact]", { name, email, message });
  return NextResponse.json({ ok: true });
}
