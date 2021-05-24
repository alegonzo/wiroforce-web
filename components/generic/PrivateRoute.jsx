import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authService } from '../../services/AuthService';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authService.currentUserValue;
        if (!currentUser) {
            return <Redirect to="/login" />
        }
        return <Component {...props} />
    }} />
);

export default PrivateRoute;