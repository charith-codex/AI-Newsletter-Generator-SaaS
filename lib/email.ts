import { Resend } from "resend";

export async function sendEmail(
  email: string,
  categories: string,
  article_count: number,
  newsletter_content: string
) {
  const currentDate = new Date().toLocaleDateString();

  const resend = new Resend(process.env.RESEND_API_KEY);

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your AI Newsletter",
    html: `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Personalized AI Newsletter</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0;">

  <!-- Container -->
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <tr>
      <td style="padding: 20px; text-align: center; border-bottom: 1px solid #e5e7eb;">
        <h2 style="margin: 0; font-size: 22px;">📰 Personalized AI Newsletter</h2>
        <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0;">Your daily dose of curated news</p>
      </td>
    </tr>

    <!-- Summary -->
    <tr>
      <td style="padding: 20px;">
        <div style="background-color: #eef2ff; padding: 16px; border-radius: 6px;">
          <h3 style="margin-top: 0; font-size: 16px; color: #4338ca;">📌 Newsletter Summary</h3>
          <p style="margin: 4px 0;"><strong>Categories:</strong> ${categories}</p>
          <p style="margin: 4px 0;"><strong>Articles analyzed:</strong> ${article_count}</p>
          <p style="margin: 4px 0;"><strong>Generated on:</strong> ${currentDate}</p>
        </div>
      </td>
    </tr>

    <!-- Content -->
    <tr>
      <td style="padding: 20px;">
        ${newsletter_content}
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 16px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
        This newsletter was generated just for you using AI technology.<br>
        Thank you for subscribing to our personalized newsletter service.
      </td>
    </tr>

  </table>

</body>
</html>
    `,
  });
}
