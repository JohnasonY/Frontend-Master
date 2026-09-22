import React from "react";
import "./index.css";

export default function Discover({
  header = "Amiibo Showcase",
  description = "Enjoy a radom Amiibo that you have never seen before",
  currentInfo, // current amiibo info
  onDiscover, // function to be called when discover button is clicked,
  onBan, // function to called when an attribute is clicked
}) {
  return (
    <div className="discover-container">
      <h1 className="header">{header}</h1>
      <p className="description">{description}</p>
      {currentInfo ? (
        <div className="current">
          <h3 className="name">{currentInfo.name}</h3>
          <div className="attributes">
            {Object.entries(currentInfo.attributes).map(([key, value]) => {
              return (
                <button
                  className="attribute"
                  key={key}
                  onClick={() => {
                    onBan(key, value);
                  }}
                >
                  {value}
                </button>
              );
            })}
          </div>
          <img
            className="current-image"
            src={currentInfo.image}
            alt="current Amiibo image"
          />
        </div>
      ) : null}
      <button className="discover" onClick={onDiscover}>
        Discover!
      </button>
    </div>
  );
}
