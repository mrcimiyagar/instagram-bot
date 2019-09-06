'use strict';
const exec = require('child_process').exec;
const kue = require('kue');
const sw = require('../sequel-wrapper');

let runJobs = kue.createQueue();
let stopJobs = kue.createQueue();

function createQueue(acc) {
    runJobs.process('account-run-agent-jobs-' + acc.instaAccountId, async function (job, done) {
        await execCommand('pkill "insta-ai-bot-' + job.data.instaAccId + '"');
        let followStr = '';
        job.data.followTargets.forEach(function (follow) {
            followStr += ' ' + follow.username;
        });
        let tagStr = '';
        job.data.tagTargets.forEach(function (tag) {
            tagStr += ' ' + tag.title;
        });
        await execCommand('python instapybot.py ' + job.data.instaAccId + ' ' + job.data.username + ' ' + job.data.password + ' --follow' + followStr + ' --tag' + tagStr);
        done && done();
    });
    stopJobs.process('account-stop-agent-jobs-' + acc.instaAccountId, async function (job, done) {
        await execCommand('pkill "insta-ai-bot-' + job.data.instaAccId + '"');
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
    runInstaAgent: function (instaAccId, username, password, followTargets, tagTargets) {
        let job = runJobs.create('account-run-agent-jobs-' + instaAccId, {
            instaAccId : instaAccId,
            username : username,
            password : password,
            followTargets : followTargets,
            tagTargets : tagTargets
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
    let child = exec(command, {cwd: '/home/keyhan/projects/js/InstaAiBot/InstaPyBot'});
    child.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    child.on('close', function (code) {
        console.log('closing code: ' + code);
    });
    await child;
}