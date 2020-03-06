import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { Router } from "@angular/router";
interface target {
  likeId: number;
  username: string;
}
interface targetArray {
  status: string;
  likeTargets: target[];
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
  selector: "app-content4",
  templateUrl: "./content4.component.html",
  styleUrls: ["./content4.component.css"]
})
export class Content4Component implements OnInit {
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
      .post("http://45.156.184.182:3100/api/like/add_like_target", data)
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
        "http://45.156.184.182:3100/api/like/get_like_targets",
        data
      )
      .subscribe(responseData => {
        this.targetsCount = responseData.likeTargets.length;
        this.targets = responseData.likeTargets;
        console.log(this.targets);
        this.loading = false;
      });
  }
  removeTarget(likeId: number) {
    const data = {
      token: this.localUser.token,
      instaAccountId: this.localAccount.instaAccountId,
      liked: likeId
    };
    console.log(data);
    this.http
      .post("http://45.156.184.182:3100/api/like/remove_like_target", data)
      .subscribe(responseData => {
        console.log(responseData);
        this.getTargets();
      });
  }
}
