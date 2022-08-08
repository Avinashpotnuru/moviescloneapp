import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <h1 className="notfound-heading">Lost Your Way?</h1>
    <p className="notfound-para">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link className="notfound-link" to="/">
      <button type="button" className="notfound-button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
