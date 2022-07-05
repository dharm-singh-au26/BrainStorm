import nodemailer from "nodemailer";

export const emailSender = async(email,message) =>{


    const transporter = nodemailer.createTransport({
        host: 'dharmjat454.dj@gmail.com',
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user : 'dharmjat45.dj@gmail.com',
            pass : 'trbwzfilrvkkdvtr',

        },
    })

    const mailOptions = {
        from : 'dharmjat45.dj@gmail.com',
        to : email,
        subject : 'welcome to brainStorm',
        text : message,
    }

    try {
        await transporter.sendMail(mailOptions)
        return {
            status: 'success',
            message: 'mail sent'
        }
    } catch (error) {
        return {
            status: 'failed',
            message: 'something went wrong'
        }
        console.log(error)
    }
}
