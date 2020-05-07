import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

export class Logout extends Component{
    render(){
        return(
            <div>
                <a href="#"  className="nav-link" onClick={this.props.logout}>Logout</a>
            </div>
        )
    }
}

export default connect (
    null,
    {logout}
)(Logout);