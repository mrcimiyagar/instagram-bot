""" Quickstart script for InstaPy usage """

# imports
from instapy import InstaPy
from instapy import smart_run
from instapy import set_workspace
import time

# set workspace folder at desired location (default is at your home folder)
set_workspace(path=None)

# get an InstaPy session!
session = InstaPy(username="test_robot123", password="x3.52r4k532Xtl1235.t1,k35t4i;.1l4K5yksarRt", headless_browser=True)
# session = InstaPy(username=insta_username, password=insta_password, headless_browser=True)
# session = InstaPy(username=insta_username, password=insta_password, proxy_address='8.8.8.8', proxy_port=8080)

with smart_run(session):

    # some methods : ---------------------------------------------------------------------------------------------------
    session.set_do_comment(enabled=False, percentage=25)  # enable commenting
    session.set_comments(['Awesome', 'Really Cool', 'I like your stuff'])  # setup comments
    session.set_comments(['Nice shot!'], media='Photo')  # comments for photos
    # -- session.set_comments(['Nice shot! @{}'], media='Photo')  # add the username of the poster to the comment
    session.set_comments(['Great Video!'], media='Video')  # comments for videos

    session.set_do_follow(enabled=True, percentage=10, times=2)  # follows ~ 10% of the users and remembers not
    # to follow this person for more than 2 times
    # -- session.set_user_interact(amount=4, percentage=50, randomize=True, media='Photo')
    # interact with users collected
    # by interact flag ( interaction : like, comment )
    session.follow_by_list(['user1', 'user2'], times=1, sleep_delay=300, interact=True)  # follows a list of users
    session.follow_user_followers(['user1', 'user2'], amount=10, randomize=True, sleep_delay=300, interact=True)  # follow followers
    # of target users
    session.follow_user_following(['user1', 'user2'], amount=10, randomize=True, sleep_delay=300, interact=False)  # follow followings
    # of target users
    session.follow_by_tags(['tag1', 'tag2'], amount=10) # follow users based on tags
    session.follow_likers(['user1', 'user2'], photos_grab_amount=2, follow_likers_per_photo=3, randomize=True,
                          sleep_delay=300, interact=True) # follow users who like posts of target users
    session.follow_commenters(['user1', 'user2'], amount=10, daysold=365, max_pic=100, sleep_delay=300,
                              interact=True)  # follow people who comment on posts of target users
    session.unfollow_users(amount=20, customList=(True, ["user_1", "user_2"], "all"), style="RANDOM",
                           unfollow_after=55 * 60 * 60, sleep_delay=300)  # unFollow people in the list
    session.unfollow_users(amount=84, customList=(True, ["user_1", "user_2"], "nonfollowers"), style="RANDOM",
                           unfollow_after=55 * 60 * 60, sleep_delay=300)  # unFollow people in the list who don't
    # follow you
    session.unfollow_users(amount=60, InstapyFollowed=(True, "all"), style="FIFO", unfollow_after=90 * 60 * 60,
                           sleep_delay=300)  # unFollow all your followings
    session.unfollow_users(amount=60, InstapyFollowed=(True, "nonfollowers"), style="FIFO", unfollow_after=90 * 60 * 60,
                           sleep_delay=300)
    session.unfollow_users(amount=126, nonFollowers=True, style="RANDOM", unfollow_after=42 * 60 * 60, sleep_delay=300)
    session.unfollow_users(amount=40, allFollowing=True, style="LIFO", unfollow_after=3 * 60 * 60, sleep_delay=300)
    session.unfollow_users(amount=200, customList=(True, ["user1", "user2"], "all"),
                           InstapyFollowed=(False, "all"), nonFollowers=False, allFollowing=False, style="FIFO",
                           unfollow_after=22 * 60 * 60, sleep_delay=300)  # complete form of unfollow_users method
    session.set_dont_unfollow_active_users(enabled=True, posts=5)  # Prevents unFollow followers who have liked one
    # of your latest 5 posts
    session.set_relationship_bounds(enabled=True, potency_ratio=1.34, delimit_by_numbers=True, max_followers=8500,
                                    max_following=4490, min_followers=100, min_following=56)  # make all interactions
    # conditional and limited to specified bounds [ pass negative number to potency ratio to interact with low follower
    # users and pass positive potency ratio to interact with high follower users

    session.set_delimit_liking(enabled=True, max=1005, min=20)  # like posts having like-count between
    # specified max and min
    session.set_delimit_commenting(enabled=True, max=32, min=0)  # comment on posts having comment-count between
    # specified max and min
    # -- session.comment_by_locations(['22442573'], amount=5, skip_top_posts=False)
    # comment on posts in specified location
    # -- session.like_by_locations(['22442573'], amount=5, skip_top_posts=False)  # like posts in specified location
    # -- session.like_by_feed(amount=100, randomize=True, unfollow=True, interact=True)  # like posts on feed and
    # then unFollow posters
    session.set_blacklist(enabled=True, campaign='soccer_campaign')
    session.set_smart_hashtags(['cycling', 'roadbike'], limit=3, sort='top', log_tags=True)  # setup smart tags
    session.like_by_tags(amount=10, use_smart_hashtags=True)  # like posts containing smart tags
    session.like_by_tags(['natgeo', 'world'], amount=10, interact=True)  # like posts containing specified tags
    session.set_mandatory_words(['#food', '#instafood'])  # like posts having decription or poster comment
    # containing specified words
    session.set_dont_like(['#exactmatch', '[startswith', ']endswith', 'broadmatch'])  # opposite side of above method
    session.set_ignore_if_contains(['glutenfree', 'french', 'tasty'])  # will ignore the don't like if the
    # description contains one of the given words
    session.set_dont_include(['friend1', 'friend2', 'friend3'])  # will prevent commenting on and unFollowing your
    # good friends (the images will still be liked)
    session.set_ignore_users(['random_user', 'another_username'])  # don't like posts of specified users

    popeye_followers = session.grab_followers(username="Popeye", amount="full", live_match=True,
                                              store_locally=True)  # fetch all followers of specified
    # user ( amount can be a number )

    lazySmurf_following = session.grab_following(username="lazy.smurf", amount="full", live_match=True,
                                                 store_locally=True)  # fetch all followings of specified
    # user ( amount can be a number )

    all_unFollowers, active_unFollowers = session.pick_unfollowers(username="Bernard_bear", compare_by="month",
                                                                   compare_track="first", live_match=True,
                                                                   store_locally=True, print_out=True)  # fetch people
    # list who unFollowed specified user based on previous data and cache . compare track [ first, median, last ],
    # compare point [ earliest, latest, day, month, year ]

    scoobyDoo_nonfollowers = session.pick_nonfollowers(username="ScoobyDoo",
                                                       live_match=True, store_locally=True)  # Compares the Followers
    # data against Following data of a user and returns the NonFollowers data

    smurfette_fans = session.pick_fans(username="Smurfette", live_match=True, store_locally=True)  # Returns Fans
    # data- all of the accounts who do follow the user WHOM user itself do not follow back

    Winnie_mutualFollowing = session.pick_mutual_following(username="WinnieThePooh", live_match=True,
                                                           store_locally=True)  # Returns Mutual Following data- all
    # of the accounts who do follow the user WHOM user itself also do follow back



    # ------------------------------------------------------------------------------------------------------------------

    # samples:

    # find people who unFollowed me and then unFollow them -------------------------------------------------------------
    all_unFollowers2, active_unFollowers2 = session.pick_unfollowers(username="Bernard_bear", compare_by="earliest",
                                                                     compare_track="first", live_match=True,
                                                                     store_locally=True, print_out=True)
    time.sleep(200)
    session.unfollow_users(amount=len(active_unFollowers2), customList=(True, active_unFollowers2, "all"),
                           style="RANDOM", unfollow_after=None, sleep_delay=600)
    # ------------------------------------------------------------------------------------------------------------------

    # Like posts based on hashtags and like 3 posts of its poster ------------------------------------------------------
    session.set_user_interact(amount=3, randomize=True, percentage=100, media='Photo')
    session.like_by_tags(['natgeo', 'world'], amount=10, interact=True)
    # ------------------------------------------------------------------------------------------------------------------

    # interact with users whom target user follows by actions like [like, comment, follow] -----------------------------
    session.set_user_interact(amount=5, randomize=True, percentage=50, media='Photo')
    session.set_do_follow(enabled=True, percentage=70)
    session.set_do_like(enabled=True, percentage=70)
    session.set_comments(["Cool", "Super!"])
    session.set_do_comment(enabled=True, percentage=80)
    # whom to target :
    session.interact_user_following(['user1', 'user2'], amount=10, randomize=True)  # followings of target users
    session.interact_user_followers(['user1', 'user2'], amount=10, randomize=True)  # followers of target users
    session.interact_by_users(['user1', 'user2'], amount=5, randomize=True, media='Photo')  # target users
    session.interact_by_users(['user1', 'user2'], amount=5, randomize=True, media='Video')  # target users
    session.interact_by_URL(urls=["some/URL/1", "some/URL/2"], randomize=True, interact=True)  # do interactions
    # directly on the posts provided in the given urls
    # ------------------------------------------------------------------------------------------------------------------

