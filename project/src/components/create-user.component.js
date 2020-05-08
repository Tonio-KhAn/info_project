import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../actions/authActions';
import { create } from 'domain';
import { Redirect } from 'react-router';

class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
            msg: null,
            redirect : false
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register:PropTypes.func.isRequired
    }; 

    componentDidUpdate(prevProps){
        const {isAuthenticated} = this.props;
        if (isAuthenticated){
            this.setState({redirect: true});
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
            const {username, email, password} = this.state;

            const newUser= {
                username, 
                email, 
                password
            };

            this.props.register(newUser);
            
            
        
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/" />;
            }
        
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            required className="form-control"
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input
                            type="email"
                            required className="form-control"
                            placeholder="email address"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            required className="form-control"
                            minLength="8"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create User"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    error:state.error
}); 

export default connect(
    mapStateToProps,
    {register})
    (CreateUser);
