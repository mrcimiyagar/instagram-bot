const sw = require('../sequel-wrapper');
const ipb = require('../InstaPyBot/instapybot');
const express = require('express');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const router = express.Router();

router.post('/add_tag', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0012', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: {[op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0013', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Tag.findOne({
                where: {
                    instaAccountId: instaAcc.instaAccountId,
                    title: req.body.title
                }
            }).then(async function (tag) {
                if (tag !== null) {
                    res.send({status: 'error', errorCode: 'e0014', message: 'Tag already exists.'});
                    return;
                }
                let result = await sw.Tag.create({
                    title: req.body.title,
                    instaAccountId: instaAcc.instaAccountId
                });
                sw.Follow.findAll({where: {instaAccountId: instaAcc.instaAccountId}}).then(function (follows) {
                    sw.Tag.findAll({where: {instaAccountId: instaAcc.instaAccountId}}).then(function (tags) {
                        ipb.runInstaAgent(instaAcc.instaAccountId, instaAcc.username, instaAcc.password);
                    });
                });
                res.send({status: 'success', tag: result, message: "Tag created successfully."});
            });
        });
    });
});

router.post('/remove_tag', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0015', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: {[op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0016', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Tag.findOne({
                where: {
                    instaAccountId: instaAcc.instaAccountId,
                    tagId: req.body.tagId
                }
            }).then(function (tag) {
                if (tag === null) {
                    res.send({status: 'error', errorCode: 'e0017', message: 'Tag does not exist.'});
                    return;
                }
                tag.destroy({force: true});
                sw.Follow.findAll({where: {instaAccountId: instaAcc.instaAccountId}}).then(function (follows) {
                    sw.Tag.findAll({where: {instaAccountId: instaAcc.instaAccountId}}).then(function (tags) {
                        ipb.runInstaAgent(instaAcc.instaAccountId, instaAcc.username, instaAcc.password);
                    });
                });
                res.send({status: 'success', message: "Tag removed successfully."});
            });
        });
    });
});

router.post('/get_tags', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0018', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: {[op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0019', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Tag.findAll({
                where: {
                    instaAccountId: instaAcc.instaAccountId
                }
            }).then(function (tags) {
                res.send({status: 'success', tags: tags, message: "Tags fetched successfully."});
            });
        });
    });
});

router.post('/search_tags', function (req, res) {
    sw.Session.findOne({where: {token: req.body.token}}).then(function (session) {
        if (session === null) {
            res.send({status: 'error', errorCode: 'e0020', message: 'Token is invalid.'});
            return;
        }
        sw.InstaAccount.findOne({where: { [op.and]: [{userId: session.userId}, {instaAccountId: req.body.instaAccountId}]}}).then(function (instaAcc) {
            if (instaAcc === null) {
                res.send({status: 'error', errorCode: 'e0021', message: 'You have not added this Instagram account.'});
                return;
            }
            sw.Tag.findAll({
                where: {
                    [op.or] : [
                        {
                            instaAccountId: instaAcc.instaAccountId,
                        },
                        {
                            title: {[op.like]: '%' + req.body.query + '%'}
                        }
                    ]
                }
            }).then(function (tags) {
                res.send({status: 'success', tags: tags, message: "Tags found successfully."});
            });
        });
    });
});

module.exports = router;