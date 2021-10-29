import React from "react";
import "./LogReg.css";
import { Redirect, withRouter } from "react-router-dom";
import Header from "../common/Header";
import "../common/Header.css";
import baseURL from "../service/api";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Container,
} from "semantic-ui-react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      password: "",
      boolean: false,
      search: false,
      register: false,
      mobileErr: "",
      passErr: "",
      userName: "",
      userEmail: "",
      gotoRegister: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  handleSignup(e) {
    e.preventDefault();
    this.setState({
      register: true,
    });
  }
  handleChange(event) {
    event.preventDefault();
    const mobile = event.target.name;
    const password = event.target.password;
    this.setState({
      [mobile]: event.target.value,
      [password]: event.target.value,
    });
  }

  submit(e) {
    e.preventDefault();
    let mobileResult, passwordResult;
    let mobileRegex = /^[6-9]\d{9}$/;
    let passRegex = /^[A-Za-z0-9@\s]{3,15}$/;

    if (passRegex.test(this.state.password)) {
      this.setState({
        passErr: "",
        gotoRegister: "",
      });
      passwordResult = false;
    } else {
      passwordResult = true;
      this.setState({
        passErr: "Please Enter a valid password",
        gotoRegister: "",
      });
    }
    if (mobileRegex.test(this.state.mobile)) {
      mobileResult = false;
      this.setState({
        mobileErr: "",
        gotoRegister: "",
      });
    } else {
      mobileResult = true;
      this.setState({
        mobileErr: "Please Enter a valid mobile number",
        gotoRegister: "",
      });
    }
    let newUserDetails = {
      mobile: parseInt(this.state.mobile),
      password: this.state.password,
    };
    let data;
    if (mobileResult === false && passwordResult === false) {
      this.loginUser(newUserDetails)
        .then((response) => (data = response.data))
        .then((data) => {
          let token = data.token;
          let user = data.user;
          let mobile = data.mobile;
          if (
            data !== "error" &&
            data !== "Not found" &&
            data !== "password invalid"
          ) {
            sessionStorage.setItem("authToken", token);
            sessionStorage.setItem("user", user);
            sessionStorage.setItem("mobile", mobile);
            this.setState({
              search: true,
              mobileErr: "",
              passErr: "",
            });
            this.props.history.push("/menu");
          } else if (data === "Not found") {
            this.setState({
              gotoRegister:
                "You don't have an account please register and then login",
              search: false,
            });
          } else if (data === "password invalid") {
            this.setState({
              mobileErr: "",
              passErr: "Please enter a valid password",
              gotoRegister: "",
              search: false,
            });
          }
        });
    }
  }
  loginUser(newUserDetails) {
    let apiUrl = "/users/login";

    return baseURL.post(apiUrl, newUserDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  render() {
    return (
    
      <div data-testid="test-login">
        <Header />
        {sessionStorage.getItem("authToken") ? (
          <Redirect to="/menu"></Redirect>
        ) : (
          <form
            onSubmit={(e) => {
              this.submit(e);
            }}
          >
            <div className="base-container">
        
              <div class="MainContainer center">
                <button class="button">Login</button>
                <button
                  onClick={(e) => {
                    this.handleSignup(e);
                  }}
                  class="button"
                >
                  Signup
                </button>
                <div className="formheader">Login</div>
                <p class="error">{this.state.gotoRegister}</p>
                <Container>
                  <Form>
                <Form.Group widths="equal">
                <div className="form">
                
                  <div>
                   
                 <Form.Field
                      id="form-input-control-first-name"
                      control={Input}
                      label="MobileNo"
                      type="text"
                      name="mobile"
                      placeholder="MobileNo"
                      value={this.state.mobile}
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                    <div class="error">{this.state.mobileErr}</div>
                  </div>
                  <div>
                   

                  
                    <Form.Field
                      id="form-input-control-first-name"
                      control={Input}
                      label="Password"
                      name="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                   
                    <div class="error">{this.state.passErr}</div>
                  </div>
                </div>
                </Form.Group>
                </Form>
             </Container>
                <div>
                  <input
                    type="submit"
                    data-testid="test-submit"
                    class="submitbtn"
                  ></input>
                </div>
                <br />
                Don't have an account?{" "}
                <a class="register" href="/register">
                  Register here
                </a>
              </div>
            </div>
          </form>
        )}

        {this.state.register && <Redirect to="/register"></Redirect>}
      </div>
     
    );
  }
}

export default withRouter(Login);
