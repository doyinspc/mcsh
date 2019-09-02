import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux"
import PropTypes from 'prop-types'

const RestrictedRoute = ({component:Component, employee, client, ...rest})=>(
   
    <Route
        {...rest}
        render={props => {
            if(employee && employee !== 'undefined' && employee.isAuthenticated){
                return <Component {...props}/>
            }
            else if(client && client !== 'undefined' && client.isAuthenticated){
                return <Component {...props}/>
            }else{
                return <Redirect to="/login-page" />
            }
            
        }}
    />
)

const mapStateToProps = state =>({
    employee:state.employeeReducer,
    client:state.clientReducer
});

export default connect(mapStateToProps)(RestrictedRoute);