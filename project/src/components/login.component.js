import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../actions/authActions';


class RoutinesList extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login:PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {isAuthenicated} = this.props;
        if (isAuthenicated){
        }
    }
 
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
  
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(user);
            
        

        console.log(user);
        
    }
    
    render() {
        return (
            <span className="spanLogin">
            <div className= "centerLogin">
               <div className= "divLogin">
                  login
                  <form onSubmit={this.onSubmit}>
                <div className="loginForm">
                    <label>User Name</label>
                    <input
                        type="text"
                        required className="form-control"
                        placeholder="User Name"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className="loginForm">
                    <label>Password </label>
                    <input
                        type="text"
                        required className="form-control"
                        placeholder="***************"
                        value={this.state.password}
                         onChange={this.onChangePassword}
                    />
                </div>
                <div className="loginForm">
                    <input
                        type="submit"
                        value="LOGIN"
                        className="loginButton"
                    />
                </div>
                
            </form>
               </div>
            </div>    
            </span>
        );
    }
}

const mapStateToProps = state =>({
    isAuthenicated: state.auth.isAuthenticated,
    error:state.error
}); 

export default connect(
    mapStateToProps,
    {login})
    (RoutinesList);
