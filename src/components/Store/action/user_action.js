import {Register_User, Sign_User, 
    AutoSign_User, LogOut_User, 
    Get_User_Post,
    Delete_User_Post} from '../types'
import axios from 'axios'
import { SIGNUP, SIGNIN, REFRESH, FIREBASEURL, setTokens } from '../../Utils/misc'
export function signIn (data){
    const request = axios({
        method: 'POST',
        url: SIGNIN,
        data:{
            email: data.email,
            password: data.password,
            returnSecureToken: true
        },
        header:{
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        return res.data
    }).catch( err=>{
       return false
    })
    return{
        type: Sign_User,
        payload: request
    }
}

export function signUp (data){
const request = axios({
    method: 'POST',
    url: SIGNUP,
    data:{
        email: data.email,
        password: data.password,
        returnSecureToken: true
    },
    headers:{
        "Content-Type": "application/json"
    }
}).then(response =>{
    return response.data
}).catch(err=>{
    return false
})
return{
    type: Register_User,
    payload: request
}
}

export function autoSignIn (reftoken){
    const request = axios({
        method: "POST",
        url: REFRESH,
        data: "grant_type=refresh_token&refresh_token=" + reftoken,
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(res=>{
        console.log(res.data)
        return res.data
    }).catch(err=>{
        return false
    })
    return {
        type: AutoSign_User,
        payload: request
    }

} 

export const userLogout =()=>{
   return{
    type: LogOut_User,
    payload: null
   }
}

export const getUserPosts = (UID)=>{
    console.log(UID)
  const request = axios(`https://sellapp-bbbe2.firebaseio.com/articles.json/?orderBy=\"uid\"&equalTo=\"${UID}\"`)
                       .then(response=>{
                           
                           let articles = []
                           for(let key in response.data){
                            articles.push({
                                ...response.data[key],
                                id: key
                            })
                           }
                           console.log(articles)
                           return articles
                       }).catch(err=>console.log(err))
                       return {
                           type: Get_User_Post,
                           payload: request
                       }
}

export const userPostDelete = (postId, userData)=>{
    const promise = new Promise((resolve, reject)=>{
        const URL = `${FIREBASEURL}/articles/${postId}.json`
        const request = axios({
            method: 'delete',
            url: `${URL}?auth=${userData.token}s`,
        }).then(res=>{
            resolve({deletePost: true})
        })
        .catch(err=>{
            const signIn = autoSignIn(userData.reftoken)
            signIn.payload.then(res=>{
                let newToken = {
                uid: res.user_id,
                token: res.id_token,
                reftoken: res.refresh_token
                }
                setTokens(newToken, ()=>{
                    axios({
                        method: 'delete',
                        url: `${URL}?auth=${userData.token}`
                }).then((res)=>{
                    resolve({
                        userData: newToken,
                        deletePost: true
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            })
            })
        })
    })
   return {
       type: Delete_User_Post,
       payload: promise
   }
}