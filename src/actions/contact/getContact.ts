import { COMPANY_INFO } from "@/config/seoConf";
import { defineAction, ActionError } from "astro:actions";
import { Resend } from "resend";
import { z } from "astro/zod";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const getContact = defineAction({
  accept: "form",
  input: z.object({
    nombre: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(40, "El nombre debe tener menos de 40 caracteres"),
    email: z.email("El correo electrónico debe ser válido"),
    tipo_consulta: z.string().optional(),
    mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
    privacidad: z
      .union([z.literal("true"), z.null()])
      .refine((val) => val === "true", {
        message: "Debes aceptar los términos y condiciones",
      }),
  }),
  handler: async ({ nombre, email, tipo_consulta, mensaje }) => {
    try {
      const { data, error } = await resend.emails.send({
        from: "Eliana Álvarez Psicóloga <onboarding@resend.dev>",
        to: COMPANY_INFO.email,
        subject: "Nueva consulta desde la web - Eliana Álvarez Psicóloga",
        replyTo: email,
        html: `<div style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; background-color: #F5F0EC; padding: 20px; border-radius: 10px;">

      <!-- Header -->
      <div style="background-color: #4A3060; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; margin-bottom: 0;">
        <h1 style="font-family: Georgia, serif; color: #F5F0EC; margin: 0; font-size: 24px; font-weight: bold;">Eliana Álvarez Psicóloga</h1>
        <p style="color: #D4C8E0; margin: 10px 0 0 0; font-size: 15px;">Nueva consulta recibida</p>
      </div>

      <!-- Body -->
      <div style="background: #FFFFFF; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.06);">

        <div style="margin-bottom: 24px;">
          <h3 style="font-family: Georgia, serif; color: #2D1F42; margin: 0 0 15px 0; font-size: 17px; border-bottom: 2px solid #4A3060; padding-bottom: 10px;">
            Información del Consultante
          </h3>

          <div style="background: #F9F6FC; padding: 20px; border-radius: 8px; border-left: 4px solid #4A3060;">
            <p style="margin: 0 0 10px 0; font-size: 15px;">
              <strong style="color: #2D1F42; display: inline-block; width: 80px;">Nombre:</strong>
              <span style="color: #4a4a4a;">${nombre}</span>
            </p>

            <p style="margin: 0 0 10px 0; font-size: 15px;">
              <strong style="color: #2D1F42; display: inline-block; width: 80px;">Email:</strong>
              <a href="mailto:${email}" style="color: #4A3060; text-decoration: none;">${email}</a>
            </p>

            ${
              tipo_consulta
                ? `<p style="margin: 0; font-size: 15px;">
              <strong style="color: #2D1F42; display: inline-block; width: 130px;">Tipo de consulta:</strong>
              <span style="color: #4a4a4a;">${tipo_consulta}</span>
            </p>`
                : ""
            }
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h3 style="font-family: Georgia, serif; color: #2D1F42; margin: 0 0 15px 0; font-size: 17px; border-bottom: 2px solid #4A3060; padding-bottom: 10px;">
            Mensaje
          </h3>

          <div style="background: #F9F6FC; padding: 20px; border-radius: 8px; border-left: 4px solid #2D1F42;">
            <p style="color: #4a4a4a; line-height: 1.7; margin: 0; font-size: 15px; white-space: pre-wrap;">${mensaje}</p>
          </div>
        </div>

        <!-- Reply Button -->
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="mailto:${email}?subject=Re: Tu consulta - Eliana Álvarez Psicóloga" style="display: inline-block; background-color: #4A3060; color: #FFFFFF; font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 30px;">
            Responder a ${nombre}
          </a>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #E8E0F0;">
          <p style="color: #9b8fa8; font-size: 13px; margin: 0;">
            Enviado el ${new Date().toLocaleDateString("es-CO", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

      </div>
    </div>`,
      });

      if (error) {
        console.error("Resend error:", error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { ok: true, data };
    } catch (err) {
      console.error("Handler error:", err);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: err instanceof Error ? err.message : "Unknown error occurred",
      });
    }
  },
});
