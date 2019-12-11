
const ipb = require("../InstaPyBot/instapybot");
const sw = require('../sequel-wrapper');
const express = require('express');
const Sequelize = require('sequelize');
const {sleep} = require("../tools");

const router = express.Router();

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
            console.log(c);
            let mw = require('../mongo-wrapper');
            while(mw.Config === undefined || mw.configSchema === undefined) {
                await sleep(1000);
                mw = require('../mongo-wrapper');
            }
            if (!(c instanceof mw.Config)) {
                res.send({status: 'error', errorCode: 'e0053', message: 'Invalid config packet.'});
                return;
            }
            let instaAccId = c.instaAccId;
            let config = await mw.Config.findOne({instaAccId: instaAccId});
            if (config === null || config === undefined) {
                res.send({status: 'error', errorCode: 'e0054', message: 'Insta account not found.'});
                return;
            }
            config = new mw.Config();
            const result = await config.save();
            console.log(JSON.stringify(result));
            await mw.Config.updateOne({instaAccId: instaAccId}, {$set: c});
            await mw.Config.save();
            console.log(`config of insta account with acc id ${instaAccId} updated.`);
            ipb.runInstaAgent(instaAcc.instaAccountId, instaAcc.username, instaAcc.password);
            res.send({status: 'success', message: "Insta account config updated successfully."});
        });
    });
});

module.exports = {
    'router': router,
};