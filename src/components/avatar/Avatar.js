import React, { Component } from "react";

import Initial from "../../images/avatar.png";
import Changed from "../../images/avatar2.png";
import { tips } from "./TipsArray";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const imagesPath = {
  clicked: Changed,
  notClicked: Initial,
};

class Avatar extends Component {
  state = {
    status: false,
  };

  toggleImage = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  getImageName = () => (this.state.open ? "clicked" : "notClicked");

  render() {
    const imageName = this.getImageName();

    var randomItem = tips[Math.floor(Math.random() * tips.length)];
    let tipBox;
    if (this.state.open) {
      tipBox = (
        <Box border={2} borderColor="primary.main" borderRadius={8} p={1}>
          <Typography display="block" gutterBottom>
            {randomItem}
          </Typography>
        </Box>
      );
    } else {
      tipBox = (
        <Box border={2} borderColor="primary.main" borderRadius={8} p={1}>
          <Typography variant="button" display="block" gutterBottom>
            Click the chef for cooking tips!
          </Typography>
        </Box>
      );
    }

    return (
      <div>
        {tipBox}
        <Button>
          <img
            width="120"
            height="150"
            src={imagesPath[imageName]}
            onClick={this.toggleImage}
            alt="avatar"
          />
        </Button>
      </div>
    );
  }
}

export default Avatar;
