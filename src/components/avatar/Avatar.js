import React, { Component } from "react";

import Initial from "../../images/avatar.png";
import Changed from "../../images/avatar2.png";
import { tips } from "./TipsArray";

// import "./ButtonStyle.css";
import "./TipsStyle.css";
// import "./BoxStyle.css";

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
      tipBox = <h4 className="tips">{randomItem.tip}</h4>;
    } else {
      tipBox = <h4 className="tips">Click the chef for cooking tips!</h4>;
    }

    return (
      <div>
        {tipBox}
        <button>
          <img
            width="120"
            height="150"
            src={imagesPath[imageName]}
            onClick={this.toggleImage}
            alt="avatar"
          />
        </button>
      </div>
    );
  }
}

export default Avatar;
