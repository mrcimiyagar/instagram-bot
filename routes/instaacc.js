const sw = require('../sequel-wrapper');
const ipb = require('../InstaPyBot/instapybot');
const express = require('express');

const router = express.Router();

router.post('/add_account', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(async function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0008', message: 'token is invalid.'});
            return;
        }
        let result = await sw.InstaAccount.create({
            username: req.body.username,
            password: req.body.password,
            title: req.body.title,
            userId: session.userId
        });
        ipb.notifyInstaAccountCreated(result);
        sw.Follow.findAll({where: {instaAccountId: result.instaAccountId}}).then(function (follows) {
            sw.Tag.findAll({where: {instaAccountId: result.instaAccountId}}).then(function (tags) {
                ipb.runInstaAgent(result.instaAccountId, result.username, result.password, follows, tags);
            });
        });
        res.send({status: 'success', instaAccount: result, message: "Instagram account added successfully."});
    });
});

router.post('/remove_account', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0009', message: 'token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: {username: req.body.username, userId: session.userId}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0010', message: 'you have not added instagram account.'});
            }
            instaAcc.destroy({force: true});
            ipb.stopInstaAgent(instaAcc.instaAccountId);
            res.send({status: 'success', instaAccount: instaAcc, message: "Instagram account removed successfully."});
        });
    });
});

router.post('/get_accounts', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0011', message: 'token is invalid.'});
            return;
        }
        sw.InstaAccount.findAll({where: {userId: session.userId}}).then(function (instaAccs) {
            res.send({status: 'success', instaAccounts: instaAccs, message: "Instagram accounts fetched successfully."});
        });
    });
});

module.exports = router;