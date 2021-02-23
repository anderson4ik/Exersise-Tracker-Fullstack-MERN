import React, { Component } from 'react';
import axios from 'axios';


export default class CreateUser extends Component {
    constructor(props) {
        super(props);
 
        //Now we’ll make sure this works properly in our methods, we need to bind the methods to this. Add these lines to the constructor:
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
 
        this.state = {
            username: '',
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        //he e.preventDefault() prevents the default HTML form submit behavior from taking place.
        e.preventDefault();
 
       const newUser = {
           username: this.state.username,
       } 
 
       console.log(newUser);

       //To connect our code to the backend
       axios.post('http://localhost:5000/users/add', newUser)
         .then(res => console.log(res.data));
      //The axios.post method sends an HTTP POST request to the backend endpoint http://localhost:5000/users/add. This endpoint is expecting a JSON object in the request body so we passed in the newUser object as a second argument.   
 
       this.setState({
           username: ''
       })
    }
 

   render() {
       return(
        <div>
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
      </div>
       )
   }
}