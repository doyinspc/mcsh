/*

=========================================================
* Now UI Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider }from 'react-redux';
import store from "./store";
//import { loadAlumni } from "./actions/alumni";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";

// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/examples/LoginPage.js";
import MinimumPage from "views/pages/MinimumPage.js";

class App extends Component{
  render(){
    
    return(
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            <Switch>
              
 
              <Route path="/client-data" render={props => <MinimumPage {...props} />} />
              <Route path="/employee-data" render={props => <MinimumPage {...props} />} />
              <Route path="/category-data" render={props => <MinimumPage {...props} />} />

              <Route path="/client-data/:id" render={props => <MinimumPage {...props} />} />
              <Route path="/employee-data/:id" render={props => <MinimumPage {...props} />} />
              <Route path="/category-data/:id" render={props => <MinimumPage {...props} />} />
              
              

              <Route path="/login-page" render={props => <LoginPage {...props} />} />
              <Redirect to="/login-page" />
              <Redirect from="/" to="/login-page" />
            </Switch>
          </Switch>
        </BrowserRouter>
        </Provider>
    )
  }
}
ReactDOM.render(<App/>, document.getElementById("root"));
