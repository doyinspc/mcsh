import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutEmployee } from '../../actions/employee'
import { logoutClient } from '../../actions/client'

// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
import employee from "../../reducers/employee";

export class SubSideNav extends Component {
  static propTypes ={
    employeeAuth: PropTypes.object.isRequired,
    logoutEmployee: PropTypes.func.isRequired
  }

 

  onClick = e => {
    e.preventDefault();
    this.props.logoutClient();
    this.props.logoutEmployee();
  }

  render(){
      let isStaff = false;
      let fz = {}
      if(this.props.employee.isAuthenticated){
        isStaff = true;
      }
     
     
      const { isAuthenticated, user, isAdmin } = this.props.employee.isAuthenticated ? this.props.employee: this.props.client;
      
      const nameLinks = (<NavItem><NavLink to="/main" tag={Link}>{ user ? `Welcome ${user.fullname}` : '' }</NavLink></NavItem>);
      const employeeLinks = (<NavItem><NavLink to="/employee-data" tag={Link}> Employee </NavLink></NavItem>);
      const bookingLinks = (<NavItem><NavLink to="/booking-data" tag={Link}> Booking </NavLink></NavItem>);
      const clientLinks = (<NavItem><NavLink to="/client-data" tag={Link}> Client </NavLink></NavItem>);
      const categoryLinks = (<NavItem><NavLink to="/category-data" tag={Link}> Category </NavLink></NavItem>);

      const logoutLinks = (
        <NavItem>
            <button onClick={this.onClick} className="nav-link btn btn-danger btn-xm text-light">
            Logout
            </button>
        </NavItem>
        );

    return (
            <Nav navbar>
                { (this.props.employee.user || this.props.client.user) && (this.props.employee.isAuthenticated || this.props.client.isAuthenticated)  ? nameLinks : "" }
                { user && isAuthenticated  && isStaff && isAdmin ? employeeLinks : "" }
                { user && isAuthenticated  && isStaff && isAdmin ? clientLinks : "" }
                { user && isAuthenticated  && isStaff && isAdmin ? categoryLinks : "" }
                { user && isAuthenticated  && isStaff ? bookingLinks : "" }
                { this.props.employee.isAuthenticated || this.props.client.isAuthenticated  ?  logoutLinks : '' }
            </Nav>
    );
}
}
const mapStateToProps = state =>({
    employee: state.employeeReducer,
    client: state.clientReducer
});
export default connect(mapStateToProps, { logoutEmployee, logoutClient })(SubSideNav);
