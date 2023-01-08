const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID, // ClientID
  process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.NEXT_PUBLIC_GMAIL_REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();

export default async (
  req: { body: { name: any; email: any; verifyUrl: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { status: string }): void; new (): any };
    };
  }
) => {
  const { name, email, verifyUrl } = req.body;

  console.log(name, email, verifyUrl, {
    googleID: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID,
    googleSec: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET,
    RT: process.env.NEXT_PUBLIC_GMAIL_REFRESH_TOKEN,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      type: "OAuth2",
      user: "foggnative@gmail.com",
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET,
      refreshToken: process.env.NEXT_PUBLIC_GMAIL_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error: any, success: unknown) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailOption = {
    from: `Thomas from Fogg`,
    to: `${email}`,
    subject: `Hello ${name} ! Please confirm your email`,
    generateTextFromHTML: true,
    html: `<h1>Hello ${name}</h1><h2 style="color:green">Welcome to Fogg !</h2><p>Please confirm your mail address by clicking on the link bellow</p><a href=${verifyUrl}>Verify my mail address</a>`,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOption, (err: any, info: unknown) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });

  res.status(200).json({ status: "OK" });
};
