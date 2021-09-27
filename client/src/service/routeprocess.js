import React, { Component } from "react";
import AppointmentForm from '../components/AppointmentForm';
import PrivateRoute from "./private";
import Login from "../user-login/Login";
import signUp from "../user-login/SignUp";
import BookingTable from "../components/BookingTable";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";


class RouteTable extends Component {

  render(){
    return (
        <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login"></Redirect>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route exact path="/register" component={signUp} />
            <PrivateRoute path="/menu" component={AppointmentForm} />
            <PrivateRoute path="/table" component={BookingTable}/>
          </Switch>
        </BrowserRouter>
        </div>
        
   
    );
  }
}

export default RouteTable;
