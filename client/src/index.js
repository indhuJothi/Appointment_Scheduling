import React from "react";
import ReactDOM from "react-dom";
import RouteTable from "./service/routeprocess";
import "./index.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import 'semantic-ui-css/semantic.min.css'


ReactDOM.render(
  <React.StrictMode>
    
    <RouteTable/>
  </React.StrictMode>,
  document.getElementById("root")
);
