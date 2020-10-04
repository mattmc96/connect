import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import configureStore from './Store/store'
import Routes from './Routes'
import * as serviceWorker from './serviceWorker'

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <Routes />
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
