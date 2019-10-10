import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'

const loggerMid = () => nextDisp => action => {
  console.log(action)
  return nextDisp(action)
}

const store = createStore(reducer, applyMiddleware(
loggerMid ))

export default store
