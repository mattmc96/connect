import React from 'react'
import ReactDOM from 'react-dom'
// import { HashRouter } from 'react-router-dom'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import configureStore from './Store/Store'
import Routes from './Routes'
const Router = BrowserRouter

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri="http://localhost:3000/profile"
    >
      <Router>
        <Routes />
      </Router>
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
