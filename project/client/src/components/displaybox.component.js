import React from 'react';
import { Component } from 'react';
import { useState } from 'react';
import { PropTypes } from 'react'
import axios from 'axios';
import Preview from "./preview.component";
import Bar from "./bar.component";
import Viewer from "./viewer.component";
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Routine = props => (
    
    <td className="display_td">
    <table>
        <tr>
            <td className="sliderText"><div className= "sliderDiv"><a href="#" onClick={() => {props.deleteRoutine(props.routine._id)}} >{props.routine.routineName}</a></div></td>
        </tr>
        <tr>
           <td>by{props.id}</td>
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

        this.deleteRoutine = this.deleteRoutine.bind(this);
        

        this.state = {
            id:"5eac5303e3ccf241840f84f6",
            secondid:"5eac25a25484841d7046ee2d",
            routines: []
            
        };
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

changeSecondid(newid){
this.setState({secondid: newid})
}

   deleteRoutine(rid) {
    this.setState({ id: rid})
}

    routineList() {
        return this.state.routines.map(currentroutine => {
            return <Routine routine={currentroutine} deleteRoutine={this.deleteRoutine} key={currentroutine._id} />;
        })
    }

    render() {
        return(
    <span className="homespan">        
    <div className="homediv">
            
            <div className="displayDiv">
                <table className="table2">
                    <tbody>
                        <tr className="display_tr">
                            {this.routineList()}
                        </tr>
                    </tbody>
                </table>
            </div>
            
                <div className="forstyle2">
                    <div className="barDiv">
                        <Bar data={this.state.id}/>
                    </div>
                    <div className="center">
                        <div className="left">
                        <Preview data= {
                            {routineid: this.state.id, 
                             secondid: this.state.secondid,
                            changeSecondid: this.changeSecondid.bind(this)}
                        }/>
                        </div>
                        <div className="right">
                        <Viewer data={this.state.secondid}/>
                        </div>
                     </div>
                </div>
      </div>
      </span>
        );
    }
}