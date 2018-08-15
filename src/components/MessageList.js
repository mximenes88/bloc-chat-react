import React, {Component} from 'react';

class MessageList extends Component{
     constructor(props){
         super(props);

         this.state={
             message: [],
             Messages: [{
                username : '',
                content: '',
                roomID: '',
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
             }]
            } 

         this.MessagesRef= this.props.firebase.database().ref('Messages');
     }
        

componentDidMount(){
    this.MessagesRef.on('child_added',snapshot =>{
        const message =snapshot.val();
        message.key= snapshot.key
        this.setState({ message: this.state.message.concat(message)});
    } );
}

render(){
    const activeRoomKey = parseInt(this.props.activeRoom.key);
    return(
       <div className = "Message_rooms">
            <h1 className="room-title">{this.props.activeRoom.name}</h1>
            <ul id="message-list">
                {this.state.message
                .filter(message =>message.roomId === activeRoomKey)
                .map((message,index) =>
                <div key={index}>
                  <li>{message.username} <br></br> {message.content}</li> 
                  <li>{message.sentAt}</li>
                </div>
                )
                }
            </ul>
        
      </div>

    )
 }
}



export default MessageList;