import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { Router } from "@angular/router";

interface target {
  Id: number;
  username: string;
}
interface targetArray {
  status: string;
  followTargets: target[];
  message: string;
}
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
@Component({
  selector: "app-content1",
  templateUrl: "./content1.component.html",
  styleUrls: ["./content1.component.css"]
})
export class Content1Component implements OnInit {
  localUser: User;
  targetsCount: number;
  targets: target[];
  loading = false;
  localAccount: account;
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
        console.log("getaccDone : " + this.localAccount.instaAccountId);
        this.getTargets();
      });
  }
  addTarget(inputText: string) {
    // Send Http request
    const data = {
      token: this.localUser.token,
      instaAccountId: this.localAccount.instaAccountId,
      username: inputText
    };
    console.log(data);
    this.http
      .post("http://45.156.184.182:3100/api/follow/add_follow_target", data)
      .subscribe(responseData => {
        console.log(responseData);
        this.getTargets();
      });
  }
  getTargets() {
    this.loading = true;
    const data = {
      token: this.localUser.token,
      instaAccountId: this.localAccount.instaAccountId
    };
    console.log(data);
    this.http
      .post<targetArray>(
        "http://45.156.184.182:3100/api/follow/get_follow_targets",
        data
      )
      .subscribe(responseData => {
        // console.log(" length: " + responseData.target.length);
        console.log(" target: " + responseData);
        // this.targetsCount = responseData.target.length;
        this.targets = responseData.followTargets;
        this.loading = false;
      });
  }
  removeTarget(followId: number) {
    const data = {
      token: this.localUser.token,
      instaAccountId: this.localAccount.instaAccountId,
      followId
    };
    console.log(data);
    this.http
      .post("http://45.156.184.182:3100/api/follow/remove_follow_target", data)
      .subscribe(responseData => {
        console.log(responseData);
        this.getTargets();
      });
  }
}
