import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import withTracker from "./withTracker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.min.css";

import { privateRoutes, publicRoutes } from "./routes";

import { gapi} from 'gapi-script';
// let isLoggedIn = false;

const clientId = "632941047348-7mjkcjfq0124slatb1fdo3m6dgtfli38.apps.googleusercontent.com";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(!!(localStorage.getItem("token") && localStorage.getItem("username")));

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const App = () => {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:clientId,
        scope:""
      })
    };

    gapi.load('client:auth2', start);

  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!(localStorage.getItem("token") && localStorage.getItem("username")));

  return (
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <div>
        {privateRoutes.map((route, index) => (
          <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={withTracker(props => (
              <route.layout {...props}>
                <route.component {...props} />
              </route.layout>
            ))}
          />
        ))}
        {publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={props =>
              route.isPrivate && isLoggedIn ? (
                <Redirect to="/" />
              ) : (
                <route.component {...props} />
              )
            }
          />
        ))}
      </div>
    </Router>
  );
};

export default App;