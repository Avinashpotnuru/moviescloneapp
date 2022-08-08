import {Component} from 'react'

import {Link} from 'react-router-dom'

import Slider from 'react-slick'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

const apiStatus = {
  initial: 'initial',
  progress: 'progress',
  success: 'success',
  failure: 'failure',
}

class TopRatedSlick extends Component {
  state = {trendingMovies: [], api: apiStatus.initial}

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    this.setState({api: apiStatus.progress})
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
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
    <div className="slick-loader" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  failureView = () => (
    <div className="slick-failure-view">
      <img
        src="https://res.cloudinary.com/drwe3lgdh/image/upload/v1656390948/Background-Complete_ynhv7p.png"
        className="slick-failure-img"
        alt="failure view"
      />
      <p className="slick-failure-para">
        Something went wrong. Please try again
      </p>
      <button
        className="slick-failure-button"
        type="button"
        onClick={this.getTopRatedMovies}
      >
        Try Again
      </button>
    </div>
  )

  successView = () => {
    const {trendingMovies} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <div className="trending-slick-list">
        <Slider {...settings}>
          {trendingMovies.map(each => (
            <div className="trending-slick-item" key={each.id}>
              <Link className="slick-link-element" to={`/movies/${each.id}`}>
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="img-element"
                />
              </Link>
            </div>
          ))}
        </Slider>
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
    return <div>{this.finalRender()}</div>
  }
}

export default TopRatedSlick
