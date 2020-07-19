import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";

import { tips } from "./avatar/TipsArray";

class AddTips extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    tips.push(this.state.value);
    alert("Your tip was added successfully!");
    event.target.reset();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          onChange={this.handleChange}
          id="outlined-secondary"
          label="Submit your tips here!"
          variant="outlined"
          color="primary"
        />
      </form>
    );
  }
}

export default AddTips;
