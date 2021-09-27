import axios from "axios";
import React from "react";
import { Container, Item, Tab, Table } from "semantic-ui-react";

let Values = [JSON.parse(sessionStorage.getItem("doctorDetails"))];
class BookingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableValues: [],
    };
  }
  componentDidMount() {
    let mobile = { mobile: sessionStorage.getItem("mobile") };
    axios
      .post("http://localhost:5000/users/getdetails", mobile, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            tableValues: response.data,
          });
        }
      });
  }
  render() {
    return (
      <>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Patient Name</Table.HeaderCell>
              <Table.HeaderCell>Doctor Name</Table.HeaderCell>
              <Table.HeaderCell>Mobile No</Table.HeaderCell>
              <Table.HeaderCell>email</Table.HeaderCell>
              <Table.HeaderCell>Scheduled Time</Table.HeaderCell>
              <Table.HeaderCell>Scheduled Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.tableValues.map((item, index) => (
              <Table.Row>
                <>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.doctor}</Table.Cell>
                  <Table.Cell>{item.mobile}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.time}</Table.Cell>
                  <Table.Cell>{item.date}</Table.Cell>
                </>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Container>
          <button
            style={{ textAlign: "center", marginLeft: 300 }}
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            BACK
          </button>
          <button
            style={{ textAlign: "center", marginLeft: 300 }}
            onClick={() => {
              return (
                sessionStorage.removeItem("authToken"),
                sessionStorage.clear(),
                this.props.history.push("/login")
              );
            }}
          >
            Logout
          </button>
        </Container>
      </>
    );
  }
}

export default BookingTable;
