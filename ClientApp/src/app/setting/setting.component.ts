import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
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
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.css"]
})
export class SettingComponent implements OnInit {
  localUser: User;
  targetsCount: number;
  loading = false;
  localAccount: account;
  disable: boolean;
  disable2 = true;
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
      username: username,
      password: password,
      title: title
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
}
