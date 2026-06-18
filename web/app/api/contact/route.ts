import { Resend } from "resend";

// Destino de los mensajes del formulario.
const TO = "info@estudionovena.com";
// Remitente: necesita un dominio verificado en Resend (p.ej. "Estudio Novena <web@estudionovena.com>").
// Mientras no esté verificado, "onboarding@resend.dev" sirve para pruebas.
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Estudio Novena <onboarding@resend.dev>";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "El servicio de correo no está configurado." },
      { status: 500 },
    );
  }
  const resend = new Resend(apiKey);

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const firstName = String(data.firstName ?? "").trim();
  const lastName = String(data.lastName ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!firstName || !email || !message) {
    return Response.json({ error: "Faltan campos requeridos." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Email inválido." }, { status: 400 });
  }

  const fullName = `${firstName} ${lastName}`.trim();

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Nuevo mensaje de contacto — ${fullName}`,
      text: `Nombre: ${fullName}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #1a1a18;">
          <h2 style="margin: 0 0 16px;">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "No se pudo enviar el mensaje." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json({ error: "No se pudo enviar el mensaje." }, { status: 502 });
  }
}
