import React from "react";

const CoinInfo = ({ id, image, name, symbol, price }) => {
  return (
    <div>
      {price ? ( // rendering only if API call actually returned us data
        <li className="main-list" key={id}>
            <img className="icons" src={image} alt={`Small icon for ${name} crypto coin`} />
            {name}
            {price != null ? `$${price}` : null}
        </li>
      ) : null}
    </div>
  );
};

export default CoinInfo;
