import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import RoutinesList from "./components/routines-list.component";
import EditRoutine from "./components/edit-routine.component";
import CreateRoutine from "./components/create-routine.component";
import CreateUser from "./components/create-user.component";
import DisplayBox from "./components/displaybox.component";
import Preview from "./components/preview.component";
import AddExercise from "./components/add-exercise.component";
import Login from "./components/login.component";
import { loadUser } from './actions/authActions';
import { Provider } from  'react-redux';
import store from './store';
class App extends Component {
      componentDidMount(){
        loadUser();
      }

  render(){
  return (
    <Provider store={store}>
    <Router>
      <div className="container">
      <Navbar />
      <br />
      <Route path="/edit/:id" exact component={EditRoutine} />
      <Route path="/add_exercise/:id" exact component={AddExercise} />
      <Route path="/create" exact component={CreateRoutine} />
      <Route path="/user" exact component={CreateUser} />
      <Route path="/login" exact component={Login} />
      </div>
      <div className="container">
      <div className="displayBox">
      <Route path="/" exact component={DisplayBox} />
      </div>
      <div className="log">
      <Route path="/routines" exact component={RoutinesList} />
      </div>
      </div>
    </Router>
    </Provider>
  )
}
} 
export default App;
