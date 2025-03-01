import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
} as SMTPTransport.Options);

type SendEmailDto = {
  sender: Mail.Address;
  receipients?: string[] | undefined;
  subject: string;
  message?: string;
  text?: string;
  html: string;
};

export const sendEmail = async (dto: SendEmailDto) => {
  const { sender, receipients, subject, text, html } = dto;

  return await transporter.sendMail({
    from: sender,
    to: receipients,
    subject: subject,
    text: text,
    html: html,
  });
};
