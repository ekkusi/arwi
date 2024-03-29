import dotenv from "dotenv";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

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

export const sendMail = async (to: string, subject: string, html: string): Promise<SMTPTransport.SentMessageInfo> => {
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
      },
      (err, info) => {
        if (err) rej(err);
        else res(info);
      }
    );
  });
};
