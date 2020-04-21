import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditRoutine extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeRoutineName = this.onChangeRoutineName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            routineName: '',
            description: '',
            url: '',
            date: new Date()
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
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
    onChangeUrl(e) {
        this.setState({
            url: e.target.value
        });
    }
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }
    componentDidMount() {
        axios.get('http://localhost:5000/routines/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    routineName: res.data.routineName,
                    description: res.data.description,
                    url: res.data.url,
                    date: new Date(res.data.date)
                })
            })
            .catch(function (err) {
                console.log(err)
            });
    }
    onSubmit(e) {
        e.preventDefault();

        const routine = {
            username: this.state.username,
            routineName: this.state.routineName,
            description: this.state.description,
            url: this.state.url,
            date: this.state.date
        }

        console.log(routine);
        axios.put('http://localhost:5000/routines/update/'+this.props.match.params.id, routine)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Routine</h3>
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
                        <label>URL: </label>
                        <input
                            type="url"
                            className="form-control"
                            value={this.state.url}
                            onChange={this.onChangeUrl}
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
                            value="Update"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}