'use strict';

const {sleep} = require("../tools");
const exec = require('child_process').exec;
const kue = require('kue');
const sw = require('../sequel-wrapper');
const fs = require('fs');
const findP = require('find-process');

let runJobs = kue.createQueue();
runJobs.setMaxListeners(1000);
let stopJobs = kue.createQueue();
stopJobs.setMaxListeners(1000);

async function killInstaAgent(instaAccId) {
    await execCommand(`pkill insta-ai-bot-` + instaAccId);
}

function createQueue(acc) {
    runJobs.process('account-run-agent-jobs-' + acc.instaAccountId, async function (job, done) {

        let mw = require('../mongo-wrapper');
        while (mw.Config === undefined || mw.configSchema === undefined) {
            await sleep(1000);
            mw = require('../mongo-wrapper');
        }

        await killInstaAgent(job.data.instaAccId);

        let config = {};

        let followTargetsData = await sw.Follow.findAll();
        let followTargets = [];
        followTargetsData.forEach((followTarget) => {
            followTargets.push(followTarget.username);
        });
        config.follow = {};
        config.follow.follow_targets = followTargets;

        let likeTargetsData = await sw.Like.findAll();
        let likeTargets = [];
        likeTargetsData.forEach((likeTarget) => {
            likeTargets.push(likeTarget.username);
        });
        config.like = {};
        config.like.like_targets = likeTargets;

        let commentTargetsData = await sw.Comment.findAll();
        let commentTargets = [];
        commentTargetsData.forEach((commentTarget) => {
            commentTargets.push(commentTarget.username);
        });
        config.comment = {};
        config.comment.comment_targets = commentTargets;

        let tagTargetsData = await sw.Tag.findAll();
        let tagTargets = [];
        tagTargetsData.forEach((tagTarget) => {
            tagTargets.push(tagTarget.title);
        });
        config.tag = {};
        config.tag.tag_targets = tagTargets;

        let blockTargetsData = await sw.Block.findAll();
        let blockTargets = [];
        blockTargetsData.forEach((blockTarget) => {
            blockTargets.push(blockTarget.data);
        });
        config.block = {};
        config.block.block_targets = blockTargets;

        let c = await mw.Config.findOne({instaAccId: job.data.instaAccId});

        while (c === null) {
            await sleep(1000);
            c = await mw.Config.findOne({instaAccId: job.data.instaAccId});
        }

        console.log("hello..............................................................................................");

        const finalConfig = {...config, ...c._doc};

        await fs.writeFile(`./InstaPyBot/${job.data.instaAccId}.json`, JSON.stringify(finalConfig));
        console.log("Config has been written to disk.");
        await execCommand('python3 instapybot.py ' + job.data.instaAccId + ' "' + job.data.username + '" "' + job.data.password + '"');
        done && done();
    });
    stopJobs.process('account-stop-agent-jobs-' + acc.instaAccountId, async function (job, done) {
        await killInstaAgent(job.data.instaAccId);
        done && done();
    });
}

module.exports = {
    setup: async function () {
        let accs = await sw.InstaAccount.findAll();
        accs.forEach(function (acc) {
            createQueue(acc);
        });
    },
    notifyInstaAccountCreated: function (acc) {
        createQueue(acc);
    },
    runInstaAgent: async function (instaAccId, username, password) {
        let job = runJobs.create('account-run-agent-jobs-' + instaAccId, {
            instaAccId : instaAccId,
            username : username,
            password : password,
        });
        job.save(function () {});
    },
    stopInstaAgent: async function (instaAccId) {
        let job = stopJobs.create('account-stop-agent-jobs-' + instaAccId, {
            instaAccId : instaAccId
        });
        job.save(function () {});
    }
};

async function execCommand(command) {
    console.log('executing', command);
    let child = exec(command, {cwd: '/home/InstaAiBot/InstaPyBot'});
    child.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    child.on('close', function (code) {
        console.log('closing code: ' + code);
    });
}