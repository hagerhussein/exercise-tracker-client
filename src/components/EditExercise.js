import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';


export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
    .then(response => {
      this.setState({
      username: response.data.username,
      description: response.data.description,
      duration: response.data.duration,
      date: new Date(response.data.date)
      })
    })
    .catch(err => console.log(err))
    

    axios.get('http://localhost:5000/users')
    .then(response => {
      if(response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username)
        })
      }
    })
    .catch(err => console.log(err))
    
    }
    onChangeUsername = (e) => {
      this.setState({
        username: e.target.value
      }) 
    }
  
    onChangeDescription = (e) => {
      this.setState({
        description: e.target.value
      }) 
    }
  
    onChangeDuration = (e) => {
      this.setState({
        duration: e.target.value
      }) 
    }
  
    onChangeDate = (date) => {
      this.setState({
        date: date
      }) 
    }
  
    onSubmit = (e) => {
      e.preventDefault()
  
      const exercise = {
        username: this.state.username,
        description: this.state.description,
        duration: this.state.duration,
        date: this.state.date
      }
      console.log(exercise)
      axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
      window.location = '/'
    }
  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.username}
              onChange={this.onChangeUsername}
            >
              {
                this.state.users.map(user =>
                  (<option
                    key={user}
                    value={user}
                  >
                    {user}
                  </option>))
              }
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <lable>Duration (in minutes): </lable>
            <input type="text"
              required
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <lable>Date: </lable>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
