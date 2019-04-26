
import {Get_Article, Post_Article, Reset_Article} from '../types'
import axios from 'axios'
import {FIREBASEURL} from '../../Utils/misc'

export function getArticle (category){
    let URL = `${FIREBASEURL}/articles.json`
    if(category !== 'All'){
      URL = `${URL}/?orderBy=\"category\"&equalTo=\"${category}\"`
    }
    const request = axios(URL).then(res=>{
        const articles =[]
        for(let key in res.data){
            articles.push({
                ...res.data[key],
                uid: key
            })
        }
        return articles
    })
    return{
        type: Get_Article,
        payload: request
    }
}

export function postArticles(data, token){
    const request =  axios({
        method: 'POST',
        url: 'https://us-central1-sellapp-bbbe2.cloudfunctions.net/storeImage',
        data:{
            image: data.image.base64 //JSON.stringify(
        }
          
    }).then(res=>{
        console.log(res.data)
         axios({
            method: 'POST',
            url: `${FIREBASEURL}/articles.json?auth=${token}`,
            data: {
                category: data.category,
                title: data.title,
                description: data.description,
                price: data.price,
                email: data.email,
                location: data.location,
                image: res.data.imageUrl,
                uid: data.uid
            }
        }).then(res=>{
            return res.data
        })
    })
    
    return{
        type: Post_Article,
        payload: request
    }
}

export function resetArticle(){
    return {
        type: Reset_Article,
        payload: ''
    }
}