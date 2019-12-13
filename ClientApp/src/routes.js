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
import Dashboard from "views/Dashboard.jsx";
import Icons from "views/Icons.jsx";
import Map from "views/Map.jsx";
import Notifications from "views/Notifications.jsx";
import Rtl from "views/Rtl.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import UserProfile from "views/UserProfile.jsx";
import axios from "axios";

let mode = "/rtl";
export function getMode() {
  return mode;
}
export function changeMode(m) {
  mode = m;
}

let me = {
  firstName: '',
  lastName: '',
  email: '',
};

export function getMe() {
  return me;
}

export async function fetchMe() {
  me = (await axios.post('/auth/get_me')).data.user;
}

export function getRoutes() {
  return [
    {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "داشبورد",
      icon: "tim-icons icon-chart-pie-36",
      component: Dashboard,
      layout: mode
    },
    {
      path: "/icons",
      name: "Archive",
      rtlName: "آرشیو",
      icon: "tim-icons icon-paper",
      component: Icons,
      layout: mode
    },
    {
      path: "/map",
      name: "Manual Forecast",
      rtlName: "پیشبینی دستی",
      icon: "tim-icons icon-sound-wave",
      component: UserProfile,
      layout: mode
    },
    {
      path: "/notifications",
      name: "Settings",
      rtlName: "تنظیمات",
      icon: "tim-icons icon-settings",
      component: Notifications,
      layout: mode
    },
    {
      path: "/user-profile",
      name: "Weather",
      rtlName: "آب و هوا",
      icon: "tim-icons icon-weather",
      component: Map,
      layout: mode
    },
    {
      path: "/rtl-support",
      name: "Persian",
      rtlName: "انگلیسی",
      icon: "tim-icons icon-world",
      component: Rtl,
      layout: mode
    }
  ];
}

