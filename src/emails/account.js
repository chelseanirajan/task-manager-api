const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

sgMail.send({
    to: 'chelseanirajan@gmail.com',
    from: 'chelseanirajan@gmail.com',
    subject: 'this is my first email creation',
    text: 'i hope this one actually get to you'
})

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'chelseanirajan@gmail.com',
        subject: 'Welcome to the app!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    })
}

const sendGoodByeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'chelseanirajan@gmail.com',
        subject: 'GoodBye',
        text: `Goodbye, ${name}. Have a great time ahead.`
    })
}

module.exports  = {
    sendWelcomeEmail,
    sendGoodByeEmail
}
