import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import logger from 'redux-logger'

import { remindersMiddlewares } from './middlewares'
import * as reducers from './ducks'

export const initialState = {
  calendar: {
    date: new Date(),
    selectedDay: new Date(),
  },
  reminders: [],
}

const configureStore = (preloadedState = initialState) => {
  const middlewares = [logger, ...remindersMiddlewares]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)

  const rootReducer = combineReducers(reducers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./ducks', () => store.replaceReducer(rootReducer))
  }

  return store
}

export default configureStore
