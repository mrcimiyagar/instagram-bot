import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { Router } from "@angular/router";

interface target {
  tagId: number;
  title: string;
}
interface targetArray {
  status: string;
  tags: target[];
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
  selector: "app-content2",
  templateUrl: "./content2.component.html",
  styleUrls: ["./content2.component.css"]
})
export class Content2Component implements OnInit {
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
        "http://95.216.62.129:3100/api/insta_acc/get_accounts",
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
      title: inputText
    };
    console.log(data);
    this.http
      .post("http://95.216.62.129:3100/api/tag/add_tag", data)
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
      .post<targetArray>("http://95.216.62.129:3100/api/tag/get_tags", data)
      .subscribe(responseData => {
        // this.targetsCount = responseData.tags.length;
        this.targets = responseData.tags;
        console.log(this.targets);
        this.loading = false;
      });
  }
  removeTarget(tagId: number) {
    const data = {
      token: this.localUser.token,
      instaAccountId: this.localAccount.instaAccountId,
      tagId: tagId
    };
    console.log(data);
    this.http
      .post("http://95.216.62.129:3100/api/tag/remove_tag", data)
      .subscribe(responseData => {
        console.log(responseData);
        this.getTargets();
      });
  }
}
