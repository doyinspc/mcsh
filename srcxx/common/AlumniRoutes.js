import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux"
import PropTypes from 'prop-types'

const AlumniRoute = ({component:Component, auth, ...rest})=>(
    <Route
        {...rest}
        render={props => {
            if (auth.isLoading) {
                return <h2>Loading Files</h2>
            } else if (auth.isAuthenticated) {
                return <Redirect to="/alumni-profile" />
            } else {
                return  <Component {...props}/>
            }
        }}
    />
)

const mapStateToProps = state =>({
    auth:state.auth
});

export default connect(mapStateToProps)(AlumniRoute);
