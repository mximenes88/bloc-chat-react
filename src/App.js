import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBqMn89fAp0_kKmdrBWExmh-hZHKs8owNQ",
  authDomain: "bloc-chat-react-43afe.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-43afe.firebaseio.com",
  projectId: "bloc-chat-react-43afe",
  storageBucket: "bloc-chat-react-43afe.appspot.com",
  messagingSenderId: "187705475268"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chats</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
