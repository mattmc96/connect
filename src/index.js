import React from 'react'
import ReactDOM from 'react-dom'
// import { HashRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './Store/store'
import Routes from './Routes'
import * as serviceWorker from './serviceWorker'
import './index.css'

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
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
