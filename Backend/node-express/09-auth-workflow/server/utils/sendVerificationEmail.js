const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
    const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`
    const message = `<p>Please confirm your email by clicking on following link <br>
                        <a href=${verifyEmail}>${verificationToken}</a>    
                    </p>`;
  return sendEmail({
    to: email,
    subject: "Email confirmation",
    html: `<h1>hello ${name} </h1>${message}`,
  });
};

module.exports = sendVerificationEmail;
