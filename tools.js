
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
        const gmailUsername = 'keyhan.mohammadi1997@gmail.com';
        const gmailPassword = '2&b165sf4j)684tkt87El^o9w68i87u6s*4h48#98aq';
        const smtpTransport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secureConnection: false,
            port: 587,
            pool: true,
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
            to : destination,
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
