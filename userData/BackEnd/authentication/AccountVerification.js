import nodemailer from "nodemailer";

export const AccountVerificationEmail = async (otp, email) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MY_GMAIL,
      pass: process.env.MY_PASS,
    },
  });

  // Send an email using async/ await
  try {
    const info = await transport.sendMail({
      from: "aniltechnology26@gmail.com",
      to: email,
      subject: "Heelo User Account verification ",
      text: "Hello",
      html: `<h2>Email Verification</h2>
    <p>Your OTP code is:</p>
    <h1 style="letter-spacing:3px;">${otp}</h1>
    <p>This code is valid for 10 minutes.</p>
    <p>Do not share this OTP with anyone.</p>`,
    });
    return info;
  } catch (err) {
    return err.message;
  }
};
