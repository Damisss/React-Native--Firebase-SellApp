import {Get_Article, Post_Article, Reset_Article} from '../types'
export default function (state={}, action){
    switch(action.type){
    case Get_Article:
    return {
        ...state,
        list: action.payload
    }
     
     case Post_Article:
     return{
         ...state,
         Article: action.payload
     }
     case Reset_Article: 
     return {
        ...state,
        Article: action.payload
     }
      default :
      return state

    }
}