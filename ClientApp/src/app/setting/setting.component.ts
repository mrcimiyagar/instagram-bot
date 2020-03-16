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
  instaAccId: number;
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
  saveConfig() {
    this.myConfig = this.getConfig();
    const data = {
      token: this.localUser.token,
      instaAccountId: this.localUser.instaAccountId,
      config: this.myConfig
    };
    console.log(data);
    this.http
      .post("http://45.156.184.182:3100/api/config/edit_config", data)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
  getConfig() {
    let myConfig: Config;
    myConfig = {
      instaAccId: this.localUser.instaAccountId,
      comment: {
        enable_comment: !!this.form.value.EnableComment,
        normal_comment_contents: this.form.value.NormalComment,
        photo_comment_contents: this.form.value.PhotoComment,
        video_comment_contents: this.form.value.VideoComment
      },
      follow: {
        follow_followers_target: this.form.value.FollowerTarget,
        follow_followings_target: this.form.value.FollowingTarget,
        follow_users_by_tags: this.form.value.FollowUsersByTags,
        follow_likers: this.form.value.FollowLikers,
        follow_users_posts_commenters: this.form.value.FollowUsersCommenters,
        unfollow_users: this.form.value.UnfallowUsers,
        unfollow_strategy: this.form.value.UnfallowStrategy,
        dont_unfollow_active_users: !!this.form.value.DontUnfallowActiveUser
      },
      interaction: {
        enable_relationships_bounds: !!this.form.value
          .EnableRelationshipsBounds,
        relationships_bounds_min_follower: this.form.value.MinFollower,
        relationships_bounds_min_following: this.form.value.MinFollowing,
        relationships_bounds_max_follower: this.form.value.MaxFollower,
        relationships_bounds_max_following: this.form.value.MaxFollowing,
        interact_with_low_followers: !!this.form.value.InteractWithLowFollowers,
        enable_like_interaction_bound: !!this.form.value
          .EnableLikeInteractionBounds,
        like_interaction_bound_min: this.form.value.MinLike,
        like_interaction_bound_max: this.form.value.MaxLike,
        enable_comment_interaction_bound: !!this.form.value
          .EnableCommentInteractionBounds,
        comment_interaction_bound_min: this.form.value.MinComment,
        comment_interaction_bound_max: this.form.value.MaxComment,
        blacklist: this.form.value.Blacklist,
        watch_stories_by_tags: this.form.value.StoryToWatchTtags,
        watch_stories_by_users: this.form.value.StoryToWatchUsers,
        good_friends_list_for_not_interacting: this.form.value
          .GoodFriendsForNotIntracting,
        ignored_users_list_for_like: this.form.value.IgnoreUsersForLikes
      },
      tag: {
        smart_hashtags: this.form.value.SmartHashtag,
        smart_hashtags_limit: this.form.value.SmartHashtagLimit
      },
      like: {
        enable_like_by_tags: !!this.form.value.EnableLikeByTag,
        like_by_tags_count: this.form.value.LikeByTagsCount,
        like_by_tags_use_smart_hashtags: !!this.form.value.UseSmartHashtag,
        like_by_tags_list: this.form.value.LikeByTag,
        like_posts_containing_words: this.form.value.LikePostsWithWords,
        dont_like_tags_and_words: this.form.value.DontLikeTagsWords,
        ignore_if_contains_words: this.form.value.IgnoreWords
      }
    };
    return myConfig;
  }
}
