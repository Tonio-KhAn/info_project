import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Routine = props => (
  <tr>
    <td><a href='#' onClick={() => {props.changeSecondid(props.routine._id)}} >{props.routine.name}</a></td>
    <td><div className='previewDescription'>{props.routine.description}</div></td>
  </tr>
);

export default class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = { routines: [] };
  }

  componentDidUpdate() {
    axios
      .get('http://localhost:5000/exercise/routineID/'+ this.props.data.routineid )
      .then(res => {
        this.setState({ routines: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  routineList() {
    return this.state.routines.map(currentroutine => {
      return <Routine routine={currentroutine} changeSecondid= {this.props.data.changeSecondid} key={currentroutine._id} />;
    });
  }

  render() {
    return (
      <div className="insideleft">
        <table className="table">
          <thead className="previewTable">
              <th>Exercises</th>
              <th> </th>
          </thead>
          <tbody className="previewTableBody">{this.routineList()}</tbody>
        </table>
      </div>
    );
  }
}
