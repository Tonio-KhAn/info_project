import React, { Component, Fragment  } from 'react';
import { Link } from 'react-router-dom';
import Logout from "./logout.component";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Navbar extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const { isAuthenticated, user }= this.props.auth;

        const authLinks = (
            <Fragment>
                <li className="navbar-item">
                    <Link to="/routines" className="nav-link">My Routines</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Routine</Link>
                 </li>
                <li className="navbar-item">
                    <Logout/>
                </li>
                <li className="welcome">
                  <strong> {user ? `Hi ${user.username} welcome to eXroutine`: '  Welcome !'}</strong>
                </li>

            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <li className="navbar-item">
                    <Link to="/user" className="nav-link">Create User</Link>
                </li>
                <li className="navbar-item">
                     <Link to="/login" className="nav-link">Login</Link>
                </li>
            </Fragment>

        )
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">ExRoutine</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                      {isAuthenticated ? authLinks : guestLinks}
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state =>({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Navbar);