from instapy import InstaPy
from instapy import smart_run
from instapy import set_workspace
import time
import sys
from setproctitle import setproctitle, getproctitle


class InstaPyAgent:
    session = {}

    def __init__(self, username, password, follow_targets, tag_targets, block_targets, like_targets, enable_comment,
                 normal_comment_contents, photo_comment_contents, video_comment_contents, follow_followers_target,
                 follow_followings_target, follow_users_by_tags, follow_likers, follow_users_posts_commenters,
                 unfollow_users, unfollow_strategy, dont_unfollow_active_users, enable_relationships_bounds,
                 relationships_bounds_min_follower, relationships_bounds_min_following,
                 relationships_bounds_max_follower, relationships_bounds_max_following, interact_with_low_followers,
                 enable_like_interaction_bound, like_interaction_bound_min , like_interaction_bound_max,
                 enable_comment_interaction_bound, comment_interaction_bound_min, comment_interaction_bound_max):
        set_workspace(path=None)
        self.auth = type('', (object,),
                         {
                             'username': username,
                             'password': password
                         })()
        self.follow = type('', (object,),
                           {
                               'follow_targets': follow_targets,
                               'follow_followers_target': follow_followers_target,
                               'follow_followings_target': follow_followings_target,
                               'follow_users_by_tags': follow_users_by_tags,
                               'follow_likers': follow_likers,
                               'follow_users_posts_commenters': follow_users_posts_commenters,
                               'unfollow_users': unfollow_users,
                               'unfollow_strategy': unfollow_strategy,
                               'dont_unfollow_active_users': dont_unfollow_active_users
                           })()
        self.comment = type('', (object,),
                            {
                                'enable_comment': enable_comment,
                                'normal_comment_contents': normal_comment_contents,
                                'photo_comment_contents': photo_comment_contents,
                                'video_comment_contents': video_comment_contents
                            })()
        self.tag = type('', (object,),
                        {
                            'tag_targets': tag_targets
                        })()
        self.block = type('', (object,),
                          {
                              'block_targets': block_targets
                          })()
        self.like = type('', (object,),
                         {
                             'like_targets': like_targets
                         })()
        self.interaction = type('', (object,),
                                {
                                    'enable_relationships_bounds': enable_relationships_bounds,
                                    'relationships_bounds_min_following': relationships_bounds_min_following,
                                    'relationships_bounds_max_follower': relationships_bounds_max_follower,
                                    'relationships_bounds_max_following': relationships_bounds_max_following,
                                    'relationships_bounds_min_follower': relationships_bounds_min_follower,
                                    'interact_with_low_followers': interact_with_low_followers,
                                    'enable_like_interaction_bound': enable_like_interaction_bound,
                                    'like_interaction_bound_min': like_interaction_bound_min,
                                    'like_interaction_bound_max': like_interaction_bound_max,
                                    'enable_comment_interaction_bound': enable_comment_interaction_bound,
                                    'comment_interaction_bound_min': comment_interaction_bound_min,
                                    'comment_interaction_bound_max': comment_interaction_bound_max
                                })()
        self.session = InstaPy(username=self.auth.username, password=self.auth.password, headless_browser=True)
        self.run()

    def run(self):
        with smart_run(self.session):
            self.handle_comment()
            self.handle_like()
            self.handle_follow()
            self.handle_tag()
            self.handle_block()

    def handle_interaction(self):
        if self.interaction.enable_relationships_bounds:
            potency_ratio = 0
            if self.interaction.interact_with_low_followers:
                potency_ratio = -1.34
            else:
                potency_ratio = 1.34
            self.session.set_relationship_bounds(enabled=True,
                                                 potency_ratio=potency_ratio,
                                                 delimit_by_numbers=True,
                                                 max_followers=self.interaction.relationships_bounds_max_follower,
                                                 max_following=self.interaction.relationships_bounds_max_following,
                                                 min_followers=self.interaction.relationships_bounds_min_follower,
                                                 min_following=self.interaction.relationships_bounds_min_following)
        # make all interactions conditional and limited to
        # specified bounds [ pass negative number to potency ratio to interact with low follower
        # users and pass positive potency ratio to interact with high follower users
        if self.interaction.enable_like_interaction_bounds:
            self.session.set_delimit_liking(enabled=True,
                                            max_likes=self.interaction.like_interaction_bound_max,
                                            min_likes=self.interaction.like_interaction_bound_min)
            # like posts having like-count between specified max and min
        if self.interaction.enable_like_interaction_bounds:
            self.session.set_delimit_commenting(enabled=True,
                                                max_comments=self.interaction.like_interaction_bound_max,
                                                min_comments=self.interaction.like_interaction_bound_max)
            # comment on posts having comment-count between specified max and min

    def handle_comment(self):
        if self.comment.enable_comment:
            self.session.set_do_comment(enabled=True, percentage=25)  # enable commenting
            if len(self.comment.normal_comment_contents) > 0:
                self.session.set_comments(['Awesome', 'Really Cool', 'I like your stuff'])  # setup comments
            if len(self.comment.photo_comment_contents) > 0:
                self.session.set_comments(['Nice shot!'], media='Photo')  # comments for photos
            if len(self.comment.video_comment_contents) > 0:
                self.session.set_comments(['Great Video!'], media='Video')  # comments for videos

    def handle_like(self):
        pass

    def handle_follow(self):
        self.session.set_do_follow(enabled=True, percentage=10, times=2)  # follows ~ 10% of the users and remembers not
        self.session.set_dont_unfollow_active_users(enabled=True, posts=5)  # Prevents unFollow followers who have liked
        # one of your latest 5 posts
        if len(self.follow.follow_targets) > 0:
            self.session.follow_by_list(['user1', 'user2'], times=1, sleep_delay=300, interact=True)
            # follows a list of users
        if len(self.follow.follow_followers_target) > 0:
            self.session.follow_user_followers(['user1', 'user2'], amount=10, randomize=True, sleep_delay=300,
                                               interact=True)  # follow followers of target users
        if len(self.follow.follow_followings_target) > 0:
            self.session.follow_user_following(['user1', 'user2'], amount=10, randomize=True, sleep_delay=300,
                                               interact=False)  # follow followings of target users
        if len(self.follow.follow_users_by_tags) > 0:
            self.session.follow_by_tags(self.follow.follow_users_by_tags, amount=10)  # follow users based on tags
        if len(self.follow.follow_likers) > 0:
            self.session.follow_likers(self.follow.follow_likers, photos_grab_amount=2, follow_likers_per_photo=3,
                                       randomize=True,
                                       sleep_delay=300, interact=True)  # follow users who like posts of target users
        if len(self.follow.follow_users_posts_commenters) > 0:
            self.session.follow_commenters(['user1', 'user2'], amount=10, daysold=365, max_pic=100, sleep_delay=300,
                                           interact=True)  # follow people who comment on posts of target users
        # to follow this person for more than 2 times
        if len(self.follow.unfollow_users) > 0:
            self.session.unfollow_users(amount=20, custom_list=self.follow.unfollow_users,
                                        custom_list_param=self.follow.unfollow_strategy, style="RANDOM",
                                        unfollow_after=55 * 60 * 60, sleep_delay=300)  # unFollow people in the list

    def handle_tag(self):
        pass

    def handle_block(self):
        pass


if __name__ == '__main__':
    setproctitle('insta-ai-bot-' + sys.argv[1])
    bot = InstaPyAgent(sys.argv[2], sys.argv[3])
