
import transporter from "./mail.config";

function sendmail(to: string, subject: string, html: string) {
  const mailOptions = {
    from: 'jasmits007@gmail.com',
    to: to,
    subject: subject,
    html: html,
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.error(err);
        } else {
             console.log(info)
        }
        }
    );
}
export default sendmail;