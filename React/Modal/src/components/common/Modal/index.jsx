import React from "react";
import "./index.css";

export default function index(props) {
  const defaultProps = {
    modalBG: "rgba(0, 0, 0, 0.5)",
    modalCenterBG: "rgba(255, 255, 255, 1)",
  };

  const mixedInProps = Object.assign({}, defaultProps, props);

  return (
    <div
      className="modal"
      onClick={(e) => {
        if (e.target.className === "modal") {
          mixedInProps.onCloseModal();
        }
      }}
      style={{ background: mixedInProps.modalBG }}
    >
      <div
        className="modal-center"
        style={{ background: mixedInProps.modalCenterBG }}
      >
        {props.children}
      </div>
    </div>
  );
}
