/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.jsx";
import RTLLayout from "layouts/RTL/RTL.jsx";

import "assets/app/scss/black-dashboard-react.scss";
import "assets/app/demo/demo.css";
import "assets/app/css/nucleo-icons.css";
import {func} from "prop-types";
import axios from 'axios';
import {fetchMe, getMe} from "./routes";
import AuthPage from "./layouts/AuthPage";

const hist = createBrowserHistory();

fetchMe().then(() => {
    console.log('fetched user');
});

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/app/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/app/rtl" render={props => <RTLLayout {...props} />} />
      <Route path="/app/signin" render={props => <AuthPage {...props} />} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
