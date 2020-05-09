import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Routine = props => (
    <div className="viewerDiv">
    <div className="topviewer">
        {props.routine.name} 
    </div>
    <div className="imageholder">
    <div className="imageviewer">
    <img src={props.routine.image} alt="image" className="image" ></img>
    </div>
    </div>
    <div className="bottomviewer">
    <ul>

     <li> {props.routine.description} </li>
     <li> No. of Reps {props.routine.numOfReps}</li>
      </ul>
    </div>
    </div>
)

export default class Viewer extends Component {
    constructor(props) {
        super(props);

        this.deleteRoutine = this.deleteRoutine.bind(this);

        this.state = {routines: []};
    }

    componentDidUpdate() {
        axios.get('http://localhost:5000/exercise/'+this.props.data)
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
            return( <Routine routine= {this.state.routines} key={this.state.routines._id} />
            )
    }

    render() {
        return (
            <div>
             {this.routineList()}
            </div>
        )
    }
}