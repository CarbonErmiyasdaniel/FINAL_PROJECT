import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

/**
 * Sends an email using Nodemailer.
 * @param {object} options - Email options.
 * @param {string} options.email - Recipient's email address.
 * @param {string} options.subject - Email subject.
 * @param {string} options.message - Email body text.
 */
const sendEmail = async (options) => {
  try {
    // 1. Create transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_RESET, // from .env
        pass: process.env.PASSWORD_RESET, // Gmail App Password
      },
      logger: process.env.NODE_ENV === "development",
      debug: process.env.NODE_ENV === "development",
    });

    // 2. Mail options
    const mailOptions = {
      from: `"Blood Bank Support" <${process.env.EMAIL_RESET}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    // 3. Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent:", info.response);
  } catch (error) {
    console.error(
      " FAILED to send email. Check EMAIL_RESET/PASSWORD_RESET in .env"
    );
    console.error(error);
    throw new Error("Email sending failed.");
  }
};

export default sendEmail;
