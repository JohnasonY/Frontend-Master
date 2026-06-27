import React from "react";
import "./index.css";

export default function BanList({
  header = "Ban List",
  description = "Select an attribute in your listing to ban it",
  banned = {
    amiiboSeries: [],
    character: [],
    gameSeries: [],
    type: [],
  },
  onUnban,
}) {
  return (
    <div className="banList-container">
      <h2 className="header">{header}</h2>
      <p className="description">{description}</p>

      <div className="banned">
        {Object.entries(banned).map(([attributeName, values]) => {
          return values.map((value) => {
            return (
              <button
                className="banned-button"
                key={`${attributeName}-${value}`}
                onClick={() => onUnban(attributeName, value)}
              >
                {value}
              </button>
            );
          });
        })}
      </div>
    </div>
  );
}
