import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ContactPayload = {
  nombre?: string;
  empresa?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
};

function getMissingEnvVars() {
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO_EMAIL'];
  return required.filter((key) => !process.env[key]);
}

export async function POST(request: Request) {
  const missing = getMissingEnvVars();
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Faltan variables de entorno: ${missing.join(', ')}` },
      { status: 500 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  const nombre = payload.nombre?.trim() ?? '';
  const empresa = payload.empresa?.trim() ?? '';
  const email = payload.email?.trim() ?? '';
  const telefono = payload.telefono?.trim() ?? '';
  const mensaje = payload.mensaje?.trim() ?? '';

  if (!nombre || !empresa || !email || !telefono || !mensaje) {
    return NextResponse.json(
      { error: 'Todos los campos del formulario son obligatorios.' },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `Nueva solicitud de ${nombre} - AHI Promociones`,
      replyTo: email,
      text: [
        'Nueva solicitud desde la landing:',
        `Nombre: ${nombre}`,
        `Empresa: ${empresa}`,
        `Email: ${email}`,
        `Teléfono: ${telefono}`,
        '',
        'Mensaje:',
        mensaje,
      ].join('\n'),
      html: `
        <h2>Nueva solicitud desde la landing</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'No se pudo enviar el email. Revisa la configuración SMTP.' },
      { status: 500 }
    );
  }
}
