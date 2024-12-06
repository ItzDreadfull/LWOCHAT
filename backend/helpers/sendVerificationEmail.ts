import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponce } from "@/types/ApiResponce";


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponce> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'mistry Box | Verification code',
            react: VerificationEmail({ username, otp: verifyCode }),
        });
        return { success: true, message: 'Verification email send successfully' }

    } catch (emailError) {
        console.error("Error sending verification email", emailError)
        return { success: false, message: 'Faild to send verification email' }
    }
}