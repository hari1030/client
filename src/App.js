import React,{Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state={
    value:0
  }
  submit = (e) => {
    e.preventDefault();
    axios.post(`/${this.state.value}`).then((res)=>{
      console.log(res.data);
    })
  }
  update = (e) => {
    this.setState({
      value:e.target.value
    });
  }
  emptyQueue = (e) => {
    e.preventDefault();
    axios.post('/').then((res)=>{
      console.log(res.data);
    })
  }
  render() {
    return (
      <form>
        <input type="text" onChange={this.update}></input><br/><br/>
        <button onClick={this.submit}>Submit</button><br/><br/>
        <button onClick={this.emptyQueue}>Empty Queue</button>
      </form>
    );
  }
}
export default App;
