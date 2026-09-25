import React from "react";

export default function CoinInfo({ id, image, name, symbol, price }) {
  return (
    <div>
      {price ? ( // rendering only if API call actually returned us data
        <li className="main-list" key={id}>
          <div className="coin-row">
            <img
              src={image}
              alt={`Small icon for ${name} crypto coin`}
              className="icons"
            />
            <span className="coin-name">{name}</span>
          </div>
          <span className="tab"></span>
          <div>{price != null ? ` $${price} USD` : null}</div>
        </li>
      ) : null}
    </div>
  );
}
