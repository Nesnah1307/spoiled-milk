let mailConfig = {
    // all emails are delivered to destination
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'process.env.EMAIL_USERNAME',
        pass: 'process.env.EMAIL_PASSWORD'
    },
};
let transporter = nodemailer.createTransport(mailConfig);

const inventoryLow = {
    from: "sender@gmail.com", 
    subject: "INVENTORY LOW",
    text: "Your inventory needs to be restocked."
}

module.exports = { transporter, inventoryLow }



// code below will be added to the inventory route
// const { transporter, inventoryLow } = require('../../config/mailConfig.js')

//         ((req, res) => {
//             inventoryLow.to = req.params.useremail
//             transporter.sendMail(inventoryLow).then(info => {
//                 res.json({ info })
//             })
//         })