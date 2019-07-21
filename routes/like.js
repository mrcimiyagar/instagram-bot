const sw = require('../sequel-wrapper');
const express = require('express');
const Sequelize = require('Sequelize');
const op = Sequelize.Op;

const router = express.Router();

router.post('/add_like_target', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0038', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: { [op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0038', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Like.findOne({where: { [op.and]: [ {username: req.body.username}, {instaAccountId: instaAcc.instaAccountId}]}}).then(async function (like) {
                if (like !== null) {
                    res.send({status: 'error', errorCode: 'e0039', message: 'The like target already exists.'});
                    return;
                }
                let result = await sw.Like.create({
                    instaAccountId: instaAcc.instaAccountId,
                    username: req.body.username
                });
                res.send({status: 'success', like: result, message: "Like target created successfully."});
            });
        });
    });
});

router.post('/remove_like_target', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0040', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: { [op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0041', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Block.findOne({where: { [op.and] : [ {likeId: req.body.likeId}, {instaAccountId: instaAcc.instaAccountId}]}}).then(async function (like) {
                if (like === null) {
                    res.send({status: 'error', errorCode: 'e0042', message: 'The like target does not exist.'});
                    return;
                }
                like.destroy({force: true});
                res.send({status: 'success', like: like, message: "Like target removed successfully."});
            });
        });
    });
});

router.post('/get_like_targets', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0043', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: { [op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0044', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Like.findOne({where: {instaAccountId: instaAcc.instaAccountId}}).then(async function (likes) {
                res.send({status: 'success', likes: likes, message: "Like targets fetched successfully."});
            });
        });
    });
});

module.exports = router;