import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'

import TrendingSlick from '../TrendingSlick'

import OriginalsSlick from '../OriginalsSlick'

import TopRatedSlick from '../TopRatedSlick'

import Footer from '../Footer'

import './index.css'

const apiStatus = {
  initial: 'initial',
  progress: 'progress',
  success: 'success',
  failure: 'failure',
}

class Home extends Component {
  state = {trendingMovies: [], api: apiStatus.initial}

  componentDidMount() {
    this.getHomeData()
  }

  getHomeData = async () => {
    this.setState({api: apiStatus.progress})
    const url = ' https://apis.ccbp.in/movies-app/originals'
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

      this.setState({trendingMovies: formatData, api: apiStatus.success})
    } else {
      this.setState({api: apiStatus.failure})
    }
  }

  loadingView = () => (
    <div className="loader" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  failureView = () => (
    <div className="home-failure-view">
      <img
        src="https://res.cloudinary.com/drwe3lgdh/image/upload/v1656390948/Background-Complete_ynhv7p.png"
        className="failure-img"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="home-fail-button"
        type="button"
        onClick={this.getHomeData}
      >
        Try Again
      </button>
    </div>
  )

  successView = () => {
    const {trendingMovies} = this.state
    const HeaderItem =
      trendingMovies[Math.floor(Math.random() * trendingMovies.length)]
    const bgImage = HeaderItem.backdropPath

    return (
      <div
        className="success-container"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Header />
        <div className="header-info-container">
          <h1 className="title">{HeaderItem.title}</h1>
          <p className="overview">{HeaderItem.overview}</p>
          <button className="play-button" type="button">
            Play
          </button>
        </div>
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
      <div className="home-container">
        {this.finalRender()}
        <div className="bottom-container">
          <h1 className="head">Trending Now</h1>
          <TrendingSlick />
          <h1 className="head">Top Rated</h1>
          <TopRatedSlick />
          <h1 className="head">Originals</h1>

          <OriginalsSlick />

          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
