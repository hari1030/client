import React, { Component } from "react";

class Messagelist extends Component {
  render() {
    const { messagelist } = this.props;
    var list = null;
    if (messagelist != null) {
      list = messagelist.map((mess, ind) => {
        return <div key={ind}>{mess}</div>;
      });
    }
    return <div>{list}</div>;
  }
}

export default Messagelist;
