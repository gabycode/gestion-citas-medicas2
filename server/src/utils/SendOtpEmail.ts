import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOtpEmail = async (to: string, nombre: string, otpCode: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Gestión de Citas Medicas - Seguridad" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Código de Verificación (OTP)",
    html: `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea; background-color: #f9f9f9;">
      <h2 style="color: #2b2b2b;">Hola ${nombre},</h2>

      <p style="font-size: 16px; color: #333;">
        Tu código OTP para restablecer tu contraseña es:
      </p>

      <div style="margin: 20px 0; padding: 16px; background-color: #ffffff; border-radius: 6px; box-shadow: 0 0 5px rgba(0,0,0,0.05); text-align:center;">
        <h1 style="margin: 0; color: #007bff; font-size: 36px; letter-spacing: 5px;">${otpCode}</h1>
      </div>

      <p style="font-size: 15px; color: #555;">
        Este código es válido durante <strong>10 minutos</strong>. No compartas este código con nadie por razones de seguridad.
      </p>

      <div style="text-align: center; margin-top: 30px;">
        <a href="mailto:${process.env.EMAIL_USER}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; border-radius: 5px; text-decoration: none; font-weight: bold;">
          Contactar Soporte
        </a>
      </div>

      <p style="margin-top: 40px; font-size: 13px; color: #999; text-align: center;">
        Este es un mensaje automático, por favor no respondas a este correo.
      </p>
    </div>
  `,
  };

  await transporter.sendMail(mailOptions);
};
