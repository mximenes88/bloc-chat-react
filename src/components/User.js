import React, {Component} from 'react';


 class User extends Component{
       constructor(props){
          super(props);
          this.state={
            user:''
          }
        }

     componentDidMount(){
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
          });
     }

      signIn(){
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
      }

      signOut(){
        this.props.firebase.auth().signOut();
      }

    render() {
        
      return(

        <div className="user">
            <span className="current_user">{this.props.user ? this.props.user.displayName : 'Guest'}</span>
       
             <button className="login" onClick={()=> this.signIn()}>Sign In</button>
             <button className="logout" onClick={()=>this.signOut()}>Sign Out</button>
          
          
          </div>






      
      )

    }
 }


export default User;