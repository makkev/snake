import React, { Component } from 'react';
import logo from './logo.svg';


class Snake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 100,
      y: 175,
    }
 }
  componentDidMount() {
    // this.interval = setInterval(() => this.mv(this.state), 1000);
    this.interval = setInterval(() => this.mv(this.state), 50);
  }
  mv = (state) => {
    this.setState({
      x: state.x + 5,
      y: state.y + 2,
    })
    if (this.state.y < 0 || this.state.y > 320) {
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log(this.state);
    let style = {
      width: "1em",
      height: "1em",
      position: "absolute",
      left: this.state.x,
      top: this.state.y,
      backgroundColor: "red",
    }
    return (
      <div>
        <div style={style}>
        </div>
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div >
        <Snake />
      </div>
    );
  }
}

export default App;
