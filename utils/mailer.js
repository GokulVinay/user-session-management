const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Change if using another email provider
  auth: {
    user: process.env.EMAIL_USER, // Set this in .env
    pass: process.env.EMAIL_PASS, // Set this in .env
  },
});

/**
 * Sends an email.
 * @param {string} to - Recipient's email.
 * @param {string} subject - Email subject.
 * @param {string} text - Email body text.
 */
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("📧 Email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = sendEmail;
