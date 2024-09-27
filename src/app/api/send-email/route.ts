import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import nodemailer from "nodemailer";
import { z } from "zod";

const requestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

type Transporter = nodemailer.Transporter<nodemailer.SentMessageInfo>;

export async function POST(req: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await req.json();
    const { name, email, message } = requestSchema.parse(body);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT ?? "1025", 10),
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "erikhire@nuvadi.com",
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Message:</strong></p>
                 <p>${message}</p>`,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 },
    );
  }
}
