import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMessage: ''}

  enterUserName = event => {
    this.setState({username: event.target.value})
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  success = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  failure = errorMessage => {
    this.setState({showError: true, errorMessage})
  }

  submitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMessage, showError} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <img
          src="https://res.cloudinary.com/drwe3lgdh/image/upload/v1656292333/Group_7399_csyagi.png"
          className="logo"
          alt="login website logo"
        />
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.submitUserDetails}>
            <h1 className="heading">Login</h1>
            <div className="username-container">
              <label htmlFor="username" className="label-element">
                USERNAME
              </label>
              <input
                value={username}
                type="text"
                id="username"
                className="input-container"
                onChange={this.enterUserName}
              />
            </div>
            <div className="password-container">
              <label htmlFor="password" className="label-element">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                id="password"
                className="input-container"
                onChange={this.enterPassword}
              />
            </div>
            {showError && <p className="error">{errorMessage}</p>}
            <button type="submit" className="login-button" testid="logIn">
              Login
            </button>
            <button type="submit" testid="signIn" className="sign-in-button">
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
