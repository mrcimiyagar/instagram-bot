
import sys
from setproctitle import setproctitle, getproctitle
from instapyagent import InstaPyAgent

if __name__ == '__main__':

    setproctitle('insta-ai-bot-' + sys.argv[1])

    bot = InstaPyAgent(instaAccId=sys.argv[1], username=sys.argv[2], password=sys.argv[3])
