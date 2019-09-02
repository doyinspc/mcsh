import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutEmployee } from '../../actions/employee'

// reactstrap components
import {
  NavItem,
  NavLink,
  Nav
} from "reactstrap";
import employee from "../../reducers/employee";

export class SubSideNav extends Component {
  static propTypes ={
    employeeAuth: PropTypes.object.isRequired,
    logoutEmployee: PropTypes.func.isRequired
  }

  render(){
      const { isAuthenticated, user } = this.props.employeeAuth;
      const nameLinks = (
            <NavItem>
                <NavLink to="/main" tag={Link}>
                    { user ? `Welcome ${user.fullname}` : '' }
                </NavLink>
            </NavItem>
      );

      const employeeLinks = (
        <NavItem>
            <button 
            onClick={this.props.logoutEmployee}
            className="nav-link btn btn-danger btn-xm text-light"
            >
                Logout
            </button>
        </NavItem>
        );

    return (
            <Nav navbar>
                { user ? nameLinks : "" }
                <NavItem>
                    <NavLink to="/main" tag={Link}>
                    Home
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/about">
                    About Us
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/employee">
                    Employee
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/admission">
                    Admission
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/contact">
                    Contact Us
                    </NavLink>
                </NavItem>
                    { isAuthenticated ?  employeeLinks : '' }
                </Nav>
    );
}
}
const mapStateToProps = state =>({
    employeeAuth: state.employeeReducer
});
export default connect(mapStateToProps, { logoutEmployee })(SubSideNav);
