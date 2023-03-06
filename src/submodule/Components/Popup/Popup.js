import React from "react";
import Button from "../Button/Button";
import "./Popup.scss";
export default function Popup({ msg, action }) {
  return (
    <div className="popup-container">
      <h2>{msg}</h2>
      <div onClick={()=>action(false)}>
      <Button  type="Done" />
      </div>
    </div>
  );
}
