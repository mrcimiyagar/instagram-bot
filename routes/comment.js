const sw = require('../sequel-wrapper');
const express = require('express');
const Sequelize = require('Sequelize');
const op = Sequelize.Op;

const router = express.Router();

router.post('/add_comment_target', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0045', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: { [op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0046', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Comment.findOne({where: { [op.and]: [ {username: req.body.username}, {instaAccountId: instaAcc.instaAccountId}]}}).then(async function (like) {
                if (like !== null) {
                    res.send({status: 'error', errorCode: 'e0047', message: 'The comment target already exists.'});
                    return;
                }
                let result = await sw.Comment.create({
                    instaAccountId: instaAcc.instaAccountId,
                    username: req.body.username
                });
                res.send({status: 'success', comment: result, message: "Comment target created successfully."});
            });
        });
    });
});

router.post('/remove_comment_target', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0048', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: { [op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0049', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Comment.findOne({where: { [op.and] : [ {likeId: req.body.commentId}, {instaAccountId: instaAcc.instaAccountId}]}}).then(async function (comment) {
                if (comment === null) {
                    res.send({status: 'error', errorCode: 'e0050', message: 'The comment target does not exist.'});
                    return;
                }
                comment.destroy({force: true});
                res.send({status: 'success', comment: comment, message: "Comment target removed successfully."});
            });
        });
    });
});

router.post('/get_comment_targets', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0051', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: { [op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0052', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Comment.findOne({where: {instaAccountId: instaAcc.instaAccountId}}).then(async function (comments) {
                res.send({status: 'success', comments: comments, message: "Comment targets fetched successfully."});
            });
        });
    });
});

module.exports = router;