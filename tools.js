
module.exports = {
    'makeRandomCode' : function(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    'toJson': function(obj) {
        const flatted = require('flatted');
        return flatted.stringify(obj);
    },
    'sendMail': function (destination, subject, content, success, failure) {
        const nodemailer = require('nodemailer');
        const gmailUsername = 'username';
        const gmailPassword = 'password';
        const smtpTransport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secureConnection: false,
            port: 587,
            tls: {
                ciphers:'SSLv3'
            },
            requireTLS:true,
            auth: {
                user: gmailUsername,
                pass: gmailPassword
            }
        });
        var mailOptions={
            from: gmailUsername,
            to : req.body.email,
            subject : subject,
            text : content
        };
        smtpTransport.sendMail(mailOptions, function(error, response){
            if (error) {
                console.log(error);
                failure();
            }
            else{
                console.log(response);
                success();
            }
        });
    }
};
