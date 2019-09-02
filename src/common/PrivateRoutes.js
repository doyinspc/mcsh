import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux"
import PropTypes from 'prop-types'

const PrivateRoute = ({component:Component, employee, ...rest})=>(
    <Route
        {...rest}
        render={props => {
            if (!employee.isAuthenticated ) {
                return <Redirect to="/staff-login-page" />
            } else {
                return <Component {...props}/>
            }
        }}
    />
)

const mapStateToProps = state =>({
    employee:state.employeeReducer
});

export default connect(mapStateToProps)(PrivateRoute);
