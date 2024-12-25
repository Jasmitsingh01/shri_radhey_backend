import nodemailer from 'nodemailer';

 const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
    auth: {
        user: 'jasmits007@gmail.com',
        pass:'fqaf qjjv awwu mliu',
    }
});

export default transporter;
