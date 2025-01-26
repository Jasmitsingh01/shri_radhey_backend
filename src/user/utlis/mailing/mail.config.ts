import nodemailer from 'nodemailer';
import  dotenv from 'dotenv';
dotenv.config({
    path:'.env'
});

 const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service:"gmail",
  port: 465,
    auth: {
        user: process.env.MAIL || "",
        pass: process.env.PASS_MAIL || "",
    }
});

export default transporter;
