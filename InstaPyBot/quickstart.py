""" Quickstart script for InstaPy usage """

# imports
from instapy import InstaPy
from instapy import smart_run
from instapy import set_workspace
import time

# set workspace folder at desired location (default is at your home folder)
set_workspace(path=None)

# get an InstaPy session!
session = InstaPy(username="miryamcreed",
                  password="65@m84;l#41lde48$5k3561r5^1&mje8ja6464%58544ja",
                  headless_browser=False)

with smart_run(session):
    session.set_user_interact(amount=3, randomize=True, percentage=100, media='Photo')
    session.like_by_tags(['natgeo', 'world'], amount=10, interact=True)

