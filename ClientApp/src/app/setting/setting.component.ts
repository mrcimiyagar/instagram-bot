import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { NgForm } from "@angular/forms";
interface account {
  instaAccountId: number;
  username: string;
  password: string;
  title: string;
  userId: number;
}
interface accRes {
  status: string;
  instaAccounts: account[];
  message: string;
}
interface Config {
  comment: {
    enable_comment: boolean;
    normal_comment_contents: string[];
    photo_comment_contents: string[];
    video_comment_contents: string[];
  };
  follow: {
    follow_followers_target: string[];
    follow_followings_target: string[];
    follow_users_by_tags: string[];
    follow_likers: string[];
    follow_users_posts_commenters: string[];
    unfollow_users: string[];
    unfollow_strategy: string[];
    dont_unfollow_active_users: boolean;
  };
  interaction: {
    enable_relationships_bounds: boolean;
    relationships_bounds_min_follower: number;
    relationships_bounds_min_following: number;
    relationships_bounds_max_follower: number;
    relationships_bounds_max_following: number;
    interact_with_low_followers: boolean;
    enable_like_interaction_bound: boolean;
    like_interaction_bound_min: number;
    like_interaction_bound_max: number;
    enable_comment_interaction_bound: boolean;
    comment_interaction_bound_min: number;
    comment_interaction_bound_max: number;
    blacklist: string[];
    watch_stories_by_tags: string[];
    watch_stories_by_users: string[];
    good_friends_list_for_not_interacting: string[];
    ignored_users_list_for_like: string[];
  };
  tag: { smart_hashtags: string[]; smart_hashtags_limit: number };
  like: {
    enable_like_by_tags: boolean;
    like_by_tags_count: number;
    like_by_tags_use_smart_hashtags: boolean;
    like_by_tags_list: string[];
    like_posts_containing_words: string[];
    dont_like_tags_and_words: string[];
    ignore_if_contains_words: string[];
  };
}
interface ConfigRes {
  status: string;
  config: Config;
  message: string;
}
@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.css"]
})
export class SettingComponent implements OnInit {
  @ViewChild("f", { static: false }) form: NgForm;
  localUser: User;
  targetsCount: number;
  loading = false;
  localAccount: account;
  disable = false;
  disable2 = true;
  myConfig: Config;
  serverConfig: Config;

  constructor(
    private http: HttpClient,
    private user: AuthService,
    private router: Router
  ) {
    this.user.user.subscribe(user => {
      this.localUser = user;
    });
  }
  ngOnInit() {
    if (this.localUser === null) {
      this.router.navigate(["/login"]);
    } else {
      this.getAccout();
    }
  }
  getAccout() {
    const data = {
      token: this.localUser.token
    };
    this.http
      .post<accRes>(
        "http://45.156.184.182:3100/api/insta_acc/get_accounts",
        data
      )
      .subscribe(responseData => {
        this.localAccount = responseData.instaAccounts[0];
        console.log(this.localAccount);
        this.getConfig();
        if (!this.localAccount) {
          console.log("nulle");
          this.disable = false;
          this.disable2 = true;
        } else {
          console.log("null nist");
          this.disable = true;
          this.disable2 = false;
        }
      });
  }
  addInstaAccount(username: string, password: string, title: string) {
    const data = {
      token: this.localUser.token,
      username,
      password,
      title
    };
    console.log(data);
    this.http
      .post("http://45.156.184.182:3100/api/insta_acc/add_account", data)
      .subscribe(responseData => {
        console.log(responseData);
        this.getAccout();
      });
  }
  removeInstaAccount() {
    const data = {
      token: this.localUser.token,
      username: this.localAccount.username
    };
    console.log(data);
    this.http
      .post("http://45.156.184.182:3100/api/insta_acc/remove_account", data)
      .subscribe(responseData => {
        console.log(responseData);
        this.getAccout();
      });
  }
  stringToArray(myString: string): string[] {
    return myString.trim().split(",");
  }
  saveConfig() {
    this.myConfig = this.getFormValue();
    const splited = this.myConfig.comment.normal_comment_contents
      .toString()
      .split(",");
    console.log("split: " + splited);
    const data = {
      token: this.localUser.token,
      instaAccountId: this.localAccount.instaAccountId,
      config: this.myConfig
    };
    console.log(data);
    this.http
      .post("http://45.156.184.182:3100/api/config/edit_config", data)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
  getFormValue() {
    let myConfig: Config;
    myConfig = {
      comment: {
        enable_comment: !!this.form.value.EnableComment,
        normal_comment_contents: this.stringToArray(
          this.form.value.NormalComment
        ),
        photo_comment_contents: this.stringToArray(
          this.form.value.PhotoComment
        ),
        video_comment_contents: this.stringToArray(this.form.value.VideoComment)
      },
      follow: {
        follow_followers_target: this.stringToArray(
          this.form.value.FollowerTarget
        ),
        follow_followings_target: this.stringToArray(
          this.form.value.FollowingTarget
        ),
        follow_users_by_tags: this.stringToArray(
          this.form.value.FollowUsersByTags
        ),
        follow_likers: this.stringToArray(this.form.value.FollowLikers),
        follow_users_posts_commenters: this.stringToArray(
          this.form.value.FollowUsersCommenters
        ),
        unfollow_users: this.stringToArray(this.form.value.UnfallowUsers),
        unfollow_strategy: this.stringToArray(this.form.value.UnfallowStrategy),
        dont_unfollow_active_users: !!this.form.value.DontUnfallowActiveUser
      },
      interaction: {
        enable_relationships_bounds: !!this.form.value
          .EnableRelationshipsBounds,
        relationships_bounds_min_follower: Number(this.form.value.MinFollower),
        relationships_bounds_min_following: Number(
          this.form.value.MinFollowing
        ),
        relationships_bounds_max_follower: Number(this.form.value.MaxFollower),
        relationships_bounds_max_following: Number(
          this.form.value.MaxFollowing
        ),
        interact_with_low_followers: !!this.form.value.InteractWithLowFollowers,
        enable_like_interaction_bound: !!this.form.value
          .EnableLikeInteractionBounds,
        like_interaction_bound_min: Number(this.form.value.MinLike),
        like_interaction_bound_max: Number(this.form.value.MaxLike),
        enable_comment_interaction_bound: !!this.form.value
          .EnableCommentInteractionBounds,
        comment_interaction_bound_min: Number(this.form.value.MinComment),
        comment_interaction_bound_max: Number(this.form.value.MaxComment),
        blacklist: this.stringToArray(this.form.value.Blacklist),
        watch_stories_by_tags: this.stringToArray(
          this.form.value.StoryToWatchTtags
        ),
        watch_stories_by_users: this.stringToArray(
          this.form.value.StoryToWatchUsers
        ),
        good_friends_list_for_not_interacting: this.stringToArray(
          this.form.value.GoodFriendsForNotIntracting
        ),
        ignored_users_list_for_like: this.stringToArray(
          this.form.value.IgnoreUsersForLikes
        )
      },
      tag: {
        smart_hashtags: this.stringToArray(this.form.value.SmartHashtag),
        smart_hashtags_limit: Number(this.form.value.SmartHashtagLimit)
      },
      like: {
        enable_like_by_tags: !!this.form.value.EnableLikeByTag,
        like_by_tags_count: Number(this.form.value.LikeByTagsCount),
        like_by_tags_use_smart_hashtags: !!this.form.value.UseSmartHashtag,
        like_by_tags_list: this.stringToArray(this.form.value.LikeByTag),
        like_posts_containing_words: this.stringToArray(
          this.form.value.LikePostsWithWords
        ),
        dont_like_tags_and_words: this.stringToArray(
          this.form.value.DontLikeTagsWords
        ),
        ignore_if_contains_words: this.stringToArray(
          this.form.value.IgnoreWords
        )
      }
    };
    return myConfig;
  }
  getConfig() {
    const data = {
      token: this.localUser.token,
      instaAccountId: this.localAccount.instaAccountId
    };
    console.log(data);
    this.http
      .post<ConfigRes>("http://45.156.184.182:3100/api/config/get_config", data)
      .subscribe(responseData => {
        console.log(responseData);
        this.serverConfig = responseData.config;
        this.form.setValue(this.serverConfig);
      });
  }
}
