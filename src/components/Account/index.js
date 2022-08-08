import {withRouter, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../Header'

import Footer from '../Footer'

import './index.css'

const Account = props => {
  const removeToken = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="account-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="details-container">
        <div className="account-details-container">
          <h1 className="account-heading">Account</h1>
          <hr className="hr-element" />
          <div className="membership-container">
            <p className="membership">Member ship</p>
            <div className="email-password-container">
              <p className="email">rahul@gmail.com</p>
              <p className="password">Password : ********</p>
            </div>
          </div>
          <hr className="hr-element" />
          <div className="plan-details-container">
            <p className="details">Plan details</p>
            <div className="premium-container">
              <p className="premium">Premium</p>
              <p className="quality">Ultra Hd</p>
            </div>
          </div>
          <hr className="hr-element" />
          <div className="button-container">
            <button
              type="button"
              className="logout-button"
              onClick={removeToken}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="account-footer">
        <Footer />
      </div>
    </div>
  )
}

export default withRouter(Account)
