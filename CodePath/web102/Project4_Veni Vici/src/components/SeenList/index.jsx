import React from "react";
import "./index.css";

export default function SeenList({
  header = "What have we seen so far?", //default prop
  seen,
}) {
  return (
    <div className="seenList-container">
      <h2 className="header">{header}</h2>
      <div className="seen">
        {seen && seen.length > 0
          ? seen.map((item, index) => {
              return (
                <li className="item" key={index}>
                  <img
                    className="image"
                    src={item.image}
                    alt={`image ${index}`}
                  />
                  <p className="description">{item.description}</p>
                </li>
              );
            })
          : null}
      </div>
    </div>
  );
}