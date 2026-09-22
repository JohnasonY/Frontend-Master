import React, { Component } from "react";
import Pager from "./Pager";

export default class PagerTest extends Component {
  state = {
    current: 3,
    totalData: 100,
    limit: 10,
    panelNumber: 5,
  };

  handlePageChange = (newPage) => {
    this.setState({
      current: newPage,
    });
  };

  render() {
    return (
      <div>
        <Pager {...this.state} onPageChange={this.handlePageChange} />
      </div>
    );
  }
}
