import {Component} from 'react'

import {Link, Redirect} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'

import Footer from '../Footer'

import './index.css'

const apiStatus = {
  initial: 'initial',
  progress: 'progress',
  success: 'success',
  failure: 'failure',
}

class Popular extends Component {
  state = {popularMovies: [], api: apiStatus.initial}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({api: apiStatus.progress})
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
        onClick={this.getPopularMovies}
      >
        Try Again
      </button>
    </div>
  )

  successView = () => {
    const {popularMovies} = this.state
    return (
      <div className="popular-success-container">
        <ul className="popular-movies-list-container">
          {popularMovies.map(i => (
            <li className="popular-movies-list-item" key={i.id}>
              <Link className="link-element" to={`/movies/${i.id}`}>
                <img src={i.posterPath} alt={i.title} className="movie-img" />
              </Link>
            </li>
          ))}
        </ul>
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

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="popular-container">
        <Header />
        {this.finalRender()}
        <div className="footer">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Popular
