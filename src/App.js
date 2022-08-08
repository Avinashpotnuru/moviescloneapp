import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'

import Popular from './components/Popular'

import MovieItem from './components/MovieItem'

import NotFound from './components/NotFound'

import SearchRoute from './components/SearchRoute'

import Account from './components/Account'

import Home from './components/Home'

import './App.css'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/movies/:id" component={MovieItem} />
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={SearchRoute} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/popular" component={Popular} />
      <NotFound />
    </Switch>
  </div>
)
export default App
