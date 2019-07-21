const sw = require('../sequel-wrapper');
const express = require('express');
const Sequelize = require('Sequelize');
const op = Sequelize.Op;

const router = express.Router();

router.post('/add_follow_target', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0022', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: { [op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0023', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Follow.findOne({where: {[op.and]: [{instaAccountId: instaAcc.instaAccountId}, {username: req.body.username}]}}).then(async function (follow) {
                if (follow !== null) {
                    res.send({status: 'error', follow_target: follow, errorCode: 'e0024', message: 'Follow target already exists.'});
                    return;
                }
                let result = await sw.Follow.create({
                    username: req.body.username,
                    instaAccountId: instaAcc.instaAccountId
                });
                res.send({status: 'success', follow_target: result, message: "Follow target created successfully."});
            });
        });
    });
});

router.post('/remove_follow_target', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0025', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: { [op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0026', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Follow.findOne({where: { [op.and]: [{instaAccountId: instaAcc.instaAccountId}, {followId: req.body.followId}]}}).then(function (follow) {
                if (follow === null) {
                    res.send({status: 'error', errorCode: 'e0027', message: 'Follow target does not exist.'});
                    return;
                }
                follow.destroy({force: true});
                res.send({status: 'success', follow_target: result, message: "Follow target removed successfully."});
            });
        });
    });
});

router.post('/get_follow_targets', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0028', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: { [op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0029', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Follow.findAll({where: {instaAccountId: instaAcc.instaAccountId}}).then(function (follows) {
                res.send({status: 'success', follow_targets: follows, message: "Follow target created successfully."});
            });
        });
    });
});

module.exports = router;