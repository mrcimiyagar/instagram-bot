from instapy import InstaPy
from instapy import smart_run
from instapy import set_workspace
import time
import sys
from setproctitle import setproctitle, getproctitle


class InstaPyAgent:
    session = {}

    def __init__(self, instaAccId, username, password):
        set_workspace(path='/tmp/' + username)
        self.auth = type('', (object,),
                         {
                             'username': username,
                             'password': password
                         })()

        import json

        with open(str(instaAccId) + '.json') as json_file:
            data = json.load(json_file)
            print(data)
            self.like = data["like"]
            self.comment = data["comment"]
            self.follow = data["follow"]
            self.tag = data["tag"]
            self.block = data["block"]
            self.interaction = data["interaction"] if hasattr(data, 'interaction') else {}

        self.session = InstaPy(username=self.auth.username,
                               password=self.auth.password,
                               headless_browser=True)
        self.run()

    def run(self):
        with smart_run(self.session):
            self.handle_comment()
            self.handle_like()
            self.handle_follow()
            self.handle_tag()
            self.handle_block()

    def handle_interaction(self):
        if hasattr(self.interaction, 'enable_relationships_bounds') and self.interaction.enable_relationships_bounds:
            potency_ratio = 0
            if hasattr(self.interaction, 'interact_with_low_followers') and self.interaction.interact_with_low_followers:
                potency_ratio = -1.34
            else:
                potency_ratio = 1.34
            self.session.set_relationship_bounds(enabled=True,
                                                 potency_ratio=potency_ratio,
                                                 delimit_by_numbers=True,
                                                 max_followers=self.interaction.relationships_bounds_max_follower
                                                 if hasattr(self.interaction, 'relationships_bounds_max_follower')
                                                 else 0,
                                                 max_following=self.interaction.relationships_bounds_max_following
                                                 if hasattr(self.interaction, 'relationships_bounds_max_following')
                                                 else 0,
                                                 min_followers=self.interaction.relationships_bounds_min_follower
                                                 if hasattr(self.interaction, 'relationships_bounds_min_follower')
                                                 else 0,
                                                 min_following=self.interaction.relationships_bounds_min_following
                                                 if hasattr(self.interaction, 'relationships_bounds_min_following')
                                                 else 0)
        # make all interactions conditional and limited to
        # specified bounds [ pass negative number to potency ratio to interact with low follower
        # users and pass positive potency ratio to interact with high follower users
        if hasattr(self.interaction, 'enable_like_interaction_bounds')\
                and self.interaction.enable_like_interaction_bounds:
            self.session.set_delimit_liking(enabled=True,
                                            max_likes=self.interaction.like_interaction_bound_max
                                            if hasattr(self.interaction, 'like_interaction_bound_max')
                                            else 0,
                                            min_likes=self.interaction.like_interaction_bound_min
                                            if hasattr(self.interaction, 'like_interaction_bound_min')
                                            else 0)
            # like posts having like-count between specified max and min
        if hasattr(self.interaction, 'enable_like_interaction_bounds') \
                and self.interaction.enable_like_interaction_bounds:
            self.session.set_delimit_commenting(enabled=True,
                                                max_comments=self.interaction.like_interaction_bound_max
                                                if hasattr(self.interaction, 'like_interaction_bound_max')
                                                else 0,
                                                min_comments=self.interaction.like_interaction_bound_max
                                                if hasattr(self.interaction, 'like_interaction_bound_max')
                                                else 0)
            # comment on posts having comment-count between specified max and min
        if hasattr(self.interaction, 'good_friends_list_for_not_interacting') \
                and len(self.interaction.good_friends_list_for_not_interacting) > 0:
            self.session.set_dont_include(self.interaction.good_friends_list_for_not_interacting)
        if hasattr(self.interaction, 'ignore_if_contains_words') \
                and len(self.interaction.ignore_if_contains_words) > 0:
            self.session.set_ignore_if_contains(self.interaction.ignore_if_contains_words)
        if hasattr(self.interaction, 'blacklist') and self.interaction.blacklist != ""\
                and self.interaction.blacklist is not None:
            self.session.set_blacklist(True, self.interaction.blacklist)
        if hasattr(self.interaction, 'watch_stories_by_tags') and len(self.interaction.watch_stories_by_tags) > 0:
            self.session.set_do_story(enabled=True)
            self.session.story_by_tags(self.interaction.watch_stories_by_tags)
        if hasattr(self.interaction, 'watch_stories_by_users') and len(self.interaction.watch_stories_by_users) > 0:
            self.session.set_do_story(enabled=True)
            self.session.story_by_users(self.interaction.watch_stories_by_users)

    def handle_comment(self):
        if hasattr(self.comment, 'enable_comment') and self.comment.enable_comment:
            self.session.set_do_comment(enabled=True, percentage=25)  # enable commenting
            if hasattr(self.comment, 'normal_comment_contents') and len(self.comment.normal_comment_contents) > 0:
                self.session.set_comments(self.comment.normal_comment_contents)  # setup comments
            if hasattr(self.comment, 'photo_comment_contents') and len(self.comment.photo_comment_contents) > 0:
                self.session.set_comments(self.comment.photo_comment_contents, media='Photo')  # comments for photos
            if hasattr(self.comment, 'video_comment_contents') and len(self.comment.video_comment_contents) > 0:
                self.session.set_comments(self.comment.video_comment_contents, media='Video')  # comments for videos

    def handle_like(self):
        if hasattr(self.like, 'like_targets') and len(self.like.like_targets) > 0:
            self.session.like_by_users(self.like.like_targets, randomize=True)
        if hasattr(self.like, 'enable_like_by_tags') and self.like.enable_like_by_tags:
            self.session.like_by_tags(skip_top_posts=False, use_smart_hashtags=self.tag.like_by_tags_use_smart_hashtags,
                                      interact=True, randomize=True, amount=self.like.like_by_tags_count,
                                      tags=self.like.like_by_tags_list)
        if hasattr(self.like, 'like_posts_containing_words') and len(self.like.like_posts_containing_words) > 0:
            self.session.set_mandatory_words(self.like.like_posts_containing_words)
        if hasattr(self.like, 'dont_like_tags_and_words') and len(self.like.dont_like_tags_and_words) > 0:
            self.session.set_dont_like(self.like.dont_like_tags_and_words)
        if hasattr(self.like, 'ignored_users_list_for_like') and len(self.like.ignored_users_list_for_like) > 0:
            self.session.set_ignore_users(self.like.ignored_users_list_for_like)

    def handle_follow(self):
        self.session.set_do_follow(enabled=True, percentage=10, times=2)  # follows ~ 10% of the users and remembers not
        if hasattr(self.follow, 'dont_unfollow_active_users'):
            self.session.set_dont_unfollow_active_users(enabled=self.follow.dont_unfollow_active_users, posts=5)
            # Prevents unFollow followers who have liked one of your latest 5 posts
        if hasattr(self.follow, 'follow_targets') and len(self.follow.follow_targets) > 0:
            self.session.follow_by_list(self.follow.follow_targets, times=1, sleep_delay=300, interact=True)
            # follows a list of users
        if hasattr(self.follow, 'follow_followers_target') and len(self.follow.follow_followers_target) > 0:
            self.session.follow_user_followers(self.follow.follow_followers_target, amount=10, randomize=True,
                                               sleep_delay=300,
                                               interact=True)  # follow followers of target users
        if hasattr(self.follow, 'follow_followings_target') and len(self.follow.follow_followings_target) > 0:
            self.session.follow_user_following(self.follow.follow_followings_target, amount=10, randomize=True,
                                               sleep_delay=300,
                                               interact=False)  # follow followings of target users
        if hasattr(self.follow, 'follow_users_by_tags') and len(self.follow.follow_users_by_tags) > 0:
            self.session.follow_by_tags(self.follow.follow_users_by_tags, amount=10)  # follow users based on tags
        if hasattr(self.follow, 'follow_likers') and len(self.follow.follow_likers) > 0:
            self.session.follow_likers(self.follow.follow_likers, photos_grab_amount=2, follow_likers_per_photo=3,
                                       randomize=True,
                                       sleep_delay=300, interact=True)  # follow users who like posts of target users
        if hasattr(self.follow, 'follow_users_posts_commenters') and len(self.follow.follow_users_posts_commenters) > 0:
            self.session.follow_commenters(self.follow.follow_users_posts_commenters, amount=10, daysold=365, max_pic=100, sleep_delay=300,
                                           interact=True)  # follow people who comment on posts of target users
        # to follow this person for more than 2 times
        if hasattr(self.follow, 'unfollow_users') and len(self.follow.unfollow_users) > 0:
            self.session.unfollow_users(amount=20, custom_list=self.follow.unfollow_users,
                                        custom_list_param=self.follow.unfollow_strategy, style="RANDOM",
                                        unfollow_after=55 * 60 * 60, sleep_delay=300)  # unFollow people in the list

    def handle_tag(self):
        if hasattr(self.tag, 'smart_hashtags') and len(self.tag.smart_hashtags) > 0:
            self.session.set_smart_hashtags(self.tag.smart_hashtags, limit=self.tag.smart_hashtags_limit)

    def handle_block(self):
        pass


if __name__ == '__main__':
    setproctitle('insta-ai-bot-' + sys.argv[1])
    bot = InstaPyAgent(sys.argv[1], sys.argv[2], sys.argv[3])
