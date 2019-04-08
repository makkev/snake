import React, { Component } from 'react';
// import './App.css';


class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      snake: [
        { x: 48 ,y: 0 },
        { x: 32 ,y: 0 },
        { x: 16 ,y: 0 },
        { x: 0 ,y: 0 },
      ],
      food: this.randomFoodPos(1, 30, 16),
      vx: 10,
      vy: -10,
      direction: 'RIGHT',
      moving: true,
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.randomFoodPos = this.randomFoodPos.bind(this);
 }



  componentDidMount() {
    const tick = 500;
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
      case 80:
        this.setState({ moving: !this.state.moving})
        break;
      default:
        break;
    }
  }

  randomFoodPos = (min, max, multiple) => {
    return {
      x: (Math.floor(Math.random() * (max - min + 1)) + min) * 16,
      y: (Math.floor(Math.random() * (max - min + 1)) + min) * 16,
    }
  }


  collideWall = (snake, newHead, wallPos) => {
    return (
      newHead.x >= wallPos.x || 
      newHead.y >= wallPos.y ||
      newHead.x < 0 ||
      newHead.y < 0 
    )
  }

  collideSelf = (snake, newHead) => {
    let collision = false;
    snake.forEach(element => {
      if (element.x === newHead.x && element.y === newHead.y) {
        collision = true;
        return;
      }
    });
    return collision;
  }

  eatFood = (food, newHead) => {
    // console.log('food: ', food);
    // console.log('new head:', newHead);
    return (
      newHead.x === food.x &&
      newHead.y === food.y
    );
  }

  move = (state, unit) => {
    const { direction } = state;
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
    // if (this.state.y === 0 && this.state.x >= 320) {
    //   this.setState({ direction: 'DOWN' });
    //   this.down(state, unit);
    // } 
    // if (this.state.x === 320 && this.state.y >= 320) {
    //   this.setState({ direction: 'LEFT' });
    //   this.left(state, unit);
    // }
    // if (this.state.x === 0 && this.state.y >= 320) {
    //   this.setState({ direction: 'UP' });
    //   this.up(state, unit);
    // } 
    // if (this.state.x === 0 && this.state.y === 0) {
    //   this.setState({ direction: 'RIGHT' });
    //   this.right(state, unit);
    // }
    state.moving && this.move(state, unit);
  }

  right = (state, unit) => {
    const { snake } = state;
    const newHead = { x: snake[0].x + unit , y: snake[0].y } // move head
    this.collideSelf(snake, newHead) || this.collideWall(snake, newHead, {x: 480, y: 480}) ?
      this.setState({moving: false})
      :
      this.setState({
        snake: [
          newHead,
          ...snake.slice(0, snake.length - 1), // move body 
        ],
        moving: true,
      })
    if (this.eatFood(state.food, newHead)) {
      this.setState({
        food: this.randomFoodPos(1, 30, 16),
      })
      // food disapears
      // new food
      // body grow 

    }
  }

  left = (state, unit) => {
    const { snake } = state;
    const newHead = { x: snake[0].x - unit , y: snake[0].y } // move head
    this.collideSelf(snake, newHead) || this.collideWall(snake, newHead, {x: 480, y: 480}) ?
      this.setState({moving: false})
      :
      this.setState({
        snake: [
          newHead,
          ...snake.slice(0, snake.length - 1), // move body 
        ],
        moving: true,
      })

    if (this.eatFood(state.food, newHead)) {
      this.setState({
        food: this.randomFoodPos(1, 30, 16),
      })
      // food disapears
      // new food
      // body grow 

    }
  }

  down = (state, unit) => {
    const { snake } = state;
    const newHead = { x: snake[0].x, y: snake[0].y + unit } // move head
    this.collideSelf(snake, newHead) || this.collideWall(snake, newHead, {x: 480, y: 480}) ?
      this.setState({moving: false})
      :
      this.setState({
        snake: [
          newHead,
          ...snake.slice(0, snake.length - 1), // move body 
        ],
        moving: true,
      })
    if (this.eatFood(state.food, newHead)) {
      this.setState({
        food: this.randomFoodPos(1, 30, 16),
      })
      // food disapears
      // new food
      // body grow 

    }
  }

  up = (state, unit) => {
    const { snake } = state;
    const newHead = { x: snake[0].x, y: snake[0].y - unit } // move head
    this.collideSelf(snake, newHead) || this.collideWall(snake, newHead, {x: 480, y: 480}) ?
      this.setState({moving: false})
      :
      this.setState({
        snake: [
          newHead,
          ...snake.slice(0, snake.length - 1), // move body 
        ],
        moving: true,
      })
    if (this.eatFood(state.food, newHead)) {
      this.setState({
        food: this.randomFoodPos(1, 30, 16),
      })
      // food disapears
      // new food
      // body grow 

    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.addEventListener("keydown", this.handleKeyDown, false);
  }


  render() {
    // console.log(this.state.snake);
    let backgroundStyle = {
      width: "480px",
      height: "480px",
      position: "absolute",
      backgroundColor: "black",
      left: 40,
      top: 40,
      // padding: 0,
      margin: 0,
    }

    return (
      <div style={backgroundStyle}>
        {this.state.snake.map(loc => 
          <Snake key={`${loc.x},${loc.y}`} x={loc.x} y={loc.y} />
        )}
        <Food x={this.state.food.x} y={this.state.food.y} />
      </div>
    )
  }
}

const Snake = (props) => {
  const { x, y } = props;
  let snakeStyle = {
    width: "1em",
    height: "1em",
    position: "absolute",
    left: x,
    top: y,
    backgroundColor: "#07ef1a",
  }
  return(<div style={snakeStyle} />);
}

const Food = (props) => {
  const { x, y } = props;
  let foodStyle = {
    width: "1em",
    height: "1em",
    position: "absolute",
    left: x,
    top: y,
    backgroundColor: "#e25214",
  }
  return(<div style={foodStyle} />);
}


class App extends Component {
  render() {
    return (
      <div >
        <Screen />
      </div>
    );
  }
}

export default App;
