import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Messages from "./Messages";
class App extends Component {
  state = {
    sender: null,
    receiver: null,
    message: null,
  };
  submit = (e) => {
    e.preventDefault();
    axios
      .post(`/this.state.sender`, {
        sender: this.state.sender,
        receiver: this.state.receiver,
        message: this.state.message,
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  update = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  render() {
    return (
      <div className="App">
        <form>
          <h3> Enter Messages </h3>
          <input
            type="text"
            id="sender"
            placeholder="from"
            onChange={this.update}
          ></input>
          <br />
          <br />
          <input
            type="text"
            id="receiver"
            placeholder="to"
            onChange={this.update}
          ></input>
          <br />
          <br />
          <input
            type="text"
            id="message"
            placeholder="message"
            onChange={this.update}
          ></input>
          <br />
          <br />
          <button onClick={this.submit}> Submit </button> <br />
          <br />
        </form>
        <Messages />
      </div>
    );
  }
}
export default App;
