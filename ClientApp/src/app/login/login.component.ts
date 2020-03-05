import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, res } from "../auth/auth.service";
// import all from "../../assets/js/ClientApp_src_client.js/index.js";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  logIn(uname, pword) {
    let authObs: Observable<res>;
    this.isLoading = true;

    authObs = this.authService.login(uname, pword);
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(["/home"]);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    // this.http
    //   .post<res>("http://95.216.62.129:3100/api/auth/login", data)
    //   .subscribe(responseData => {
    //     console.log(responseData);
    //     if (responseData.status === "success") {
    //       console.log("success");
    //       this.router.navigate(['/home']);
    //     } else {
    //       console.log("error");
    //     }
    //   });
  }
}
