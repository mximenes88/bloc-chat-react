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
             }],
             newMessages: '',
            } 

         this.MessagesRef= this.props.firebase.database().ref('Messages');
         this.createMessages=this.createMessages.bind(this);
     }
        

componentDidMount(){
    this.MessagesRef.on('child_added',snapshot =>{
        const message =snapshot.val();
        message.key= snapshot.key
        this.setState({ message: this.state.message.concat(message)});
    } );
}


createMessages(newMessages){
     this.MessagesRef.push({
        username: this.props.user ? this.props.user.name : 'Guest',
        content: this.state.newMessages,
        roomID: this.props.activeRoom.key,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      });

    this.setState ({newMessages:''});
}

 handleChange(e){
    this.setState({newMessages: e.target.value});
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
            <form id="create-message" onSubmit={ (e) => { e.preventDefault(); this.createMessages(this.state.newMessages) } }>
                <input type="text" value={ this.state.newMessages } onChange={(e)=>this.handleChange(e)} placeholder="Please Type here" />
                <input type="submit" />
            </form>
        
      </div>

    )
 }
}




export default MessageList;