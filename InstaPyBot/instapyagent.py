from random import randint

import schedule as schedule
from instapy import InstaPy
from instapy import smart_run
from instapy import set_workspace
import time
import sys
from setproctitle import setproctitle, getproctitle


class InstaPyAgent:
    delay = 600
    session = {}

    def __init__(self, instaAccId, username, password):
        set_workspace(path=None)
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

        self.session = InstaPy(username=self.auth.username, password=self.auth.password, headless_browser=True)
        self.session.end()

        def job():
            if self.session is not None:
                self.session.end()
            self.session = InstaPy(username=self.auth.username,
                                   password=self.auth.password,
                                   headless_browser=True)
            for _ in range(0, 10):
                delay = randint(128, 518)
                with smart_run(self.session):
                    if hasattr(self, 'block'):
                        self.handle_block()
                    if hasattr(self, 'follow'):
                        self.handle_follow()
                    if hasattr(self, 'tag'):
                        self.handle_tag()
                    if hasattr(self, 'like'):
                        self.handle_like()
                    if hasattr(self, 'comment'):
                        self.handle_comment()
                time.sleep(delay)

        import datetime
        now = datetime.datetime.now()

        schedule.every().day.at((str(now.hour)
                                if now.hour >= 10 else ("0" + str(now.hour))) +
                                ":" +
                                (str(((now.minute + 1) % 60))
                                 if ((now.minute + 1) % 60) >= 10 else "0" + str(((now.minute + 1) % 60)))).do(job)
        schedule.every().day.at((str((now.hour + 10) % 24)
                                if ((now.hour + 10) % 24) >= 10 else ("0" + str((now.hour + 10) % 24))) +
                                ":" +
                                (str(((now.minute + 1) % 60))
                                 if ((now.minute + 1) % 60) >= 10 else "0" + str((now.minute + 1) % 60))).do(job)

        while True:
            schedule.run_pending()
            time.sleep(10)

    def handle_interaction(self):
        if 'enable_relationships_bounds'in self.like and self.interaction['enable_relationships_bounds']:
            potency_ratio = 0
            if 'interact_with_low_followers'in self.like and self.interaction['interact_with_low_followers']:
                potency_ratio = -1.34
            else:
                potency_ratio = 1.34
            self.session.set_relationship_bounds(enabled=True,
                                                 potency_ratio=potency_ratio,
                                                 delimit_by_numbers=True,
                                                 max_followers=self.interaction['relationships_bounds_max_follower']
                                                 if 'relationships_bounds_max_follower'in self.like
                                                 else 0,
                                                 max_following=self.interaction['relationships_bounds_max_following']
                                                 if 'relationships_bounds_max_following'in self.like
                                                 else 0,
                                                 min_followers=self.interaction['relationships_bounds_min_follower']
                                                 if 'relationships_bounds_min_follower'in self.like
                                                 else 0,
                                                 min_following=self.interaction['relationships_bounds_min_following']
                                                 if 'relationships_bounds_min_following'in self.like
                                                 else 0)
        # make all interactions conditional and limited to
        # specified bounds [ pass negative number to potency ratio to interact with low follower
        # users and pass positive potency ratio to interact with high follower users
        if 'enable_like_interaction_bounds' in self.interaction\
                and self.interaction['enable_like_interaction_bounds']:
            self.session.set_delimit_liking(enabled=True,
                                            max_likes=self.interaction['like_interaction_bound_max']
                                            if 'like_interaction_bound_max'in self.like
                                            else 0,
                                            min_likes=self.interaction.like_interaction_bound_min
                                            if 'like_interaction_bound_min'in self.like
                                            else 0)
            # like posts having like-count between specified max and min
        if 'enable_like_interaction_bounds' in self.interaction\
                and self.interaction['enable_like_interaction_bounds']:
            self.session.set_delimit_commenting(enabled=True,
                                                max_comments=self.interaction['like_interaction_bound_max']
                                                if 'like_interaction_bound_max'in self.like
                                                else 0,
                                                min_comments=self.interaction['like_interaction_bound_max']
                                                if 'like_interaction_bound_max'in self.like
                                                else 0)
            # comment on posts having comment-count between specified max and min
        if 'good_friends_list_for_not_interacting' in self.interaction \
                and len(self.interaction['good_friends_list_for_not_interacting']) > 0:
            self.session.set_dont_include(self.interaction['good_friends_list_for_not_interacting'])
        if 'ignore_if_contains_words'in self.like \
                and len(self.interaction['ignore_if_contains_words']) > 0:
            self.session.set_ignore_if_contains(self.interaction.ignore_if_contains_words)
        if 'blacklist' in self.interaction and self.interaction['blacklist'] != "":
            self.session.set_blacklist(True, self.interaction['blacklist'])
        if 'watch_stories_by_tags' in self.interaction and len(self.interaction['watch_stories_by_tags']) > 0:
            self.session.set_do_story(enabled=True)
            self.session.story_by_tags(self.interaction['watch_stories_by_tags'])
        if 'watch_stories_by_users' in self.interaction and len(self.interaction['watch_stories_by_users']) > 0:
            self.session.set_do_story(enabled=True)
            self.session.story_by_users(self.interaction['watch_stories_by_users'])
        if 'interact_user_followers' in self.interaction and len(self.interaction['interact_user_followers']):
            self.session.interact_user_followers(self.interaction['interact_user_followers'])
        if 'interact_user_followings' in self.interaction and len(self.interaction['interact_user_followings']):
            self.session.interact_user_followers(self.interaction['interact_user_followings'])

    def handle_comment(self):
        if 'enable_comment'in self.like and self.comment['enable_comment']:
            if 'normal_comment_contents' in self.comment and len(self.comment['normal_comment_contents']) > 0:
                self.session.set_comments(self.comment['normal_comment_contents'])  # setup comments
            if 'photo_comment_contents' in self.comment and len(self.comment['photo_comment_contents']) > 0:
                self.session.set_comments(self.comment['photo_comment_contents'], media='Photo')  # comments for photos
            if 'video_comment_contents' in self.comment and len(self.comment['video_comment_contents']) > 0:
                self.session.set_comments(self.comment['video_comment_contents'], media='Video')  # comments for videos
            self.session.set_do_comment(enabled=True, percentage=25)  # enable commenting
            self.session.set_do_reply_to_comments(True, percentage=50)

    def handle_like(self):
        if 'like_targets' in self.like and len(self.like['like_targets']) > 0:
            self.session.like_by_users(self.like['like_targets'], randomize=True)
            self.session.set_do_like(True)
        if 'enable_like_by_tags' in self.like and self.like['enable_like_by_tags']:
            self.session.like_by_tags(skip_top_posts=False,
                                      use_smart_hashtags=self.like['like_by_tags_use_smart_hashtags']
                                      if 'like_by_tags_use_smart_hashtags' in self.like else [],
                                      interact=True, randomize=True, amount=self.like['like_by_tags_count']
                                      if 'like_by_tags_count' in self.like else 0,
                                      tags=self.like['like_by_tags_list'] if 'like_by_tags_list' in self.like else [])
        if 'like_posts_containing_words' in self.like and len(self.like['like_posts_containing_words']) > 0:
            self.session.set_mandatory_words(self.like['like_posts_containing_words'])
        if 'dont_like_tags_and_words' in self.like and len(self.like['dont_like_tags_and_words']) > 0:
            self.session.set_dont_like(self.like['dont_like_tags_and_words'])
        if 'ignored_users_list_for_like' in self.like and len(self.like['ignored_users_list_for_like']) > 0:
            self.session.set_ignore_users(self.like['ignored_users_list_for_like'])

    def handle_follow(self):
        if 'dont_unfollow_active_users' in self.follow and self.follow['dont_unfollow_active_users']:
            self.session.set_dont_unfollow_active_users(enabled=self.follow['dont_unfollow_active_users'], posts=5)
            # Prevents unFollow followers who have liked one of your latest 5 posts
        if 'follow_targets' in self.follow and len(self.follow['follow_targets']) > 0:
            self.session.follow_by_list(self.follow['follow_targets'], times=1, sleep_delay=self.delay, interact=True)
            # follows a list of users
        if 'follow_followers_target' in self.follow and len(self.follow['follow_followers_target']) > 0:
            self.session.follow_user_followers(self.follow['follow_followers_target'], amount=10, randomize=True,
                                               sleep_delay=self.delay,
                                               interact=True)  # follow followers of target users
        if 'follow_followings_target' in self.follow and len(self.follow['follow_followings_target']) > 0:
            self.session.follow_user_following(self.follow['follow_followings_target'], amount=10, randomize=True,
                                               sleep_delay=self.delay,
                                               interact=False)  # follow followings of target users
        if 'follow_users_by_tags' in self.follow and len(self.follow['follow_users_by_tags']) > 0:
            self.session.follow_by_tags(self.follow['follow_users_by_tags'], amount=10)  # follow users based on tags
        if 'follow_likers' in self.like and len(self.follow['follow_likers']) > 0:
            self.session.follow_likers(self.follow['follow_likers'], photos_grab_amount=2, follow_likers_per_photo=3,
                                       randomize=True,
                                       sleep_delay=self.delay, interact=True)  # follow users who like posts of target users
        if 'follow_users_posts_commenters' in self.follow and len(self.follow['follow_users_posts_commenters']) > 0:
            self.session.follow_commenters(self.follow['follow_users_posts_commenters'], amount=10, daysold=365,
                                           max_pic=100, sleep_delay=self.delay,
                                           interact=True)  # follow people who comment on posts of target users
        # to follow this person for more than 2 times
        if 'unfollow_users' in self.follow and len(self.follow['unfollow_users']) > 0:
            self.session.unfollow_users(amount=20, custom_list=self.follow['unfollow_users'],
                                        custom_list_param=self.follow['unfollow_strategy'], style="RANDOM",
                                        unfollow_after=55 * 60 * 60, sleep_delay=self.delay)  # unFollow people in the list
        self.session.set_do_follow(enabled=True, percentage=100, times=5)
        # follows ~ 10% of the users and remembers not

    def handle_tag(self):
        if 'smart_hashtags' in self.tag and len(self.tag['smart_hashtags']) > 0:
            self.session.set_smart_hashtags(self.tag['smart_hashtags'], limit=self.tag['smart_hashtags_limit'])

    def handle_block(self):
        pass


if __name__ == '__main__':
    setproctitle('insta-ai-bot-' + sys.argv[1])
    bot = InstaPyAgent(sys.argv[1], sys.argv[2], sys.argv[3])
