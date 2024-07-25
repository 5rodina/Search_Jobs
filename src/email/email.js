import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'



export const sendEmails = async (email,otpCode) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDEMAIL,
        pass: process.env.PASSWORD
      },
    });
  
    jwt.sign({ email }, process.env.SECRET_key, async (err, token) => {
        
        await transporter.sendMail({
          from: 'jobsearch <rodinaaymen@gmail.com>',
          to: email,
          html: `<a href="http://localhost:3000/verify/${token}">Click here to confirm , otp code is ${otpCode}</a>`
        });
    
    });
  };
  