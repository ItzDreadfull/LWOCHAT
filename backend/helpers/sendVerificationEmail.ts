import nodemailer from "nodemailer";
import VerificationEmail from "../emails/VerificationEmail";
import responseMsg from "./responseMsg";
import { ApiResponse } from "../types/ApiResponce";

export async function sendVerificationEmail(
    email: string,
    fullName: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: "gmail", // Use Gmail or another SMTP provider
            auth: {
                user: process.env.EMAIL_USER, // Your email (use environment variables for security)
                pass: process.env.EMAIL_PASS, // Your app-specific password
            },
        });

        // Email options
        const mailOptions = {
            from: '"WinChat" <winchat.pl@gmail.com>', // Sender address
            to: email, // Recipient's email address
            subject: "WinChat | Verification Code", // Email subject
            text: `Your verification code is: ${verifyCode}`, // Plain text body
            // html: `<p>Your verification code is: <b>${verificationCode}</b></p>`, // HTML body
            html: VerificationEmail({ fullName, otp: verifyCode }),

        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        if (!info) {
            return { success: false, message: "Verification email not send" }
        }

        return { success: true, message: "Verification email send successfully" }


    } catch (error: any) {
        console.error("Error sending email:", error);
        return { success: false, message: "Error sending email" }
    }
};
