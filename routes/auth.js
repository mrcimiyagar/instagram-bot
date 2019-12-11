const sw = require('../sequel-wrapper');
const express = require('express');
const nodemailer = require('nodemailer');
const tools = require('../tools');

const router = express.Router();

router.post('/forgot_password', function (req, res) {
    sw.UserAccount.findOne({where: {email: req.body.email}}).then(async function (uacc) {
       if (uacc == null) {
           res.send({status: 'error', errorCode: 'e0005', message: 'email is not registered.'});
           return;
       }
       sw.User.findOne({where: {email: uacc.email}}).then(function (user) {
           var vCode = tools.makeRandomCode(8);
           tools.sendMail(
               req.body.email,
               'InstaAiBot Recovery',
               'hello ' + user.firstName + ' ! \n' + 'Your recovery verification code is : ' + vCode,
               function () {
                   uacc.vCode = vCode;
                   uacc.forgot = true;
                   uacc.save();
                   res.send({status: 'success', message: "we've sent recovery verification code to your email."});
               },
               function () {
                   res.send({status: 'error', errorCode: 'e0002', message: 'could not send recovery verification email'});
               });
       });
    });
});

router.post('/reset_password', function (req, res) {
   sw.UserAccount.findOne({where: {email: req.body.email}}).then(function (uacc) {
       if (uacc == null) {
           res.send({status: 'error', errorCode: 'e0006', message: 'email is not registered.'});
           return;
       }
       if (uacc.forgot === true && uacc.vCode === req.body.vCode) {
           uacc.forgot = false;
           uacc.vCode = '';
           uacc.save();
           sw.User.findOne({where: {email: uacc.email}}).then(function (user) {
               user.password = req.body.password;
               user.save();
               res.send({status: 'success', message: 'your password changed successfully.'});
           });
       }
       else {
           res.send({status: 'error', errorCode: 'e0007', message: 'wrong verification code'});
       }
   });
});

router.post('/verify', function (req, res) {
   sw.UserAccount.findOne({where: {email: req.body.email}}).then(async function (uacc) {
       if (uacc == null) {
           res.send({status: 'error', errorCode: 'e0003', message: 'email is not registered.'});
           return;
       }
       if (req.body.vCode === uacc.vCode) {
           uacc.pending = false;
           uacc.vCode = '';
           uacc.save();
           sw.User.findOne({where: {email: uacc.email}}).then(async function (user) {
               let result = await sw.Session.create({
                   userId: user.userId,
                   token: tools.makeRandomCode(64)
               });
               res.send({status: 'success', session: result, message: 'you verified your account successfully.'});
           });
       }
       else {
           res.send({status: 'error', errorCode: 'e0004', message: 'verification code is wrong.'});
       }
   });
});

router.post('/register', function(req, res) {
    sw.User.findOne({ where: {email: req.body.email} }).then(async function (user) {
        if (user == null) {
            var vCode = tools.makeRandomCode(8);
            tools.sendMail(
                req.body.email,
                'InstaAiBot Registration',
                'hello ' + req.body.firstName + ' ! \n' + 'Your verification code is : ' + vCode,
                async function () {
                    let result = await sw.UserAccount.create({
                        email: req.body.email,
                        pending: true,
                        forgot: false,
                        vCode: vCode
                    });
                    let result2 = await sw.User.create({
                        username: req.body.username,
                        password: req.body.password,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email
                    });
                    res.send({
                        status: 'success',
                        userAccount: result,
                        user: result2,
                        message: "we've sent verification code to your email."
                    });
                },
                function () {
                    res.send({status: 'error', errorCode: 'e0002', message: 'could not send verification email'});
                });
        } else {
            res.send({status: 'error', errorCode: 'e0001', message: 'user with this email already exists.'});
        }
    });
});

router.post('/login', function(req, res) {
    sw.User.findOne({where: {username: req.body.username, password: req.body.password}}).then(function(user) {
        if (user == null) {
            res.send({status: 'error', errorCode: 'e0055', message: 'username not found'});
            return;
        }
        sw.Session.findOne({where: {userId: user.userId}}).then(function(session) {
           res.send({status: 'success', session: session, message: 'logged in successfully.'});
        });
    });
});

module.exports = router;