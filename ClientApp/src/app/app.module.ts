import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { FollowsComponent } from "./follows/follows.component";
import { TagsComponent } from "./tags/tags.component";
import { CommentsComponent } from "./comments/comments.component";
import { LikesComponent } from "./likes/likes.component";
import { ContentComponent } from "./content/content.component";
import { Content2Component } from "./content2/content2.component";
import { Content3Component } from "./content3/content3.component";
import { Content4Component } from "./content4/content4.component";
import { Content1Component } from "./content1/content1.component";
import { SettingComponent } from './setting/setting.component';

const appRouts: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "follows", component: FollowsComponent },
  { path: "tags", component: TagsComponent },
  { path: "comments", component: CommentsComponent },
  { path: "likes", component: LikesComponent },
  { path: "setting", component: SettingComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    HomeComponent,
    FollowsComponent,
    TagsComponent,
    CommentsComponent,
    LikesComponent,
    ContentComponent,
    Content2Component,
    Content3Component,
    Content4Component,
    Content1Component,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRouts),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
