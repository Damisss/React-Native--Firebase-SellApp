import {combineReducers} from 'redux'
import User from './user_reducer'
import Articles from './article_reducer'
const rootReducer = combineReducers({
    User,
    Articles
})
export default rootReducer