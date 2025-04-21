import nodemailer from "nodemailer";
import dotenv from "dotenv"

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

export const sendAppointmentEmail = async (
  to: string,
  pacienteNombre: string,
  doctorNombre: string,
  especialidad: string,
  fecha: string,
  hora: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Gestión de Citas Médicas" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Confirmación de tu cita médica",
    html: `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea; background-color: #f9f9f9;">
      <h2 style="color: #2b2b2b;">Hola ${pacienteNombre},</h2>
  
      <p style="font-size: 16px; color: #333;">
        ¡Tu cita médica ha sido <strong>confirmada</strong> exitosamente!
      </p>
  
      <div style="margin: 20px 0; padding: 16px; background-color: #ffffff; border-radius: 6px; box-shadow: 0 0 5px rgba(0,0,0,0.05);">
        <h3 style="margin: 0 0 10px 0; color: #007bff;">Detalles de tu cita</h3>
        <p style="margin: 6px 0;"><strong>Doctor:</strong> ${doctorNombre}</p>
        <p style="margin: 6px 0;"><strong>Especialidad:</strong> ${especialidad}</p>
        <p style="margin: 6px 0;"><strong>Fecha:</strong> ${fecha}</p>
        <p style="margin: 6px 0;"><strong>Hora:</strong> ${hora}</p>
      </div>
  
      <p style="font-size: 15px; color: #555;">
        Por favor, asegúrate de llegar al consultorio al menos 10 minutos antes de la hora indicada.
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

export const sendCancelationEmail = async (
  to: string,
  pacienteNombre: string,
  doctorNombre: string,
  fecha: string,
  hora: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "soportemdev@gmail.com",
      pass: process.env.EMAIL_PASS ||   "aqurvdcufqsmoynq",
    },
  });

  const mailOptions = {
    from: `"Gestión de Citas Médicas" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🛑 Cancelación de tu cita médica",
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 640px; margin: auto; padding: 24px; border-radius: 12px; border: 1px solid #f1c0c0; background-color: #fff0f0;">
      <h2 style="color: #c0392b; text-align: center;">Tu cita ha sido cancelada</h2>

      <p style="font-size: 16px; color: #2c3e50; margin-bottom: 16px;">
        Hola <strong>${pacienteNombre}</strong>,
      </p>

      <p style="font-size: 15px; color: #555; line-height: 1.6;">
        Lamentamos informarte que tu cita médica con el <strong>Dr. ${doctorNombre}</strong> programada para el <strong>${fecha}</strong> a las <strong>${hora}</strong> ha sido <span style="color: #e74c3c; font-weight: bold;">cancelada</span>.
      </p>

      <div style="margin: 24px 0; padding: 20px; background-color: #ffffff; border-radius: 8px; border: 1px solid #f5b7b1;">
        <h3 style="margin: 0 0 12px 0; color: #e74c3c; font-size: 18px;">📋 Detalles de la cita</h3>
        <p style="margin: 6px 0;"><strong>👨‍⚕️ Doctor:</strong> ${doctorNombre}</p>
        <p style="margin: 6px 0;"><strong>📅 Fecha:</strong> ${fecha}</p>
        <p style="margin: 6px 0;"><strong>⏰ Hora:</strong> ${hora}</p>
      </div>

      <p style="font-size: 15px; color: #555; margin-bottom: 30px;">
        Puedes agendar una nueva cita en nuestra plataforma en cualquier momento:
      </p>

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="http://localhost:3000/agendar" style="display: inline-block; padding: 14px 28px; background-color: #3498db; color: #fff; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px;">
          📅 Agendar nueva cita
        </a>
      </div>

      <p style="font-size: 14px; color: #777; text-align: center;">
        ¿Tienes dudas? Estamos aquí para ayudarte.
      </p>

      <div style="text-align: center; margin-top: 12px;">
        <a href="mailto:${process.env.EMAIL_USER}" style="color: #e74c3c; text-decoration: underline; font-size: 14px;">
          Contactar Soporte
        </a>
      </div>

      <p style="margin-top: 40px; font-size: 12px; color: #aaa; text-align: center;">
        Este es un mensaje automático, por favor no respondas a este correo.
      </p>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};