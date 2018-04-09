var nodemailer = require('nodemailer');

//la funcion es la encargada de enviar al correo el usuario un link 
//para poder modificar su contraseña en caso de que la ubiera olvidado
function enviar(correo,asunto,html) {
    //esta sesion especifica el usuario que manda el correo
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gabotolosa97@gmail.com',
            pass: 'tolosa123'
        }
    });

    //se especifica el mensaje a enviar
    let mailOptions = {
        from: '"no-reply@elpoli.edu.co" <gabotolosa97@gmail.com>',
        to: correo,
        subject: asunto,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return(false);
        } else {
            console.log('enviado');
            return(true);
        }
    });
}
module.exports = enviar;