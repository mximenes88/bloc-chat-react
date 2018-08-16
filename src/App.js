import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
    constructor(props){
      super(props);

      this.state = {
         activeRoom :'',
         currentUser: '',
      }
      this.setCurrentRoom = this.setCurrentRoom.bind(this);
      this.setUser = this.setUser.bind(this);
    }

   setCurrentRoom(room){
        this.setState({activeRoom: room})

      }
  setUser(user){
     this.setState({currentUser:user})
  }
render(){
    return(
      <div className="App">
        <div className="sidebar">
            <header>
              <h1>Bloc Chats</h1>
            </header>
            <div className="user_info">
              <User
              firebase={firebase}
              user= {this.state.currentUser}
              setUser={this.setUser}
              />
            </div>
            <div className="room_info">     
              <RoomList
                firebase={firebase}
                activeRoom = {this.state.activeRoom}
                setCurrentRoom= {this.setCurrentRoom}
              />
            </div>
          </div>
          <div className="message_info">
            <MessageList 
              firebase={firebase}
               user={this.state.currentUser}
               setUser={this.setUser}
              activeRoom= {this.state.activeRoom }
            />
        </div>

    </div>
    )
  }
}



export default App;
