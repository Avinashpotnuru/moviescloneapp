import {Component} from 'react'

import {Link, Redirect} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

const apiStatus = {
  initial: 'initial',
  progress: 'progress',
  success: 'success',
  failure: 'failure',
}

class SearchRoute extends Component {
  state = {popularMovies: [], api: apiStatus.initial, searchInput: ''}

  componentDidMount() {
    this.getSearchResults()
  }

  getSearchResults = async () => {
    this.setState({api: apiStatus.progress})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({popularMovies: formatData, api: apiStatus.success})
    } else {
      this.setState({api: apiStatus.failure})
    }
  }

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/drwe3lgdh/image/upload/v1656390948/Background-Complete_ynhv7p.png"
        className="fail-img"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-button"
        onClick={this.getSearchResults}
      >
        Try Again
      </button>
    </div>
  )

  successView = () => {
    const {popularMovies, searchInput} = this.state
    return (
      <div className="popular-success-container">
        {popularMovies.length > 0 ? (
          <div>
            <ul className="search-movies-list-container">
              {popularMovies.map(i => (
                <li className="popular-movies-list-item" key={i.id}>
                  <Link className="slick-link-element" to={`/movies/${i.id}`}>
                    <img
                      src={i.posterPath}
                      alt={i.title}
                      className="movie-img"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="no-search-results">
            <img
              src="https://res.cloudinary.com/drwe3lgdh/image/upload/v1656381078/Group_7394_qrigy1.png"
              alt="no movies"
              className="no-search-results-image"
            />
            <p className="no-search-results-para">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        )}
      </div>
    )
  }

  finalRender = () => {
    const {api} = this.state
    switch (api) {
      case apiStatus.progress:
        return this.loadingView()
      case apiStatus.success:
        return this.successView()
      case apiStatus.failure:
        return this.failureView()
      default:
        return null
    }
  }

  searchElement = event => {
    this.setState({searchInput: event.target.value})
  }

  findSearchElement = event => {
    if (event.key === 'Enter') {
      this.getSearchResults()
    }
  }

  render() {
    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="popular-container">
        <nav className="header-element">
          <div className="logo-container">
            <Link to="/" className="link-el">
              <img
                src="https://res.cloudinary.com/drwe3lgdh/image/upload/v1656292333/Group_7399_csyagi.png"
                className="movies"
                alt="website logo"
              />
            </Link>
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
            <div className="search-input-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.searchElement}
                onKeyDown={this.findSearchElement}
              />
              <button
                type="button"
                className="search-button"
                testid="searchButton"
                onClick={this.getSearchResults}
              >
                <HiOutlineSearch className="search-icon" />
              </button>
            </div>
            <Link className="link-element" to="/account">
              <img
                src="https://res.cloudinary.com/drwe3lgdh/image/upload/v1656293053/Avatar_szfesy.png"
                className="person"
                alt="profile"
              />
            </Link>
          </div>
        </nav>
        {this.finalRender()}
      </div>
    )
  }
}

export default SearchRoute
