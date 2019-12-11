
const mongoose = require('mongoose');

mongoose.connect('mongodb://aseman:3x2fG1b65sg4hN68sr4yj8j6k5Bstul4yi56l453tsK5346u5s4R648j@localhost:27017', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('.......................................................................................................');
    console.log('mongodb database opened successfully.');
    console.log('.......................................................................................................');
    let configSchema = new mongoose.Schema({
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
    });
    let Config = mongoose.model('Config', configSchema);

    module.exports = {
        'Config': Config,
        'configSchema': configSchema
    };

    console.log('.......................................................................................................');
    console.log('config schema generated successfully.');
    console.log('.......................................................................................................');
});