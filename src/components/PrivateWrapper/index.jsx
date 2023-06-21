import React from 'react';
//Package Imports
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
//Utilities/Constants Imports
import { PAGE_ROUTES } from "../../constants";

/**
 * @param {boolean} isAuthenticated 
 * @description Private Router wrapper to prevent any unauthorized access to any private defined route
 * @returns {Component} component based on isAuthenticated flag
 */
const PrivateWrapper = ({ auth: { isAuthenticated = {} } = {} }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to={PAGE_ROUTES.SIGNIN} />
};

PrivateWrapper.propTypes = {
    auth: PropTypes.shape({
        isAuthenticated: PropTypes.bool
    })
};

export default PrivateWrapper;

