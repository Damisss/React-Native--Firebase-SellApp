import {createStore, compose, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise'
import Reducer from './reducers/index'
let reduxCompose = compose

if(__DEV__){
    reduxCompose= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose
}
const configStore = ()=>{
    return createStore(Reducer, reduxCompose(applyMiddleware(promiseMiddleware)))
}
export default configStore