const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const sendEmailUsingEthereal  = async(req, res)=> {
    let testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'cullen.cormier91@ethereal.email',
            pass: '3s6VEeUmx4JwM3rypH'
        }
    });

    let info = await transporter.sendMail({
        from: '"Ujjwal" <bhattaraiujjwal26@gmail.com>',
        to: 'bhattarairavi38@gmail.com',
        subject: "test email alert",
        html: '<h2 style="text-align: center">Sending test mail</h2><button>DOnt click on this button</button>',
    })
    res.json(info);
}

const sendEmail = (req, res)=> {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'bhattaujjwal2@gmail.com',
        from: 'bhattaraiujjwal26@gmail.com',
        subject: "test email",
        text: "hello everyone this is the test mail from me",
        html: '<button style="width: 12rem; padding: 1rem; background: blue; color: white; border: none"><a href="https://www.facebook.com"> dont click this button</a></button>'
    };
    sgMail
        .send(msg)
        .then(()=> {
            console.log("email sent")
        })
        .catch((error)=> {
            console.log(error.response.body);
        });

    res.json("ok");
}

module.exports = sendEmail;