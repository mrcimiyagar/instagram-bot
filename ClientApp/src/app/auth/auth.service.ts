import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";

import { User } from "./user.model";

interface session {
  sessionId: number;
  userId: number;
  token: string;
}
export interface res {
  status: string;
  session?: session;
  message: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  // private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  // signup(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDb0xTaRAoxyCgvaDF3kk5VYOsTwB_3o7Y',
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap(resData => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    };
    return this.http
      .post<res>("http://95.216.62.129:3100/api/auth/login", data)
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleLogin(
            resData.session.userId,
            1,
            resData.session.token,
            6000
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      userId: number;
      instaAccountId: number;
      _token: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.userId,
      userData.instaAccountId,
      userData._token
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(6000000);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/login"]);
    localStorage.removeItem("userData");
  }

  autoLogout(expirationDuration: number) {
    setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleLogin(
    userId: number,
    instaAccountId: number,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(userId, instaAccountId, token);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exist.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct.";
        break;
    }
    return throwError(errorMessage);
  }
}
