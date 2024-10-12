import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production", // true for port 465, false for other ports
    auth: {
      user: "ahmedpolash732@gmail.com",
      pass: "fbra rbqc xkms jdck",
    },
  });

  await transporter.sendMail({
    from: "ahmedpolash732@gmail.com", // sender address
    to,
    subject: "Reset your password withing 10 minutes !✔", // Subject line
    text: " ", // plain text body
    html,
  });
};
