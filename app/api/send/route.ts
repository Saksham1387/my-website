
import { EmailTemplate } from "@/components/email";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Correct way to parse JSON body
    const body = await req.json();

    // Ensure all required fields are provided
    if (!body.name || !body.email || !body.message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["saksham1387@gmail.com"],
      subject: "Personal Website message",
      react: await EmailTemplate({ 
        name: body.name, 
        email: body.email, 
        subject: "Personal Website message", 
        message: body.message 
      }),
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (_)  {
    console.log(_)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
