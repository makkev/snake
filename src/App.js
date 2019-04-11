import React, { Component } from 'react';
import './App.css';

const KEYCODEDIR = {
  72: 'LEFT',
  37: 'LEFT',
  74: 'DOWN',
  40: 'DOWN',
  75: 'UP',
  38: 'UP',
  76: 'RIGHT',
  39: 'RIGHT',
};


class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      snake: [
        // { x: 48 ,y: 0 },
        { x: 32 ,y: 0 },
        { x: 16 ,y: 0 },
        { x: 0 ,y: 0 },
      ],
      food: this.randomFoodPos(0, 29, 16),
      vx: 10,
      vy: -10,
      direction: 'RIGHT',
      moving: true,
      score: 0,
      gameOver: false,
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.randomFoodPos = this.randomFoodPos.bind(this);
 }



  componentDidMount() {
    const tick = 300;
    this.interval = setInterval(() => this.tick(this.state), tick);
    window.addEventListener("keydown", this.handleKeyDown, true);
  }
  


  handleKeyDown = (e) => {
    const { keyCode } = e;
    if (keyCode in KEYCODEDIR)
      this.setState({ direction: KEYCODEDIR[keyCode]});
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
    const { snake, direction, score } = state;
    const newHeadMove = {
      DOWN: { x: snake[0].x, y: snake[0].y + unit }, // move head
      LEFT: { x: snake[0].x - unit, y: snake[0].y }, // move head
      RIGHT: { x: snake[0].x + unit, y: snake[0].y }, // move head
      UP: { x: snake[0].x, y: snake[0].y - unit }, // move head
    }
    const newHead = newHeadMove[state.direction];
    if (this.eatFood(state.food, newHead)) {
      // snake eats food - new food position, snake grows one unit
      this.setState({
        food: this.randomFoodPos(0, 29, 16),
        snake: [
          newHead,
          ...snake,
        ],
        moving: true,
        score: score + 1,
      })
    } else {
      if (this.collideSelf(snake, newHead) || this.collideWall(snake, newHead, {x: 480, y: 480})) {
        // game over - collision
        this.setState({
          moving: false,
          gameOver: true,
        })
      } else {
        this.setState({
          snake: [
            newHead,
            ...snake.slice(0, snake.length - 1), // move body 
          ],
          moving: true,
        })
      }
    }
  }

  tick = (state) => {
    const unit = 16;
    state.moving && this.move(state, unit);
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
      backgroundColor: "#d7e238",
      left: 40,
      top: 75,
      // padding: 10,
      margin: 0,
      border: "2px solid #727269",
      // borderColor: "#d7e238",
    }

    return (
      <div>
        <div className="screenHead">
          <div className="screenHead1">
            Score: {this.state.score}
          </div>
          <div className="screenHead2">
            &#8592;h
            &#8595;j
            &#8593;k
            &#8594;l
            <div>
              or arrow keys
            </div>
          </div>
        </div>
          {this.state.gameOver &&
            <div className="gameOver">
              Game Over
            </div>
          }
        <div style={backgroundStyle}>
          {this.state.snake.map(loc => 
            <Snake key={`${loc.x},${loc.y}`} x={loc.x} y={loc.y} />
          )}
          <Food x={this.state.food.x} y={this.state.food.y} />
        </div>
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
    // backgroundColor: "#07ef1a",
    backgroundColor: "#727269",
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
    // backgroundColor: "#e25214",
    backgroundColor: "#f79009",
  }
  return(<div style={foodStyle} />);
}


class App extends Component {
  render() {
    return (
      <div className="appContainer">
        <Screen />
      </div>
    );
  }
}

export default App;
