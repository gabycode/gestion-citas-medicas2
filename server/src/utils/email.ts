import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config();

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
