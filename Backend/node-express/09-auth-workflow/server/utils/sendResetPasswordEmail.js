const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = ({ name, email, token, origin }) => {
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p>Please reset password by clicking on following link <br><br>
                        <a href=${resetURL}>${token}</a>    
                    </p>`;
  return sendEmail({
    to: email,
    subject: "Reset password",
    html: `<h1>hello ${name} </h1> <br><br>${message}`,
  });
};
module.exports = sendResetPasswordEmail;
