import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Routine = props => (
    <tr>
        <td>{props.routine.username}</td>
        <td>{props.routine.routineName}</td>
        <td className="overflowing">{props.routine.description}</td>
        <td>{props.routine.url}</td>
        <td>{props.routine.date.substring(0,10)}</td>
        <td>
        <Link to={"/add_exercise/"+props.routine._id}>add exercises</Link> |<Link to={"/edit/"+props.routine._id}>edit</Link> | <a href="#" onClick={() => {props.deleteRoutine(props.routine._id)}}>delete</a></td>
    </tr>
)

export default class RoutinesList extends Component {
    constructor(props) {
        super(props);

        this.deleteRoutine = this.deleteRoutine.bind(this);

        this.state = {routines: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/routines/')
            .then(res => {
                this.setState({ routines: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    deleteRoutine(id) {
        axios.delete('http://localhost:5000/routines/'+id)
            .then(res => console.log(res.data));
        this.setState({
            routines: this.state.routines.filter(el => el._id !== id)
        })
    }
    routineList() {
        return this.state.routines.map(currentroutine => {
            return <Routine routine={currentroutine} deleteRoutine={this.deleteRoutine} key={currentroutine._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Routines</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Routine Name</th>
                            <th>Description</th>
                            <th>URL</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.routineList()}
                    </tbody>
                </table>
            </div>
        )
    }
}