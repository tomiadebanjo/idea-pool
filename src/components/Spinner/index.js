import React from "react";
import "./spinner.scss";

const Spinner = ({ isWhite }) => {
  return (
    <div className={`spinner__container ${isWhite && "spinner--white"}`}>
      <div className={`spinner ${isWhite && "spinner--white"}`}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Spinner;
