import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOtp = async (otp , email) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your OTP Code',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6fb; font-family: 'Segoe UI', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 40px 32px;">
              <div style="width:60px; height:60px; background:rgba(255,255,255,0.2); border-radius:50%; display:inline-flex; align-items:center; justify-content:center; margin-bottom:16px;">
                <span style="font-size:28px;">🔐</span>
              </div>
              <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:700; letter-spacing:-0.5px;">Verify Your Identity</h1>
              <p style="margin:8px 0 0; color:rgba(255,255,255,0.8); font-size:14px;">One-Time Password Request</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin:0 0 8px; color:#6b7280; font-size:14px;">Hello,</p>
              <p style="margin:0 0 28px; color:#374151; font-size:15px; line-height:1.6;">
                We received a request to verify your identity. Use the OTP below to proceed. This code is valid for <strong>10 minutes</strong>.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center" style="background:#f0f4ff; border:2px dashed #667eea; border-radius:12px; padding:28px;">
                    <p style="margin:0 0 6px; color:#6b7280; font-size:12px; text-transform:uppercase; letter-spacing:2px; font-weight:600;">Your OTP Code</p>
                    <p style="margin:0; font-size:42px; font-weight:800; letter-spacing:12px; color:#4f46e5;">${otp}</p>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#fff7ed; border-left:4px solid #f97316; border-radius:0 8px 8px 0; padding:14px 16px;">
                    <p style="margin:0; color:#92400e; font-size:13px; line-height:1.5;">
                      ⚠️ <strong>Never share this OTP</strong> with anyone. Our team will never ask for it.
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin:0; color:#9ca3af; font-size:13px; line-height:1.6;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="background:#f9fafb; border-top:1px solid #e5e7eb; padding:24px 40px;">
              <p style="margin:0 0 4px; color:#6b7280; font-size:12px;">This is an automated email, please do not reply.</p>
              <p style="margin:0; color:#9ca3af; font-size:12px;">© 2025 YourApp. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });
    console.log('Email sent ✅:', info.messageId);
  } catch (err) {
    console.error('Error while sending mail:', err);
  }
};


export default sendOtp