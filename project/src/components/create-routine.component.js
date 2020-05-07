import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CreateRoutine extends Component {
    constructor(props) {
        super(props);

        this.onChangeRoutineName = this.onChangeRoutineName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            routineName: '',
            description: '',
            date: new Date()
        }
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    
    onChangeRoutineName(e) {
        this.setState({
            routineName: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }
    
    onSubmit(e) {
        e.preventDefault();

        const routine = {
            username: this.props.auth.user.username,
            routineName: this.state.routineName,
            description: this.state.description,
            date: this.state.date
        }

        console.log(routine);
        axios.post('http://localhost:5000/routines/add', routine)
            .then(res => console.log(res.data));
    }

    render() {
        return (
            <div>
                <h3>Create New Routine</h3>
                <form onSubmit={this.onSubmit}>
                    
                    <div className="form-group">
                        <label>Routine Name: </label>
                        <input
                            type="text"
                            required className="form-control"
                            placeholder="Routine Name"
                            value={this.state.routineName}
                            onChange={this.onChangeRoutineName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            required className="form-control"
                            placeholder="Enter a description.."
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create Routine"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}


const mapStateToProps = state =>({
    auth: state.auth
});

export default connect(mapStateToProps, null)(CreateRoutine);