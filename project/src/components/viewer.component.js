import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Routine = props => (
    <div>
    <div className="topviewer">
        {props.routine.name} 
    </div>
    <div className="imageholder">
    <div className="imageviewer">
    </div>
    </div>
    <div className="bottomviewer">
      {props.routine.description} 
    </div>
    </div>
)

export default class Viewer extends Component {
    constructor(props) {
        super(props);

        this.deleteRoutine = this.deleteRoutine.bind(this);

        this.state = {routines: []};
    }

    componentDidMount() {
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