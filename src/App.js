import React, { Component } from 'react';
import logo from './logo.svg';


class Snake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      vx: 10,
      vy: -10,
      dir: '',
    }
 }
  componentDidMount() {
    this.interval = setInterval(() => this.mv(this.state), 1000);
    
    const tick = 1000;
    // this.interval = setInterval(() => this.mv(this.state, Math.random() + 1), tick);
    this.interval = setInterval(() => this.tick(this.state), tick);
  }

  mv = (state, randomNumber) => {
    // this.setState({
    //   x: state.x + (state.vx * randomNumber),
    //   y: state.y + (state.vy * randomNumber),
    // })
    // if (this.state.y < 0 || this.state.y > 320) {
    //   this.setState({
    //     vx: state.vx * 1,
    //     vy: state.vy * -1,
    //   })
    // }
  }

  tick = (state) => {
    if (this.state.y === 0 && this.state.x >= 320) {
      this.setState({ dir: 'DOWN' });
      this.down(state);
    } 
    if (this.state.x === 320 && this.state.y >= 320) {
      this.setState({ dir: 'LEFT' });
      this.left(state);
    }
    if (this.state.x === 0 && this.state.y >= 320) {
      this.setState({ dir: 'UP' });
      this.up(state);
    } 
    if (this.state.x === 0 && this.state.y === 0) {
      this.setState({ dir: 'RIGHT' });
      this.right(state);
    }


    if (this.state.dir === 'DOWN')
      this.down(state);
    if (this.state.dir === 'LEFT')
      this.left(state);
    if (this.state.dir === 'UP')
      this.up(state);
    if (this.state.dir === 'RIGHT')
      this.right(state);

  }

  right = (state) => {
    this.setState({
      x: state.x + 16, 
    })
  }

  left = (state) => {
    this.setState({
      x: state.x - 16, 
    })
  }

  down = (state) => {
    this.setState({
      y: state.y + 16,
    })
  }

  up = (state) => {
    this.setState({
      y: state.y - 16,
    })
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
      backgroundColor: "orange",
    }
    let backgroundStyle = {
      width: "336px",
      height: "336px",
      position: "absolute",
      backgroundColor: "black",
      left: 40,
      top: 40,
      // padding: 0,
      margin: 0,
    }

    return (
      <div style={backgroundStyle}>
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
