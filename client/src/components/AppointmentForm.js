import React from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Container,
} from "semantic-ui-react";
import axios from "axios";
import Menu from "./HomePage";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      reason: "",
      option: "",
      dateVal: "",
      nameErr: "",
      email: "",
      lastnameErr: "",
      dateErr: "",
      emailErr: "",
      reasonErr: "",
      optionErr: "",
      chooseAnotherDate: "",
      showDoctors: false,
      doctorsName: [],
      bookedDoctor: "",
      time: "",
    };
  }

  handlChange(event) {
    event.preventDefault();

    const name = event.target.name;
    const lastname = event.target.lastname;
    const email = event.target.email;
    const reason = event.target.reason;
    const option = event.target.option;
    const dateVal = event.target.dateVal;
    this.setState({
      [name]: event.target.value,
      [lastname]: event.target.value,
      [email]: event.target.value,
      [reason]: event.target.value,
      [option]: event.target.value,
      [dateVal]: event.target.value,
    });
  }

  handlSubmit(event) {
    event.preventDefault();
    const emailRegex = /^[a-zA-Z0-9+_.-]+@([a-zA-Z.]+\.)+[\w]{2,3}$/;
    let confirmValue = true;
    if (this.state.name === "") {
      this.setState({
        nameErr: "Please Enter Your Name",
      });
      confirmValue = false;
    } else {
      this.setState({
        nameErr: "",
      });
      confirmValue = true;
    }

    if (this.state.option === "") {
      this.setState({
        optionErr: "Please Select One Category",
      });
      confirmValue = false;
    } else {
      this.setState({
        optionErr: "",
      });
      confirmValue = true;
    }
    if (this.state.dateVal === "") {
      this.setState({
        dateErr: "Please Choose Any Date",
      });
      confirmValue = false;
    } else {
      this.setState({
        dateErr: "",
      });
      confirmValue = true;
    }
    if (this.state.reason === "") {
      this.setState({
        reasonErr: "Please Enter Your Reason For The Consultation",
      });
      confirmValue = false;
    } else {
      this.setState({
        reasonErr: "",
      });
      confirmValue = true;
    }

    if (this.state.email === "") {
      confirmValue = false;
      this.setState({
        emailErr: "Please Enter Your Email",
      });
    } else {
      if (emailRegex.test(this.state.email)) {
        confirmValue = true;
        this.setState({
          emailErr: " ",
        });
      } else {
        confirmValue = false;
        this.setState({
          emailErr: "Please Enter a valid email",
        });
      }
    }

    if (
      (this.state.name &&
        this.state.email &&
        this.state.reason &&
        this.state.option &&
        this.state.dateVal) !== ""
    )
      if (confirmValue === true) {
        let data = {
          category: this.state.option,
          date: this.state.dateVal,
        };

        axios.post("http://localhost:5000/users/getdoctordetails", data, {
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
            let data = response.data;
            if (data !== "Not available") {
            
              let doctorNames = [];
              data.map((item) => {
                if (item.doctor_name) {
                  
                  doctorNames.push(item.doctor_name);
                }
              });
              this.setState({
                showDoctors: true,
                doctorsName: doctorNames
              
              });
            
            } 
            else {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "No Doctors Available On the Choosen Date Please choose another date",
              });
              this.setState({
                showDoctors: false,
              });
            }
          
          });
      }
  }

  doctorChange(e) {
    e.preventDefault();

    this.setState({
      bookedDoctor: e.target.value,
    });
  }

  fixdate(e) {
    e.preventDefault();
    this.setState({
      time: e.target.value,
    });
  }

  bookAppointment(event) {
    event.preventDefault();
    let details = {
      email: this.state.email,
      doctor: this.state.bookedDoctor,
      date: this.state.dateVal,
      time: this.state.time,
      name: this.state.name,
      mobile: sessionStorage.getItem("mobile"),
    };

    axios
      .post("http://localhost:5000/users/savedetails", details, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data === "Success") {
          this.props.history.push("/table");
        }
      });
  }

  render() {
    return (
      <>
        <Menu />
        <div>
          <div>
            <p
              style={{
                color: "black",
                fontWeight: "bolder",
                textAlign: "center",
                fontSize: 50,
                marginBottom: 20,
              }}
            >
              Appointment Form
            </p>
            <p
              style={{
                color: "Red",
                fontWeight: "bolder",
                textAlign: "center",
                fontSize: 50,
                marginBottom: 20,
              }}
            >
              {this.state.chooseAnotherDate}
            </p>
          </div>
          <Container textAlign="center" style={{ width: 1000, top: 300 }}>
            <Form
             
            >
              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-first-name"
                  control={Input}
                  label="First name"
                  placeholder="First name"
                  value={this.state.name}
                  name="name"
                  onChange={(event) => {
                    this.handlChange(event);
                  }}
                />

                <Form.Field
                  id="form-input-control-last-name"
                  control={Input}
                  label="Last name"
                  placeholder="Last name"
                  name="lastname"
                  value={this.state.lastName}
                  onChange={(event) => {
                    this.handlChange(event);
                  }}
                />
              </Form.Group>
              <span className="error">{this.state.nameErr}</span>
              <Form.Group>
                <label style={{ fontSize: "16px" }}>
                  Specialist:
                  <select
                    name="option"
                    onChange={(event) => {
                      this.handlChange(event);
                    }}
                    style={{
                      width: "130px",
                      top: "5px",
                      marginBottom: "15px",
                      textAlign: "center",
                    }}
                    value={this.state.option}
                  >
                    <option value=""></option>
                    <option value="General">General</option>
                    <option value="Ortho">Ortho</option>
                    <option value="Dental">Dental</option>
                  </select>
                  <span className="error">{this.state.optionErr}</span>
                </label>
                <label>
                  Date
                  <input
                    type="date"
                    style={{
                      fontSize: "10px",
                      top: "0px",
                      marginLeft: "7px",
                      marginBottom: "10px",
                    }}
                    placeholder="Date"
                    value={this.state.dateVal}
                    onChange={(event) => this.handlChange(event)}
                    name="dateVal"
                  ></input>
                  <span style={{ fontSize: 15 }} className="error">
                    {this.state.dateErr}
                  </span>
                </label>{" "}
              </Form.Group>

              <Form.Field
                id="form-textarea-control-opinion"
                control={Input}
                label="Reason"
                placeholder="Reason"
                value={this.state.reason}
                name="reason"
                onChange={(event) => {
                  this.handlChange(event);
                }}
              />
              <span className="error">{this.state.reasonErr}</span>

              <Form.Field
                id="form-input-control-error-email"
                control={Input}
                label="Email"
                placeholder="joe@schmoe.com"
                value={this.state.email}
                name="email"
                onChange={(event) => {
                  this.handlChange(event);
                }}
              />
              <div className="error">{this.state.emailErr}</div>
              {this.state.showDoctors &&
              
              <Form.Group>
                <select
                  name="bookedDoctor"
                  onChange={(event) => {
                    this.doctorChange(event);
                  }}
                  value={this.state.bookedDoctor}
                >
                  <option value="">SelectDoctors</option>
                  {this.state.doctorsName.map((item, index) => (
                    <option value={item.value}>{item}</option>
                  ))}
                </select>
                <select
                  value={this.state.time}
                  onChange={(e) => {
                    this.fixdate(e);
                  }}
                >
                  <option value="10 A.M - 12 P.M">10 A.M - 12 P.M</option>
                  <option value="1 P.M - 2 P.M">1 .PM - 2 P.M</option>
                  <option value="5 P.M - 7 P.M"> 5 P.M - 7 P.M</option>
                </select>
                <button
                  onClick={(e) => {
                    this.bookAppointment(e);
                  }}
                >
                  Book Appointment
                </button>
              </Form.Group>
              
            
           }

              <Form.Field
                id="form-button-control-public"
                style={{ width: 90 }}
                control={Button}
                content="Search Doctors"
                onClick={(event) => {
                  this.handlSubmit(event);
                }}
              />

             
            </Form>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(AppointmentForm);
