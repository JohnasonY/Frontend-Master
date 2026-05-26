import React, { Component } from "react";

import "./Ball.css";
export default class Ball extends Component {
  constructor(props) {
    super(props);
    /**
     * props required:
     * xSpeed: speed in x axis (pixel/sec)
     * ySpeed: speed in y axix (pixel/sec)
     * ballColor: red by default
     */
    this.state = {
      left: this.props.left || 0, // x axis
      top: this.props.top || 0, // y axis
      xSpeed: this.props.xSpeed,
      ySpeed: this.props.ySpeed,
    };

    const duration = 16; // millisecond of updating the ball's position

    setInterval(() => {
      // based on the speed, change left and top
      const xDis = (this.state.xSpeed * duration) / 1000;
      const yDis = (this.state.ySpeed * duration) / 1000;
      let newLeft = this.state.left + xDis;
      let newTop = this.state.top + yDis;
      // ball go outside of the screen in x axis
      if (newLeft <= 0) {
        newLeft = 0;
        this.setState({
          xSpeed: -this.state.xSpeed,
        });
      } else if (newLeft >= document.documentElement.clientWidth - 100) {
        newLeft = document.documentElement.clientWidth - 100;
        this.setState({
          xSpeed: -this.state.xSpeed,
        });
      }

      // ball go outside of the screen in y axis
      if (newTop <= 0) {
        newTop = 0;
        this.setState({
          ySpeed: -this.state.ySpeed,
        });
      } else if (newTop >= document.documentElement.clientHeight - 100) {
        newTop = document.documentElement.clientHeight - 100;
        this.setState({
          ySpeed: -this.state.ySpeed,
        });
      }

      this.setState({
        left: newLeft,
        top: newTop,
      });
    }, duration);
  }
  render() {
    return (
      <div
        className="Ball"
        style={{
          left: this.state.left,
          top: this.state.top,
          background: this.props.ballColor || "#f40",
        }}
      ></div>
    );
  }
}
