import { Register_User, Sign_User,
    AutoSign_User, LogOut_User, 
    Get_User_Post, Delete_User_Post} from '../types'
export default function (state={}, action ){
   switch(action.type){
      case Sign_User: 
     return{
        ...state,
        userData:{
         uid: action.payload.localId || false,
         token: action.payload.idToken  || false,
         reftoken: action.payload.refreshToken || false
      }
     }
     break
     case Register_User:
     return {
        ...state,
        userData:{
           uid: action.payload.localId || false,
           token: action.payload.idToken  || false,
           reftoken: action.payload.refreshToken || false
        }
     }
     break
     case AutoSign_User:
     return{
      ...state,
      userData:{
         uid: action.payload.user_id || false,
         token: action.payload.id_token  || false,
         reftoken: action.payload.refresh_token || false
     }
   }
     break
     case LogOut_User:
     return{
        ...state,
        userData: null
     }
     case Get_User_Post:
     return{
        ...state,
        userPosts: action.payload
     }
     case Delete_User_Post:
     return{
        ...state, ...action.deletePost
     }
    default:
    return state
   }
}