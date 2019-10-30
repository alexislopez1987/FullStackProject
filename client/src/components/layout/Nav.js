import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './../../actions/auth';
import { withRouter } from "react-router";

const Nav = (props) => {

    const aStyle = {
        cursor: 'pointer'
    };

    const clickHandler = (e) =>{
        props.logout();
        props.history.push("/");
    }

    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
            </li>
        </Fragment>
    );

    const authLinks = (
        <Fragment>
            <li className="nav-item active">
                <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
                <Link to="/items" className="nav-link">Items</Link>
            </li>   
            <li className="nav-item">
                <a className="nav-link" style={aStyle} onClick={e => clickHandler(e)} >Logout</a>
            </li>   
        </Fragment>       
    );

    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <ul className="navbar-nav">
                { props.isAuthenticated === true ? authLinks : guestLinks }
            </ul>
        </nav>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, { logout })(Nav));