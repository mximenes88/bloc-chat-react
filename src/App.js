import React, { Component } from 'react';
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
        <div className="sidebar">
          <header>
            <h1>Bloc Chats</h1>
          </header>
          <RoomList
            firebase={firebase}
          />
       </div>
      </div>
    );
  }
}

export default App;
