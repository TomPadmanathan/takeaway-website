const sgMail = require('@sendgrid/mail');
// import sgMail from '@sendgrid/mail';
sgMail.setApiKey(
    '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'
);
const msg = {
    to: 'padmanathantom@gmail.com', // Change to your recipient
    from: 'takeawaysite2@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent');
    })
    .catch((error: string) => {
        console.error(error);
    });
