
interface VerificationEmailProps {
    fullName: string;
    otp: string;
}

export default function VerificationEmail({ fullName, otp }: VerificationEmailProps) {
    return (`<html lang="en" dir="ltr">
    <head>
      <title>Verification Code</title>
      <style>
        @font-face {
          font-family: "Roboto";
          src: url("https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2") format("woff2");
          font-weight: 400;
          font-style: normal;
        }
        body {
          font-family: "Roboto", Verdana, sans-serif;
          margin: 0;
          padding: 0;
        }
        h2 {
          font-size: 24px;
          margin-bottom: 16px;
        }
        p {
          font-size: 16px;
          margin-bottom: 16px;
        }
      </style>
    </head>
    <body>
      <span style="display:none;">Here's your verification code: ${otp}</span>
    
          <h2>Hello ${fullName},</h2>
    
            <p>Wellcome to WinChat. Please use the following verification code to complete your registration:</p>
    
            <p><strong>${otp}</strong></p></td>
    
            <p>If you did not request this code, please ignore this email.</p>
    
    </body>
  </html>`);
}