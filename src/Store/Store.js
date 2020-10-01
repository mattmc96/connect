import { createStore, applyMiddleware } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import calReducer from './Reducers/Cal.Reducer'

export default createStore(calReducer, applyMiddleware(thunk))
