const axios = require('axios');
const io = require('console-read-write');

let token = 'empty';

// auth ----------------------------------------------------------------------------------------------------------------

async function register(username, password, firstName, lastName, email) {
    try {
        const data = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        };
        return await axios.post('http://localhost:3000/api/auth/register', data);
    } catch (e) {
        console.error(e);
    }
}

async function verify(email, vCode) {
    try {
        const data = {
            email: email,
            vCode: vCode
        };
        let res = await axios.post('http://localhost:3000/api/auth/verify', data);
        token = res.data.session.token;
        return res;
    } catch (e) {
        console.error(e);
    }
}

async function forgotPassword(email) {
    try {
        const data = {
            email: email
        };
        return await axios.post('http://localhost:3000/api/auth/forgot_password', data);
    } catch (e) {
        console.error(e);
    }
}

async function resetPassword(email, vCode, password) {
    try {
        const data = {
            email: email,
            vCode: vCode,
            password: password
        };
        return await axios.post('http://localhost:3000/api/auth/reset_password', data);
    } catch (e) {
        console.error(e);
    }
}

// instaacc ------------------------------------------------------------------------------------------------------------

async function addInstaAccount(instaUsername, instaPassword, accountTitle) {
    try {
        const data = {
            token: token,
            username: instaUsername,
            password: instaPassword,
            title: accountTitle
        };
        return await axios.post('http://localhost:3000/api/insta_acc/add_account', data);
    } catch (e) {
        console.error(e);
    }
}

async function removeInstaAccount(instaUsername) {
    try {
        const data = {
            token: token,
            username: instaUsername
        };
        return await axios.post('http://localhost:3000/api/insta_acc/remove_account', data);
    } catch (e) {
        console.error(e);
    }
}

async function getInstaAccounts() {
    try {
        const data = {
            token: token
        };
        return await axios.post('http://localhost:3000/api/insta_acc/get_accounts', data);
    } catch (e) {
        console.error(e);
    }
}

// tags ----------------------------------------------------------------------------------------------------------------

async function addTag(instaAccId, tagValue) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId,
            title: tagValue
        };
        return await axios.post('http://localhost:3000/api/tag/add_tag', data);
    } catch (e) {
        console.error(e);
    }
}

async function removeTag(instaAccId, tagId) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId,
            tagId: tagId
        };
        return await axios.post('http://localhost:3000/api/tag/remove_tag', data);
    } catch (e) {
        console.error(e);
    }
}

async function getTags(instaAccId) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId
        };
        return await axios.post('http://localhost:3000/api/tag/get_tags', data);
    } catch (e) {
        console.error(e);
    }
}

async function searchTags(instaAccId, query) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId,
            query: query
        };
        return await axios.post('http://localhost:3000/api/tag/search_tags', data);
    } catch (e) {
        console.error(e);
    }
}


// block ---------------------------------------------------------------------------------------------------------------

async function addBlockTarget(instaAccId, blockTargetData, blockTargetType) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId,
            data: blockTargetData,
            type: blockTargetType
        };
        return await axios.post('http://localhost:3000/api/block/add_block_target', data);
    } catch (e) {
        console.error(e);
    }
}

async function removeBlockTarget(instaAccId, blockId) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId,
            blockId: blockId
        };
        return await axios.post('http://localhost:3000/api/block/remove_block_target', data);
    } catch (e) {
        console.error(e);
    }
}

async function getBlockTargets(instaAccId) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId
        };
        return await axios.post('http://localhost:3000/api/block/get_block_targets', data);
    } catch (e) {
        console.error(e);
    }
}

// follow --------------------------------------------------------------------------------------------------------------

async function addFollowTarget(instaAccId, instaUsername) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId,
            username: instaUsername
        };
        return await axios.post('http://localhost:3000/api/follow/add_follow_target', data);
    } catch (e) {
        console.error(e);
    }
}

async function removeFollowTarget(instaAccId, followId) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId,
            followId: followId
        };
        return await axios.post('http://localhost:3000/api/follow/remove_follow_target', data);
    } catch (e) {
        console.error(e);
    }
}

async function getFollowTargets(instaAccId) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId
        };
        return await axios.post('http://localhost:3000/api/follow/get_follow_targets', data);
    } catch (e) {
        console.error(e);
    }
}

// like ----------------------------------------------------------------------------------------------------------------

async function addLikeTarget(instaAccId, instaUsername) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId,
            username: instaUsername
        };
        return await axios.post('http://localhost:3000/api/like/add_like_target', data);
    } catch (e) {
        console.error(e);
    }
}

async function removeLikeTarget(instaAccId, likeId) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId,
            likeId: likeId
        };
        return await axios.post('http://localhost:3000/api/like/remove_like_target', data);
    } catch (e) {
        console.error(e);
    }
}

async function getLikeTargets(instaAccId) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId
        };
        return await axios.post('http://localhost:3000/api/like/get_like_targets', data);
    } catch (e) {
        console.error(e);
    }
}

// comment ---------------------------------------------------------------------------------------------------------------

async function addCommentTarget(instaAccId, instaUsername) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId,
            username: instaUsername
        };
        return await axios.post('http://localhost:3000/api/comment/add_comment_target', data);
    } catch (e) {
        console.error(e);
    }
}

async function removeCommentTarget(instaAccId, commentId) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId,
            commentId: commentId
        };
        return await axios.post('http://localhost:3000/api/comment/remove_comment_target', data);
    } catch (e) {
        console.error(e);
    }
}

async function getCommentTargets(instaAccId) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId
        };
        return await axios.post('http://localhost:3000/api/comment/get_comment_targets', data);
    } catch (e) {
        console.error(e);
    }
}

// test driver ---------------------------------------------------------------------------------------------------------

async function test() {

    // auth
    let registerRes = await register('mohammadi_keyhan', '123', 'keyhan', 'mohammadi', 'theprogrammermachine@gmail.com');
    console.log('result of register :\n', registerRes.data);
    console.log('input the verification code :');
    let vCode = '';
    while (vCode.length === 0) {
        vCode = await io.read();
        if (vCode.length === 0) {
            console.log('verification code can not be empty.');
        }
    }
    let verifyRes = await verify('theprogrammermachine@gmail.com', vCode);
    console.log('result of verify :\n', verifyRes.data);
    let forgotPassRes = await forgotPassword('theprogrammermachine@gmail.com');
    console.log('result of forgot_password :\n', forgotPassRes.data);
    console.log('input the forgot password verification code :');
    vCode = '';
    while (vCode.length === 0) {
        vCode = await io.read();
        if (vCode.length === 0) {
            console.log('verification code can not be empty.');
        }
    }
    let resetPassRes = await resetPassword('theprogrammermachine@gmail.com', vCode, '456');
    console.log('result of reset_password :\n', resetPassRes.data);

    // instaacc
    let addAccRes = await addInstaAccount('username', 'password', 'acc1');
    console.log('result of add_account :\n', addAccRes.data);
    let removeAccRes = await removeInstaAccount('username');
    console.log('result of remove_account :\n', removeAccRes.data);
    let addAccRes2 = await addInstaAccount('username', 'password', 'acc1');
    console.log('result of add_account ( second request ) :\n', addAccRes2.data);
    let instaAccId = addAccRes2.data.instaAccount.instaAccountId;
    let getAccsRes = await getInstaAccounts();
    console.log('result of get_account :\n', getAccsRes.data);

    // tag
    let addTagRes = await addTag(instaAccId, 'food');
    console.log('result of add_tag :\n', addTagRes.data);
    let removeTagRes = await removeTag(instaAccId, 1);
    console.log('result of remove_tag :\n', removeTagRes.data);
    let getTagsRes = await getTags(instaAccId);
    console.log('result of get_tags :\n', getTagsRes.data);
    let searchTagsRes = await searchTags(instaAccId, 'fo'); // for example 'fo' as a part of 'food' for query
    console.log('result of search_tags :\n', searchTagsRes.data);

    // block
    let addBlockRes = await addBlockTarget(instaAccId, 'bike', 1); // blockTargetType : 1 for tags. 2 for users
    console.log('result of add_block_target :\n', addBlockRes.data);
    let addBlockRes2 = await addBlockTarget(instaAccId, 'username', 2); // blockTargetType : 1 for tags. 2 for users
    console.log('result of add_block_target ( second request ) :\n', addBlockRes2.data);
    let removeBlockRes = await removeBlockTarget(instaAccId, addBlockRes.data.blockTarget.blockId);
    console.log('result of remove_block_target :\n', removeBlockRes.data);
    let getBlocksRes = await getBlockTargets(instaAccId);
    console.log('result of get_block_targets :\n', getBlocksRes.data);

    // follow
    let addFollowRes = await addFollowTarget(instaAccId, 'username');
    console.log('result of add_follow_target :\n', addFollowRes.data);
    let removeFollowRes = await removeFollowTarget(instaAccId, addFollowRes.data.followTarget.followId);
    console.log('result of remove_follow_target :\n', removeFollowRes.data);
    let getFollowRes = await getFollowTargets(instaAccId);
    console.log('result of get_follow_targets :\n', getFollowRes.data);

    // like
    let addLikeRes = await addLikeTarget(instaAccId, 'username');
    console.log('result of add_like_target :\n', addLikeRes.data);
    let removeLikeRes = await removeLikeTarget(instaAccId, addLikeRes.data.likeTarget.likeId);
    console.log('result of remove_like_target :\n', removeLikeRes.data);
    let getLikeRes = await getLikeTargets(instaAccId);
    console.log('result of get_like_targets :\n', getLikeRes.data);

    // comment
    let addCommentRes = await addCommentTarget(instaAccId, 'username');
    console.log('result of add_follow_target :\n', addCommentRes.data);
    let removeCommentRes = await removeCommentTarget(instaAccId, addCommentRes.data.commentTarget.commentId);
    console.log('result of remove_follow_target :\n', removeCommentRes.data);
    let getCommentRes = await getCommentTargets(instaAccId);
    console.log('result of get_follow_targets :\n', getCommentRes.data);
}

test().then(function () {
    console.log('finished.');
});
