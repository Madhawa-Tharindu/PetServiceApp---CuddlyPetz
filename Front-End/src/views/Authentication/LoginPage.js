import React, { useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  Button
} from "shards-react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from "axios";
// import { withRouter } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = "632941047348-7mjkcjfq0124slatb1fdo3m6dgtfli38.apps.googleusercontent.com";

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const centerStyles = {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  };

  // inside the component
  // const history = withRouter();

  const onFailure = (res) => {
    console.log("Login Failed! res: ", res);
  }

  const onSuccess = (res) => {
    
    console.log("Login Succesed! res: ", res);
    window.location.href = "/blog-posts";

  }
  
  const onLogoutSuccess = (res) => {
    
    console.log("Logout Successful");

  }
  const handleSubmit = event => {
    setIsLoading(true);
    //Prevent page reload
    event.preventDefault();

    var { uname, password } = document.forms[0];

    if (!uname.value || !password.value) {
      alert("Please fill all required fields...!");
      setIsLoading(false);
    } else {
      axios
        .post("http://localhost:4000/api/v1/login", {
          name: uname.value,
          password: password.value
        })
        .then(res => {
          setIsLoading(false);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.name);
          localStorage.setItem("UserType", res.data.UserType);
          localStorage.setItem("UserTypeID", res.data.UserTypeID);
          //console.log(res.data);
          //history.push("/blog-overview");
          
          (res.data.UserType == "Admin") ? window.location.href = "/blog-overview" : window.location.href = "/blog-posts";
          //this.props.history.push('/order-confirm');
        })
        .catch(err => {
          setIsLoading(false);
          setErrorMessages(err.response.data.error);
        });
    }
  };

  // JSX code for Login form
  const renderForm = (
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <h3 style={{ textAlign: "center" }}>Welcome to CuddlyPetz! </h3>
        <div className="form">
          <Form onSubmit={handleSubmit}>
            <div className="login-input-container">
              <FormGroup>
                <label htmlFor="username">Username</label>
                <FormInput type="text" name="uname" id="username" required />
                {/* {renderErrorMessage("uname")} */}
              </FormGroup>
              <FormGroup>
                <label htmlFor="password">Password</label>
                <FormInput type="password" name="pass" id="password" required />
                {/* {renderErrorMessage("pass")} */}
              </FormGroup>
            </div>
            {console.log(errorMessages)}
            {errorMessages && (
              <div style={{ color: "red" }}>{`${errorMessages}`}</div>
            )}
            <Button
              className="button-container"
              type="submit"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </Form>
          <div className="register-link">
            <p style={{marginLeft: '180px', marginTop:'-10px'}}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <p>
              Don't have an account?{" "}
              <Link to="/petowner-register">Register here</Link>
            </p>
          </div>
          <div>
            <Row>
              <Col style={centerStyles}>
                <GoogleLogin
                  clientId={clientId}
                  buttonText= "Continue With Google"
                  onSuccess={onSuccess}
                  onFaliure={onFailure}
                  cookiePolicy={'single_host_origin'}
                  issSignedIn={true}>
                </GoogleLogin>
              </Col>
              {/* <Col>
                <GoogleLogout
                  clientId={clientId}
                  buttonText= "Logout"
                  onSuccess={onLogoutSuccess}>
                </GoogleLogout>
              </Col> */}
            </Row>
          </div>
        </div>
      </ListGroupItem>
    </ListGroup>
  );
  // Redirect to home page after successful login
  if (isSubmitted) {
    return <Link to="/blog-overview" />;
  }

  return (
    <div className="app" style={{ marginTop: "80px" }}>
      <div className="container mt-5">
        <Container
          className="login-container"
          style={{ marginTop: "50px", maxWidth: "1100px" }}
        >
          <Row>
            <Col sm={{ size: 4, offset: 4 }}>
              <div className="Login-form">{renderForm}</div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;