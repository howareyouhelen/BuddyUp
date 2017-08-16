import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Main from './Main.jsx';
import SignupPage from './SignupPage.jsx';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Greetings from './Greetings.jsx';
import NavigationBar from './NavigationBar.jsx';
import LoginPage from './LoginPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import MatchmakerPage from './MainApp/MatchmakerPage.jsx';
import { connect } from 'react-redux';

const socket = io.connect('http://127.0.0.1:3001');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: []
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    socket.on("connect", function () {
      console.log("Connected!");
    });
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <div className="container">
          <NavigationBar />
        </div>
        <h1><strong>Here are your matches:</strong></h1>
        <Main />

      <div className="container">
        <NavigationBar />
        <Route exact path="/" component={Greetings} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/matchmaker" render={() => ( isAuthenticated ? <MatchmakerPage /> : <Redirect to="/login"/> )} />
      </div>
    );
  }
}

const style = {
   margin: 15,
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(App);
