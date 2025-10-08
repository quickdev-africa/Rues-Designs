import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { items, emails } = await req.json();
  if (!items || !emails) {
    return NextResponse.json({ error: 'Missing wishlist or emails' }, { status: 400 });
  }

  // Configure nodemailer (replace with your SMTP credentials)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const wishlistHtml = `
    <h2>Wishlist from Customer</h2>
    <ul>
      ${items.map((item: any) => `<li><strong>${item.name}</strong> - $${item.price.toFixed(2)}</li>`).join('')}
    </ul>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: emails.join(','),
      subject: 'New Wishlist Submission',
      html: wishlistHtml,
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
