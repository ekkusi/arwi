import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const { MAIL_HOST = "mail.arwi.fi", MAIL_USER, MAIL_PASS } = process.env;
const MAIL_PORT = Number(process.env.MAIL_PORT || "465");

if (!MAIL_USER || !MAIL_PASS) {
  if (process.env.NODE_ENV === "production") throw new Error("Missing mail credentials, define MAIL_USER and MAIL_PASS");
  else console.warn("Missing mail credentials, email sending wont be functioning. Define MAIL_USER and MAIL_PASS to make it work.");
}

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export const sendMail = (to: string, subject: string, html: string) => {
  if (!MAIL_USER || !MAIL_PASS) throw new Error("Missing mail credentials, cannot send email. Define MAIL_USER and MAIL_PASS");
  return transporter.sendMail({
    from: `Arwi <${MAIL_USER}>`,
    to,
    subject,
    html,
  });
};
