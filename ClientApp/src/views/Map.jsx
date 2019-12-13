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
import ReactDOM from 'react-dom';
import { GenericWeather } from 'react-weather';
import Weather from "../components/Weather";

class Map extends React.Component {
  render() {
    return (
      <>
        <div className="content">
            <Weather/>
        </div>
      </>
    );
  }
}

export default Map;
