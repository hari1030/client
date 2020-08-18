import React,{Component} from 'react';
import './App.css';
var async=require("async");
// var fs=require('fs');

var arr=[];
var q = async.queue(function(task, callback) {
  console.log('Number ' + task);
  // fs.writeFile('file.txt',task);
  setTimeout(function(){
    callback();
  },5000);
}, 2);  //perform two tasks at a time

q.drain = function() {
  console.log('All items have been processed');
};

class App extends Component {
  state={
    value:0
  }
  submit = (e) => {
    e.preventDefault();
    arr.push(this.state.value);
  }
  update = (e) => {
    this.setState({
      value:e.target.value
    });
  }
  emptyQueue = (e) => {
    e.preventDefault();
    arr.forEach(function(val) {
      q.push(val, function() {
        console.log('finished processing');
      });
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
