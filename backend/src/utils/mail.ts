import dotenv from "dotenv";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";
import { generateAndSetEmailVerificationToken } from "./securityUtils";

dotenv.config();

const { MAIL_HOST = "mail.arwi.fi", MAIL_USER, MAIL_PASS } = process.env;
const MAIL_PORT = Number(process.env.MAIL_PORT || "465");
const { APP_ENV } = process.env;

if (!MAIL_USER || !MAIL_PASS) {
  if (APP_ENV === "production") throw new Error("Missing mail credentials, define MAIL_USER and MAIL_PASS");
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

export const sendMail = async (
  to: string,
  subject: string,
  html: string,
  options?: Omit<Mail.Options, "from" | "to" | "subject" | "html">
): Promise<SMTPTransport.SentMessageInfo> => {
  if (!MAIL_USER || !MAIL_PASS) throw new Error("Missing mail credentials, cannot send email. Define MAIL_USER and MAIL_PASS");

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error("Something went wrong with verifying send mail config:", error);
        reject(error);
      } else {
        resolve(success);
      }
    });
  });

  return new Promise((res, rej) => {
    transporter.sendMail(
      {
        from: `Arwi <${MAIL_USER}>`,
        to,
        subject,
        html,
        ...(options || {}),
      },
      (err, info) => {
        if (err) rej(err);
        else res(info);
      }
    );
  });
};

let baseUrl = "http://localhost:4000";
if (APP_ENV === "production") baseUrl = "https://api.arwi.fi";
else if (APP_ENV === "staging") baseUrl = "https://staging-api.arwi.fi";

export const sendEmailVerificationMail = async (to: string, userId: string, type: "feedback-generation" | "register" = "register") => {
  const token = await generateAndSetEmailVerificationToken(to);
  const queryParams = new URLSearchParams({ token, email: to, user_id: userId });
  const verificationUrl = `${baseUrl}/auth/verify-email?${queryParams.toString()}`;

  const subject = "Vahvista sähköpostisi";
  const startMessage =
    type === "feedback-generation"
      ? "Olet pyytänyt loppuarviointien viemistä tähän sähköpostiin.<br /><br />"
      : "Tervetuloa käyttämään Arwia!<br /><br />";
  const html = `
    ${startMessage}
    Jatkaaksesi sinun täytyy vahvistaa sähköpostisi. Vahvista sähköpostiosoitteesi klikkaamalla alta (voimassa 24h ajan):<br /><br />
    <a href="${verificationUrl}">${verificationUrl}</a><br /><br />
    Jos et tunnista tätä aktiviteettia, suosittelemme ottamaan yhteyttä Arwin järjestelmänvalvontaan info@arwi.fi.
  `;
  return sendMail(to, subject, html);
};
