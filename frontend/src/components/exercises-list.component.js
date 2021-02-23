import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 


//The Exercise component is implemented as a functional React component. The key thing that makes this type of component different from a class component is the lack of state and lifecycle methods. If all you need to do is to accept props and return JSX, use a functional component instead of a class component.
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
           {/* the ‘actions’ column w output two links. One link goes to the edit route and the other calls the deleteExercise method. */}   
           <Link to={"/edit/"+props.exercise._id}>edit</Link> | <button className="btn btn-light"><a href="/" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a></button>
        </td>
    </tr>
)


export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            exercises: []
        };
    }


    //The code will run before the page is rendered and add the list of exercises to the state. The axios.get method accesses the /exercises endpoint. Then we assign response.data to the exercises property of the component’s state object with the this.setState method.
    componentDidMount() {
      axios.get('http://localhost:5000/exercises/')
         .then(res => {
             this.setState({ exercises: res.data })
         })
         .catch(err => console.log(err));
    }


    //We use the axios.delete method, then we update the state of exercises and filter out the exercise that was deleted.
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
           .then(res => console.log(res.data));
        
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })   
    }

    exerciseList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>;//key attr use React for it own needs!
        })
    }

   render() {
       return(
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.exerciseList() }
                </tbody>
            </table>
      </div>
       )
   }
}