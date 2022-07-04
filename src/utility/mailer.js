import nodemailer from "nodemailer";

const emailSender = async(email,message) =>{
    // const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'dharmjat454545@gmail.com',
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user : 'dharmjat454545@gmail.com',
            pass : '06021995',

        },
    })

    const mailOptions = {
        from : 'dharmjat454545@gmail.com',
        to : email,
        subject : 'welcome to brainStorm',
        text : message,
    }

    transporter.sendMail(mailOptions, (error,info) => {
        if(error) console.log(error)
        else{
            console.log('Email Sent :' + info.response);
            return info.response
        }
    })

}
