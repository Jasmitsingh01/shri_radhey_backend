
import transporter from "./mail.config";
import dotenv from 'dotenv';
dotenv.config({ 
    path: '../../.env'
});

 function sendmail(to: string, subject: string, html: string) {
  const mailOptions = {
    from: process.env.MAIL ,
    to: to,
    subject: subject,
    html: html,
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.error(err);
        } else {
             console.log('Email sent successfully to ',to );
        }
        }
    );
}
export default sendmail;