import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router";

class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangename = this.onChangename.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangenumOfReps = this.onChangenumOfReps.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      description: "",
      numOfReps: "",
      url: "",
      image: null,
      date: new Date(),
      redirect: false
    };
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onChangename(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangenumOfReps(e) {
    this.setState({
      numOfReps: e.target.value
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
  onChangeImage = event => {
    this.setState({
      image: event.target.files[0]
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      routineID: this.props.match.params.id,
      name: this.state.name,
      description: this.state.description,
      numOfReps: this.state.numOfReps,
      url: this.state.url,
      date: this.state.date
    };
    const token = this.props.auth.token;

    const config = {
      headers: {
        "Content-type": "appplication/json"
      }
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    let formdata = new FormData();

    formdata.append("routineID", this.props.match.params.id);
    formdata.append("name", this.state.name);
    formdata.append("description", this.state.description);
    formdata.append("numOfReps", this.state.numOfReps);
    formdata.append("url", this.state.url);
    formdata.append("image", this.state.image);
    formdata.append("date", this.state.date);

    axios
      .post("http://localhost:5000/exercise/add", formdata, config)
      .then(res => console.log(res.data), this.setState({ redirect: true }));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/routines" />;
    }
    return (
      <div>
        <h3>Add Exercises</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Exercise: </label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="Exercise Name"
              value={this.state.name}
              onChange={this.onChangename}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="Description"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Num of Reps: </label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="Number Of Reps"
              value={this.state.numOfReps}
              onChange={this.onChangenumOfReps}
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
            <label>Image </label>
            <input type="file" onChange={this.onChangeImage} />
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
              value="Create Exercise"
              className="btn btn-primary"
            />
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
)(CreateExercise);
