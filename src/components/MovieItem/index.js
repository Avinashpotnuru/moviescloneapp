import {Component} from 'react'

import {Redirect, Link} from 'react-router-dom'

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

class MovieItem extends Component {
  state = {movieObject: {}, api: apiStatus.initial}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({api: apiStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
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

      const updateData = {
        id: data.movie_details.id,
        backdropPath: data.movie_details.backdrop_path,
        adult: data.movie_details.adult,
        budget: data.movie_details.budget,

        genres: data.movie_details.genres,

        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        spokenLanguages: data.movie_details.spoken_languages,
        voteCount: data.movie_details.vote_count,
        voteAverage: data.movie_details.vote_average,
        similarMovies: data.movie_details.similar_movies,
      }

      this.setState({movieObject: updateData, api: apiStatus.success})
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
        className="fail-button"
        onClick={this.getMovieDetails}
      >
        Try Again
      </button>
    </div>
  )

  similarMovie = () => {
    const {movieObject} = this.state

    return (
      <div className="similar-move-card">
        <h1 className="similar-movie-heading">More like this</h1>
        <ul className="similar-movie-list">
          {movieObject.similarMovies.map(n => (
            <li className="movie-list-item" key={n.id}>
              <Link
                to={`/movies/${n.id}`}
                target="_parent"
                className="link-element"
              >
                <img
                  src={n.poster_path}
                  className="similar-movie-img"
                  alt={n.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  successView = () => {
    const {movieObject} = this.state
    const releaseYear = new Date(movieObject.releaseDate)
    const getYear = releaseYear.getFullYear()
    const day = releaseYear.getDate().toString()
    const year = getYear.toString()
    const timeInHours = Math.floor(movieObject.runtime / 60)
    const timeInMinutes = movieObject.runtime % 60
    let date

    if (day.endsWith('3')) {
      date = 'rd'
    } else if (day.endsWith('2')) {
      date = 'nd'
    } else if (day.endsWith('1')) {
      date = 'st'
    } else {
      date = 'th'
    }

    return (
      <div className="main-container">
        <div
          className="movie-item-container"
          style={{
            backgroundImage: `url(${movieObject.backdropPath})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header />
          <div className="description-container">
            <h1 className="name">{movieObject.title}</h1>
            <div className="movie-details">
              <p className="run-time">{`${timeInHours}h ${timeInMinutes}m`}</p>
              <p className="censor">
                {movieObject.adult === true ? 'A' : 'U/A'}
              </p>
              <p className="release-date">{year}</p>
            </div>
            <p className="overview">{movieObject.overview}</p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>

        <div className="movie-info-container">
          <div className="genre-and-languages-container">
            <ul className="genre-list-container">
              <h1 className="genre-heading">Genres</h1>
              {movieObject.genres.map(l => (
                <li key={l.id}>
                  <p className="genre">{l.name}</p>
                </li>
              ))}
            </ul>
            <ul className="audios-available-container">
              <h1 className="audio-header">Audio Available</h1>
              {movieObject.spokenLanguages.map(m => (
                <li key={m.id}>
                  <p className="language">{m.english_name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rating-and-budget-container">
            <div className="rating-container">
              <h1 className="rating-header">Rating Count</h1>
              <p className="vote">{movieObject.voteCount}</p>
              <h1 className="average-rating">Rating Average</h1>
              <p className="average">{movieObject.voteAverage}</p>
            </div>
            <div className="budget-container">
              <h1 className="budget-header">Budget</h1>
              <p className="total-budget">{movieObject.budget}</p>
              <h1 className="release-header">Release Date</h1>
              <p className="date">{`${day}${date} ${releaseYear.getMonth()} ${releaseYear.getFullYear()}`}</p>
            </div>
          </div>
        </div>
        {this.similarMovie()}
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
      <div className="movie-item-container">
        {this.finalRender()}
        <div className="footer">
          <Footer />
        </div>
      </div>
    )
  }
}

export default MovieItem
