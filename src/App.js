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
      direction: '',
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
 }
  componentDidMount() {
    const tick = 1000;
    this.interval = setInterval(() => this.tick(this.state), tick);
    window.addEventListener("keydown", this.handleKeyDown, true);
  }

  handleKeyDown = (e) => {
    switch(e.keyCode) {
      case 37:
        this.setState({ direction: 'LEFT'})
        break;
      case 38:
        this.setState({ direction: 'UP'})
        break;
      case 39:
        this.setState({ direction: 'RIGHT'})
        break;
      case 40:
        this.setState({ direction: 'DOWN'})
        break;
      default:
        break;
    }

  }


  move = (state) => {
    const { direction } = state;
    const unit = 16;
    switch(direction) {
      case 'DOWN':
        this.down(state, unit);
        break;
      case 'LEFT':
        this.left(state, unit);
        break;
      case 'UP':
        this.up(state, unit);
        break;
      case 'RIGHT':
        this.right(state, unit);
        break;
      default:
        break
    }

  }

  tick = (state) => {
    const unit = 16;
    if (this.state.y === 0 && this.state.x >= 320) {
      this.setState({ direction: 'DOWN' });
      this.down(state, unit);
    } 
    if (this.state.x === 320 && this.state.y >= 320) {
      this.setState({ direction: 'LEFT' });
      this.left(state, unit);
    }
    if (this.state.x === 0 && this.state.y >= 320) {
      this.setState({ direction: 'UP' });
      this.up(state, unit);
    } 
    if (this.state.x === 0 && this.state.y === 0) {
      this.setState({ direction: 'RIGHT' });
      this.right(state, unit);
    }
    this.move(state);
  }

  right = (state, unit) => {
    this.setState({
      x: state.x + unit, 
    })
  }

  left = (state, unit) => {
    this.setState({
      x: state.x - unit, 
    })
  }

  down = (state, unit) => {
    this.setState({
      y: state.y + unit,
    })
  }

  up = (state, unit) => {
    this.setState({
      y: state.y - unit,
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
