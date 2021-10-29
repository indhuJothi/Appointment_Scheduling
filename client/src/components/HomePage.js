import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse,
} from "mdb-react-ui-kit";

export default function Menu() {
  const [showBasic, setShowBasic] = useState(false);
  const history = useHistory();

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#" style={{ color: "blue" }}>
          AigilxHealth
        </MDBNavbarBrand>
        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link">
                  Dropdown
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="/table">
                      Scheduled Appointment
                    </MDBDropdownLink>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <button style={{marginRight:30}} onClick={(e)=>{return (sessionStorage.clear(),history.push('/login'))}}>LogOut</button>
          <form className="d-flex input-group w-auto">
            <p style={{ marginRight: 30, fontWeight: "bold" }}>
              {sessionStorage.getItem("user")}
            </p>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
