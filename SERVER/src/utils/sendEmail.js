// utils/email.js

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
/**
 * Sends an email using Nodemailer.
 * * @param {object} options - Email options.
 * @param {string} options.email - Recipient's email address.
 * @param {string} options.subject - Email subject line.
 * @param {string} options.message - Email body (plain text, usually containing the reset link).
 */
const sendEmail = async (options) => {
  try {
    // 1. Create a Transporter
    // This connects to the email service (Gmail in your case).
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        // These credentials come from your .env file
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Optional: Add logging for better debugging in development
      logger: process.env.NODE_ENV === "development",
      debug: process.env.NODE_ENV === "development",
    });

    // 2. Define Email Options
    const mailOptions = {
      from: "Your MERN App Support <support@yourdomain.com>", // Set a recognizable sender name
      to: options.email,
      subject: options.subject,
      text: options.message,
      // You can also add 'html' property for a richer email format
    };

    // 3. Send the Email
    const info = await transporter.sendMail(mailOptions);

    // Log success information (optional, helpful for debugging)
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error(
      "FAILED to send email. Check your EMAIL_USERNAME/PASSWORD in .env."
    );
    console.error(error);
    // Important: Rethrow the error so the controller can handle it (e.g., clear the reset token)
    throw new Error("Email sending failed.");
  }
};

export default sendEmail;
