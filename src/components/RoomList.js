import React, {Component} from 'react';

class RoomList extends Component{
       constructor(props){
        super(props);

        this.state = {
            rooms: [],
            newRoomName: ' '
        };

        this.roomsRef= this.props.firebase.database().ref('rooms');
        }

        componentDidMount(){
            this.roomsRef.on('child_added',snapshot =>{
                const room =snapshot.val();
                room.key= snapshot.key
                this.setState({ rooms: this.state.rooms.concat(room)});
            } );
            this.roomsRef.on('child_removed', snapshot =>{
                 this.setState({rooms:this.state.rooms.filter(room => room.key !== snapshot.key )})
           });

        }


        createRoom(newRoomName){
            this.roomsRef.push({
                name:newRoomName
              });
            this.setState({newRoomName:' '});
            } 
    
        handleChange(e) {
            this.setState({newRoomName: e.target.value });
          }

        handleDelete(room){
            this.roomsRef.child(room.key).remove();
        }

    render() {
        return(
        <div className="rooms">

          <form onSubmit={e=>{e.preventDefault();this.createRoom(this.state.newRoomName)}}>
          <input type = "text" placeholder="Add new room" value={this.state.newRoomName} onChange={(e)=> this.handleChange(e)}/>
            <button className="adding_rooms_button">Add</button>
          </form>

         <section className="room_list">
           {this.state.rooms.map((room, index)=>
            <div className="room_names" key={index} onClick ={() => this.props.setCurrentRoom(room)}>
               {room.name}
                <button className="delete_bttn" onClick={()=>this.handleDelete(room)}>Remove</button>
            </div>
            )}
          </section>
       </div>
        );
    }
}

export default RoomList;