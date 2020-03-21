
const ipb = require("../InstaPyBot/instapybot");
const sw = require('../sequel-wrapper');
const express = require('express');
const Sequelize = require('sequelize');
const {sleep} = require("../tools");

const router = express.Router();

function removeEmptyArrays(obj) {
    for (prop in obj) {
        if (typeof(obj[prop]) === 'object') {
            removeEmptyArrays(obj[prop]);
        }
        else {
            if (Array.isArray(obj[prop]) && obj[prop].length === 1 && obj[prop][0] === "") {
                obj[prop] = [];
            }
        }
    }
}

router.post('/edit_config', async function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0022', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: {[Sequelize.Op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(async function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0023', message: 'You have not added this Instagram account.'});
                return;
            }
            let c = req.body.config;
            removeEmptyArrays(c);
            let mw = require('../mongo-wrapper');
            c = mw.Config.hydrate(c);
            let instaAccId = req.body.instaAccountId;
            let config = await mw.Config.findOne({instaAccId: instaAccId});
            if (config === null || config === undefined) {
                config = new mw.Config();
                config.instaAccId = instaAccId;
                await config.save();
            }
            let updateRes = await mw.Config.updateOne({instaAccId: instaAccId}, {$set: c});
            console.log(updateRes);
            ipb.runInstaAgent(instaAcc.instaAccountId, instaAcc.username, instaAcc.password);
            res.send({status: 'success', message: "Insta account config updated successfully."});
        });
    });
});

router.post('/get_config', async function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0022', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: {[Sequelize.Op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(async function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0023', message: 'You have not added this Instagram account.'});
                return;
            }
            let mw = require('../mongo-wrapper');
            let c = await mw.Config.findOne({instaAccId: req.body.instaAccountId});
            res.send({status: 'success', config: c.toObject(), message: "Insta account config fetched successfully."});
        });
    });
});

module.exports = {
    'router': router,
};