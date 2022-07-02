var mailConfig;
if (process.env.NODE_ENV === 'production' ){
    // all emails are delivered to destination
    mailConfig = {
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
            user: 'real.user',
            pass: 'verysecret'
        }
    };
} else {
    // all emails are catched by ethereal.email
    mailConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ethereal.user@ethereal.email',
            pass: 'verysecret'
        }
    };
}
let transporter = nodemailer.createTransport(mailConfig);

const inventoryLow = {
    from: "sender@server.com",
    subject: "INVENTORY LOW",
    text: "Plaintext version of the message"
}

module.exports = { transporter, inventoryLow }

const { transporter, inventoryLow } = require ('../../config')

(( req, res) => {
    inventoryLow.to = req.params.useremail
    transporter.sendMail(inventoryLow).then(info => {
        res.json({ info })
    })
})