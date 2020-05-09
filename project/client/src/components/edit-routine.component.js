import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router";

class EditRoutine extends Component {
  constructor(props) {
    super(props);

    this.onChangeRoutineName = this.onChangeRoutineName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      routineName: "",
      description: "",
      date: new Date(),
      redirect: false
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

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
  componentDidMount() {
    axios
      .get("http://localhost:5000/routines/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          username: res.data.username,
          routineName: res.data.routineName,
          description: res.data.description,
          date: new Date(res.data.date)
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  onSubmit(e) {
    e.preventDefault();

    const routine = {
      username: this.state.username,
      routineName: this.state.routineName,
      description: this.state.description,
      date: this.state.date
    };
    const token = this.props.auth.token;

    const config = {
      headers: {}
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    console.log(routine);
    axios
      .put(
        "http://localhost:5000/routines/update/" + this.props.match.params.id,
        routine,
        config
      )
      .then(
        res => console.log(res.data),

        this.setState({ redirect: true })
      );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/routines" />;
    }

    return (
      <div>
        <h3>Edit Routine</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Routine Name: </label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="Routine Name"
              value={this.state.routineName}
              onChange={this.onChangeRoutineName}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
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
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(EditRoutine);
