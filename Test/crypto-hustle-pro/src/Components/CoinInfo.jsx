import { Link } from "react-router-dom"

const CoinInfo = ({ id, image, name, symbol, price }) => {
  return (
    <li className="main-list" key={id}>
      <Link className="coin-link" to={`/coinDetails/${symbol.toUpperCase()}`}>
        <img
          className="icons"
          src={image}
          alt={`Small icon for ${name} crypto coin`}
        />
        {name} <span className="tab"></span>
        {price != null ? ` $${price} USD` : null}
      </Link>
    </li>
  )
}
 
export default CoinInfo
