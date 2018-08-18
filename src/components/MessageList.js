import React, {Component} from 'react';
import moment from 'moment';


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

         this.MessagesRef=this.props.firebase.database().ref('Messages');
         
            
            this.createMessages=this.createMessages.bind(this);
     }
        

componentDidMount(){
    this.MessagesRef.on('child_added',snapshot =>{
        const message =snapshot.val();
        message.key= snapshot.key
        this.setState({ message: this.state.message.concat(message)});
    } );
    this.MessagesRef.on('child_removed',snapshot =>{
         this.setState({message:this.state.message.filter(message=>message.key !== snapshot.key)})
    });
}


createMessages(newMessages){
     this.MessagesRef.push({
        username: this.props.user ? this.props.user.displayName : 'Guest',
        content: this.state.newMessages,
        roomId: this.props.activeRoom.key,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
      });

    this.setState ({newMessages:''});
}

 handleChange(e){
    this.setState({newMessages: e.target.value});
 }

 removeMessage(message){
     this.MessagesRef.child(message.key).remove();
 }

render(){
    return(
       <div className = "Message_rooms">
            <h1 className="room-title">{this.props.activeRoom.name}</h1>
            <ul className="message-list">
                {this.state.message
                .filter(message =>message.roomId === this.props.activeRoom.key)
                .map((message,index) =>
                <div  className="list_items" key={index}>
                 <li className="new_name">{message.username}</li>
                  <li className="content">{message.content}<br></br> {moment(message.sentAt).format( 'h:mm:ss a')} </li>
                    <button onClick={()=>this.removeMessage(message)}>Delete Message</button>
               
                </div>
                )
                }
            </ul>  
           
          <section className="submit_form">
            <form className="messages_printed" onSubmit={ (e) => { e.preventDefault(); this.createMessages(this.state.newMessages) } }>
                <input className="input_box" type="text" value={ this.state.newMessages } onChange={(e)=>this.handleChange(e)} placeholder="Please Type here" />
                <input className="input_btn" type="submit" />
            </form>
         </section>
        </div>
      

    )
 }
}




export default MessageList;