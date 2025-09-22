import nodemailer from "nodemailer";

const correoRegistro = async (datos) => {
    // integracion de nodemailer con mailtrap
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // enviar el email
    const { nombre, correo, token, usuario } = datos;

    await transport.sendMail({
        from: "no-reply@accounts.catasys.com",
        to: correo,
        subject: "[Cuenta CataSys] Confirmación de tu cuenta",
        // text: "parametro text",
        html: `
        <p>Este es un correo automatico enviado desde CataSys</p><br/>
        
        <p>Hola ${nombre}, confirma tu cuenta.</p>

        <p>Tu nombre de usuario es: <strong>${usuario}</strong>, con ese nombre iniciarás sesión.</p>

        <p>Tu cuenta ya ha sido creada, solo debes de confirmarla en el siguiente enlace: <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}" >Confirma tu cuenta aqui</a>.</p>

        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>
        `,
    });
    console.log(datos);
};

export { correoRegistro };
