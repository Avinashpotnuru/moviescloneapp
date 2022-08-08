import {Component} from 'react'

import {Link} from 'react-router-dom'

import {CgPlayList} from 'react-icons/cg'
import {RiCloseCircleLine} from 'react-icons/ri'

import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

class Header extends Component {
  state = {showRoutingSection: false}

  showBottomBar = () => {
    this.setState(prevState => ({
      showRoutingSection: !prevState.showRoutingSection,
    }))
  }

  render() {
    const {showRoutingSection} = this.state
    return (
      <div>
        <nav className="header-element">
          <div className="logo-container">
            <div className="top-section">
              <Link to="/" className="link-el">
                <img
                  src="https://res.cloudinary.com/drwe3lgdh/image/upload/v1656292333/Group_7399_csyagi.png"
                  className="movies"
                  alt="website logo"
                />
              </Link>
            </div>
            <ul className="categories-list">
              <li className="category">
                <Link className="link-element" to="/">
                  Home
                </Link>
              </li>
              <li className="category">
                <Link className="link-element" to="/popular">
                  Popular
                </Link>
              </li>
            </ul>
          </div>
          <div className="profile-container">
            <Link className="link-element" to="/search">
              <button
                type="button"
                className="search-button"
                testid="searchButton"
              >
                <HiOutlineSearch className="search-icon" />
              </button>
            </Link>
            <div className="account-container">
              <Link className="link-element" to="/account">
                <img
                  src="https://res.cloudinary.com/drwe3lgdh/image/upload/v1656293053/Avatar_szfesy.png"
                  className="person"
                  alt="profile"
                />
              </Link>
            </div>
            <div className="play-icon-container">
              <div>
                <Link className="link-element" to="/search">
                  <button
                    className="button"
                    type="button"
                    testid="searchButton"
                  >
                    <HiOutlineSearch className="hi-search" />
                  </button>
                </Link>
              </div>
              <button className="play" type="button">
                <CgPlayList
                  className="cg-play-icon"
                  onClick={this.showBottomBar}
                />
              </button>
            </div>
          </div>
        </nav>
        <div>
          {showRoutingSection === true ? (
            <div className="header-bottom-container">
              <ul className="routing-container">
                <li className="category">
                  <Link className="link-element" to="/">
                    Home
                  </Link>
                </li>
                <li className="category">
                  <Link className="link-element" to="/popular">
                    Popular
                  </Link>
                </li>
                <li className="category">
                  <Link className="link-element" to="/account">
                    Account
                  </Link>
                </li>
              </ul>
              <button className="close-button" type="button">
                <RiCloseCircleLine
                  className="cg-close-icon"
                  onClick={this.showBottomBar}
                />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

export default Header
