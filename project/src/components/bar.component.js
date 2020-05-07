import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Routine = props => (
    <tr>
        <td className="barName"><div className="barNameDiv">{props.routine.routineName} </div></td>
        <td>by</td>
        <td>{props.routine.username}</td>
        <td className="dis"><div className="discriptionDiv">{props.routine.description}</div></td>
        </tr>
)

export default class Bar extends Component {
    constructor(props) {
        super(props);

        

        this.state = {routines: []};
    }

    componentDidUpdate() {
        axios.get('http://localhost:5000/routines/'+this.props.data)
            .then(res => {
                this.setState({ routines: res.data })
            })
            .catch((err) => {
                console.log(err);
            })

        
    }
    
    routineList() {
        return( <Routine routine= {this.state.routines}/>
           )
        
    }

    render() {
        return (
            <div>
                <table className="bar_table">
                    <tr>
                        </tr>
                    <tbody>
                        {this.routineList()}
                    </tbody>
                </table>
            </div>
        )
    }
}