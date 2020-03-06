import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
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
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  localUser: User;
  targetsCount: number;
  loading = false;
  localAccount: account;
  uname = "";

  constructor(
    private http: HttpClient,
    private user: AuthService,
    private router: Router
  ) {
    this.user.user.subscribe(user => {
      this.localUser = user;
      this.getAccout();
    });
  }
  signout() {
    this.user.logout();
  }
  ngOnInit() {}
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
        this.uname = this.localAccount.username;
      });
  }
}
