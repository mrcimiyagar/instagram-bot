const axios = require('axios');
const io = require('console-read-write');

let token = 'empty'; // dont touch this.
let botAccUsername = 'dimpedia';
let botAccPassword = 'dimpedia';
let botAccFirstName = 'keyhan';
let botAccLastName = 'mohammadi';
let botAccEmail = 'theprogrammermachine@gmail.com';
let instaAccUsername = 'romina_kasperson';
let instaAccPassword = '3g2@z51h453k4#3a1k5&k4s53h3%5e1tgh5er1g5er';

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
        return await axios.post('http://188.40.173.232:3100/api/auth/register', data);
    } catch (e) {
        console.error(e);
    }
}

async function login(username, password) {
    try {
        const data = {
            username: username,
            password: password
        };
        let result = await axios.post('http://188.40.173.232:3100/api/auth/login', data);
        console.log(result.data);
        token = result.data.session.token;
        return result;
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
        let res = await axios.post('http://188.40.173.232:3100/api/auth/verify', data);
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
        return await axios.post('http://188.40.173.232:3100/api/auth/forgot_password', data);
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
        return await axios.post('http://188.40.173.232:3100/api/auth/reset_password', data);
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
        return await axios.post('http://188.40.173.232:3100/api/insta_acc/add_account', data);
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
        return await axios.post('http://188.40.173.232:3100/api/insta_acc/remove_account', data);
    } catch (e) {
        console.error(e);
    }
}

async function getInstaAccounts() {
    try {
        const data = {
            token: token
        };
        return await axios.post('http://188.40.173.232:3100/api/insta_acc/get_accounts', data);
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
        return await axios.post('http://188.40.173.232:3100/api/tag/add_tag', data);
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
        return await axios.post('http://188.40.173.232:3100/api/tag/remove_tag', data);
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
        return await axios.post('http://188.40.173.232:3100/api/tag/get_tags', data);
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
        return await axios.post('http://188.40.173.232:3100/api/tag/search_tags', data);
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
        return await axios.post('http://188.40.173.232:3100/api/block/add_block_target', data);
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
        return await axios.post('http://188.40.173.232:3100/api/block/remove_block_target', data);
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
        return await axios.post('http://188.40.173.232:3100/api/block/get_block_targets', data);
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
        return await axios.post('http://188.40.173.232:3100/api/follow/add_follow_target', data);
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
        return await axios.post('http://188.40.173.232:3100/api/follow/remove_follow_target', data);
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
        return await axios.post('http://188.40.173.232:3100/api/follow/get_follow_targets', data);
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
        return await axios.post('http://188.40.173.232:3100/api/like/add_like_target', data);
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
        return await axios.post('http://188.40.173.232:3100/api/like/remove_like_target', data);
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
        return await axios.post('http://188.40.173.232:3100/api/like/get_like_targets', data);
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
        return await axios.post('http://188.40.173.232:3100/api/comment/add_comment_target', data);
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
        return await axios.post('http://188.40.173.232:3100/api/comment/remove_comment_target', data);
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
        return await axios.post('http://188.40.173.232:3100/api/comment/get_comment_targets', data);
    } catch (e) {
        console.error(e);
    }
}

async function editConfig(instaAccId, config) {
    try {
        const data = {
            token: token,
            instaAccountId: instaAccId,
            config: config
        };
        return await axios.post('http://188.40.173.232:3100/api/config/edit_config', data);
    } catch (e) {
        console.error(e);
    }
}

// test driver ---------------------------------------------------------------------------------------------------------

async function test() {

    // auth
    // let registerRes = await register(`${botAccUsername}`, `${botAccPassword}`, `${botAccFirstName}`, `${botAccLastName}`, `${botAccEmail}`);
    // console.log('result of register :\n', registerRes.data);
    // console.log('input the verification code :');
    // let vCode = '';
    // while (vCode.length === 0) {
    //     vCode = await io.read();
    //     if (vCode.length === 0) {
    //         console.log('verification code can not be empty.');
    //     }
    // }
    // let verifyRes = await verify(`${botAccEmail}`, vCode);
    // console.log('result of verify :\n', verifyRes.data);
    // let forgotPassRes = await forgotPassword(`${botAccEmail}`);
    // console.log('result of forgot_password :\n', forgotPassRes.data);
    // console.log('input the forgot password verification code :');
    // vCode = '';
    // while (vCode.length === 0) {
    //     vCode = await io.read();
    //     if (vCode.length === 0) {
    //         console.log('verification code can not be empty.');
    //     }
    // }
    // let resetPassRes = await resetPassword(`${botAccEmail}`, vCode, `${botAccPassword}`);
    // console.log('result of reset_password :\n', resetPassRes.data);

    let loginRes = await login(`${botAccUsername}`, `${botAccPassword}`);
    console.log('result of login: \n', loginRes.data);

    // instaacc
    // let addAccRes = await addInstaAccount(`${instaAccUsername}`, `${instaAccPassword}`, 'PreDimpedia Test');
    // console.log('result of add_account :\n', addAccRes.data);
    let removeAccRes = await removeInstaAccount(`${instaAccUsername}`);
    console.log('result of remove_account :\n', removeAccRes.data);
    // let addAccRes2 = await addInstaAccount(`${instaAccUsername}`, `${instaAccPassword}`, 'PreDimpedia Test');
    // console.log('result of add_account ( second request ) :\n', addAccRes2.data);
    // let instaAccId = addAccRes2.data.instaAccount.instaAccountId;

    // // tag
    // let addTagRes = await addTag(instaAccId, 'زیبائی');
    // console.log('result of add_tag :\n', addTagRes.data);
    // let removeTagRes = await removeTag(instaAccId, addTagRes.data.tag.tagId);
    // console.log('result of remove_tag :\n', removeTagRes.data);
    // let getTagsRes = await getTags(instaAccId);
    // console.log('result of get_tags :\n', getTagsRes.data);
    // let searchTagsRes = await searchTags(instaAccId, 'beauty'); // for example 'fo' as a part of 'food' for query
    // console.log('result of search_tags :\n', searchTagsRes.data);
    // let addTagRes2 = await addTag(instaAccId, 'beauty');
    // console.log('result of add_tag :\n', addTagRes2.data);
    //
    // // block
    // let addBlockRes = await addBlockTarget(instaAccId, 'test', 1); // blockTargetType : 1 for tags. 2 for users
    // console.log('result of add_block_target :\n', addBlockRes.data);
    // let addBlockRes2 = await addBlockTarget(instaAccId, 'test', 2); // blockTargetType : 1 for tags. 2 for users
    // console.log('result of add_block_target ( second request ) :\n', addBlockRes2.data);
    // let removeBlockRes = await removeBlockTarget(instaAccId, addBlockRes.data.blockTarget.blockId);
    // console.log('result of remove_block_target :\n', removeBlockRes.data);
    // let getBlocksRes = await getBlockTargets(instaAccId);
    // console.log('result of get_block_targets :\n', getBlocksRes.data);
    //
    // // follow
    // let addFollowRes = await addFollowTarget(instaAccId, 'dimpedia');
    // console.log('result of add_follow_target :\n', addFollowRes.data);
    // let removeFollowRes = await removeFollowTarget(instaAccId, addFollowRes.data.followTarget.followId);
    // console.log('result of remove_follow_target :\n', removeFollowRes.data);
    // let getFollowRes = await getFollowTargets(instaAccId);
    // console.log('result of get_follow_targets :\n', getFollowRes.data);
    // let addFollowRes2 = await addFollowTarget(instaAccId, 'dimpedia');
    // console.log('result of add_follow_target :\n', addFollowRes2.data);
    //
    // // like
    // let addLikeRes = await addLikeTarget(instaAccId, 'dimpedia');
    // console.log('result of add_like_target :\n', addLikeRes.data);
    // let removeLikeRes = await removeLikeTarget(instaAccId, addLikeRes.data.likeTarget.likeId);
    // console.log('result of remove_like_target :\n', removeLikeRes.data);
    // let getLikeRes = await getLikeTargets(instaAccId);
    // console.log('result of get_like_targets :\n', getLikeRes.data);
    // let addLikeRes2 = await addLikeTarget(instaAccId, 'dimpedia');
    // console.log('result of add_like_target :\n', addLikeRes2.data);
    //
    // // comment
    // let addCommentRes = await addCommentTarget(instaAccId, 'dimpedia');
    // console.log('result of add_follow_target :\n', addCommentRes.data);
    // let removeCommentRes = await removeCommentTarget(instaAccId, addCommentRes.data.commentTarget.commentId);
    // console.log('result of remove_follow_target :\n', removeCommentRes.data);
    // let getCommentRes = await getCommentTargets(instaAccId);
    // console.log('result of get_follow_targets :\n', getCommentRes.data);
    // let addCommentRes2 = await addCommentTarget(instaAccId, 'dimpedia');
    // console.log('result of add_follow_target :\n', addCommentRes2.data);

    // let instaAccIdRes = (await getInstaAccounts()).data;
    // instaAccId = instaAccIdRes.instaAccounts[instaAccIdRes.instaAccounts.length - 1].instaAccountId;

    /*
    Schema({
        instaAccId: Number,
        comment: {
            enable_comment: Boolean,
            normal_comment_contents: Array,
            photo_comment_contents: Array,
            video_comment_contents: Array,
        },
        follow: {
            follow_followers_target: Array,
            follow_followings_target: Array,
            follow_users_by_tags: Array,
            follow_likers: Array,
            follow_users_posts_commenters: Array,
            unfollow_users: Array,
            unfollow_strategy: Array,
            dont_unfollow_active_users: Boolean
        },
        interaction: {
            enable_relationships_bounds: Boolean,
            relationships_bounds_min_follower: Number,
            relationships_bounds_min_following: Number,
            relationships_bounds_max_follower: Number,
            relationships_bounds_max_following: Number,
            interact_with_low_followers: Boolean,
            enable_like_interaction_bound: Boolean,
            like_interaction_bound_min: Number,
            like_interaction_bound_max: Number,
            enable_comment_interaction_bound: Boolean,
            comment_interaction_bound_min: Number,
            comment_interaction_bound_max: Number,
            blacklist: Array,
            watch_stories_by_tags: Array,
            watch_stories_by_users: Array,
            good_friends_list_for_not_interacting: Array,
            ignored_users_list_for_like: Array
        },
        tag: {
            smart_hashtags: Array,
            smart_hashtags_limit: Number,
        },
        like: {
            enable_like_by_tags: Boolean,
            like_by_tags_count: Number,
            like_by_tags_use_smart_hashtags: Boolean,
            like_by_tags_list: Array,
            like_posts_containing_words: Array,
            dont_like_tags_and_words: Array,
            ignore_if_contains_words: Array,
        }
    })
    */
    // config
    let editConfigRes = await editConfig(instaAccId, {
        instaAccId: instaAccId,
        comment: {
            enable_comment: true,
        },
        interaction: {
            interact_with_low_followers: true,
            interact_user_following: ["dimpedia"],
            interact_user_followers: ["dimpedia"]
        },
        follow: {
            follow_likers: ["dimpedia"],
            follow_users_posts_commenters: ["dimpedia"],
            follow_followers_target: ["dimpedia"],
            follow_followings_target: ["dimpedia"],
            follow_users_by_tags: ["beauty", "dimpedia"],
            dont_unfollow_active_users: true,
        },
        like: {
            enable_like_by_tags: true,
            like_by_tags_list: ['dimpedia'],
            like_by_tags_count: 5
        }
    });

    console.log('result of edit config: \n', editConfigRes);
}

test().then(function () {
    console.log('finished.');
});
