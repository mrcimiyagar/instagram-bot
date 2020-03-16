import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { User } from "../auth/user.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  localUser: User;
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
    }
  }
}
