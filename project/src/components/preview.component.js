import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Routine = props => (
  <tr>
    <td>{props.routine.name}</td>
    <td>{props.routine.description}</td>
  </tr>
);

export default class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = { routines: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercise?name=" + 123)
      .then(res => {
        this.setState({ routines: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  routineList() {
    return this.state.routines.map(currentroutine => {
      return <Routine routine={currentroutine} key={currentroutine._id} />;
    });
  }

  render() {
    return (
      <div className="insideleft">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Exercises</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.routineList()}</tbody>
        </table>
      </div>
    );
  }
}
