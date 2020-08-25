import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Messagelist from "./Messagelist";

class Messages extends Component {
  state = {
    name: null,
    start: new Date(),
    end: new Date(),
    messages: null,
    counter: 0,
    retreive: null,
    nextbuttonenable: false,
    cached: false,
  };
  change = (e, id) => {
    this.setState({
      [id]: e,
    });
  };
  retrieveSenderUtil = () => {
    axios
      .post(`/retrieveSender`, {
        counter: this.state.counter,
        name: this.state.name,
        start: this.state.start,
        end: this.state.end,
        cached: this.state.cached,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          messages: res.data,
        });
      });
  };
  retrieveSender = () => {
    this.setState({
      counter: 0,
      retreive: this.retrieveSenderUtil,
    });
    this.retrieveSenderUtil();
    this.setState({
      nextbuttonenable: true,
    });
  };
  retrieveReceiverUtil = () => {
    axios
      .post(`/retrieveReceiver`, {
        name: this.state.name,
        start: this.state.start,
        end: this.state.end,
        counter: this.state.counter,
        cached: this.state.cached,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          messages: res.data,
        });
      });
  };
  retrieveReceiver = () => {
    this.setState({
      counter: 0,
      retreive: this.retrieveReceiverUtil,
    });
    this.retrieveReceiverUtil();
    this.setState({
      nextbuttonenable: true,
    });
  };
  nextbutton = async () => {
    // console.log(this.state.counter);
    await this.setState({
      counter: this.state.counter + 1,
      cached: true,
    });
    await this.state.retreive();
    // debugger;
    // await console.log(this.state.counter);
  };
  prevbutton = async () => {
    // debugger;
    // console.log(this.state.counter);

    await this.setState({
      counter: this.state.counter - 1,
      cached: true,
    });

    await this.state.retreive();
  };
  render() {
    return (
      <div>
        <h3>Display Messages</h3>
        <input
          type="text"
          onChange={(e) => {
            this.change(e.target.value, e.target.id);
          }}
          placeholder="enter name"
          id="name"
        ></input>
        <br />
        <br />
        <div>
          <DatePicker
            id="start"
            onChange={(e) => {
              this.change(e, "start");
            }}
            selected={this.state.start}
          />
        </div>
        <br />
        <div>
          <DatePicker
            id="end"
            onChange={(e) => {
              this.change(e, "end");
            }}
            selected={this.state.end}
          />
        </div>
        <br />
        <button onClick={this.retrieveSender}>Sender Messages</button>
        <button onClick={this.retrieveReceiver}>Receiver Messages</button>
        <Messagelist messagelist={this.state.messages} />
        {this.state.counter > 0 ? (
          <button key={1} onClick={this.prevbutton}>
            prev
          </button>
        ) : null}
        {this.state.nextbuttonenable ? (
          <button key={2} onClick={this.nextbutton}>
            next
          </button>
        ) : null}
      </div>
    );
  }
}

export default Messages;
