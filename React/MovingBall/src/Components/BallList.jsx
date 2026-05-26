import React, { Component } from "react";
import Ball from "./Ball";
import { getRandom } from "../utils";
/**
 * automatically generate a ball in a time interval, all data random
 */
export default class BallList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ballInfos: [],
    };

    const timer = setInterval(() => {
      var newBall = {
        left: getRandom(0, document.documentElement.clientWidth - 100),
        top: getRandom(0, document.documentElement.clientHeight - 100),
        xSpeed: getRandom(50, 500),
        ySpeed: getRandom(50, 500),
        ballColor: `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`,
      };
      this.setState({
        ballInfos: [...this.state.ballInfos, newBall],
      });
      if (this.state.ballInfos.length === 10) {
        clearInterval(timer);
      }
    }, 1000);
  }

  render() {
    const ballList = this.state.ballInfos.map((item, i) => (
      <Ball key={i} {...item} />
    ));
    return <>{ballList}</>;
  }
}
