const sw = require('../sequel-wrapper');
const express = require('express');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const router = express.Router();

router.post('/add_block_target', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0030', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: { [op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0031', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Block.findOne({where: { [op.and]: [ {data: req.body.data}, {[op.and] : [ {type: req.body.type}, {instaAccountId: instaAcc.instaAccountId}]}]}}).then(async function (block) {
                if (block !== null) {
                    res.send({status: 'error', errorCode: 'e0032', message: 'The block target already exists.'});
                    return;
                }
                let result = await sw.Block.create({
                    instaAccountId: instaAcc.instaAccountId,
                    type: req.body.type,
                    data: req.body.data
                });
                res.send({status: 'success', blockTarget: result, message: "Block target created successfully."});
            });
        });
    });
});

router.post('/remove_block_target', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0033', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: { [op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0034', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Block.findOne({where: { [op.and] : [ {blockId: req.body.blockId}, {instaAccountId: instaAcc.instaAccountId}]}}).then(async function (block) {
                if (block === null) {
                    res.send({status: 'error', errorCode: 'e0035', message: 'The block target does not exist.'});
                    return;
                }
                block.destroy({force: true});
                res.send({status: 'success', blockTarget: block, message: "Block target removed successfully."});
            });
        });
    });
});

router.post('/get_block_targets', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0036', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: { [op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0037', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Block.findOne({where: {instaAccountId: instaAcc.instaAccountId}}).then(async function (blocks) {
                res.send({status: 'success', blockTargets: blocks, message: "Block targets fetched successfully."});
            });
        });
    });
});

module.exports = router;