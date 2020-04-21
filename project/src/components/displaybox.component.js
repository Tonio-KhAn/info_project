import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Preview from "./preview.component";
import Bar from "./bar.component";
import Viewer from "./viewer.component";

const Routine = props => (
    <td className="display_td">
    <table>
        <tr>
            <td><a href="#" onClick={(props.routine._id)} >{props.routine.routineName}</a></td>
        </tr>
        <tr>
           <td>by</td>
        </tr>
        <tr>
            <td>{props.routine.username}</td>
        </tr>
    </table>
    </td>
    
)

export default class Displaybox extends Component {
    constructor(props) {
        super(props);

        this.switchId = this.switchId.bind(this);

        this.state = {
            id:'',
            routines: []
            
        };
    }

   switchId(newid){
        this.setState({
            id: newid,
        });
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

    routineList() {
        return this.state.routines.map(currentroutine => {
            return <Routine routine={currentroutine} deleteRoutine={this.deleteRoutine} key={currentroutine._id} />;
        })
    }

    render() {
        return(
    <div>
            <div class="forstyle">
            <div className="displayDiv">
                <table className="table2">
                    <tbody>
                        <tr className="display_tr">
                            {this.routineList()}
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
                <div className="forstyle2">
                    <div className="barDiv">
                         <Bar data="5e9a4c4acc50bf45b4d483ea"/>
                    </div>
                    <div className="center">
                        <div className="left">
                        <Preview data="5e9a4c4acc50bf45b4d483ea"/>
                        </div>
                        <div className="right">
                        <Viewer data="5e9b407e1b673f0bf03b05d3"/>
                        </div>
                     </div>
                </div>
      </div>
        );
    }
}