import React, {Component} from 'react';

class MessageList extends Component{
     constructor(props){
         super(props);

         this.state={
             message: [],
             Messages: {
                username: '',
                content: '',
                roomID: '',
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
             }  
            } 

         this.MessagesRef= this.props.firebase.database().ref('Messages');
     }
        

componentDidMount(){
    this.MessagesRef.on('child_added',snapshot =>{
        const message =snapshot.val();
        message.key= snapshot.key
        this.setState({ Messages: this.state.Messages.concat(message)});
    } );
}

render(){
    return(
       <div className = "Message_rooms">
            <h1 className="room-title">{this.props.activeRoom.name}</h1>
            <ul id="message-list">
                {this.state.message
                .filter(message =>message.roomID === this.props.activeRoom.key)
                .map((message,index) =>
                <div>
                  <li key={index}>{message.username} <br></br> {message.content}</li> 
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