import {Dimensions,
     Platform,
    AsyncStorage} from 'react-native'

export const getOrientation = (value) => {
    return Dimensions.get('window').height >value ? 'portrait': 'landscape'
}
export const setOrientation = (cb)=>{
    return Dimensions.addEventListener('change', cb)
}
export const removeOrientation = ()=>{
    return Dimensions.removeEventListener('change')
}
export const platform = ()=>{
    if(Platform.OS === 'android'){
        return 'android'
    } else{
        return 'ios'
    }
}
export const APIKEY= ""
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`
export const SIGNIN= `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`
export const FIREBASEURL = `https://sellapp-bbbe2.firebaseio.com`
export const getTokens = (cb)=>{
    AsyncStorage.multiGet([
        '@sellApp@token', 
        '@sellApp@refTtoken', 
        '@sellApp@uid', 
        '@sellApp@tokenexpire'
    ]).then(values=>{
      cb(values)
    })
}
export const  setTokens =(values, cb)=>{
 const dateNow =  new Date()
 const expiration = dateNow.getTime() + (3600 * 1000)
 AsyncStorage.multiSet([
     ['@sellApp@token', values.token],
     ['@sellApp@refTtoken', values.reftoken],
     ['@sellApp@uid', values.uid],
     ['@sellApp@tokenexpire', expiration.toString()]
 ]).then(res=>{
     cb()
 })
}
export const navigatorDrawer = (event, $this)=>{
    if(event.type === "NavBarButtonPress"){
        if(event.id === 'drawer'){
           $this.props.navigator.toggleDrawer({
               side: 'right',
               animated: true
           })
        }
    }
}
export const navigatorDeepLink = (event, $this)=>{
    if(event.type === 'DeepLink'){
       $this.props.navigator.toggleDrawer({
        side: 'right',
        animated: true
       
    })
      if(event.payload.typeLink === 'tab'){
        $this.props.navigator.switchToTab({
          tabIndex: event.payload.indexLink
        })
        }else{
            $this.props.navigator.showModal({
                screen: event.link,
                animationType: 'slide-horizontal',
                navigatorStyle:{
                    navBarBackgroundColor:'#00ADA9',
                    screenBackgroundColor: '#ffffff'
                },
                backButtonHidden: false

            })
      }
    }
}

export const logOut = (cb)=>{
 AsyncStorage.multiRemove([
    '@sellApp@token', 
    '@sellApp@refTtoken', 
    '@sellApp@userID', 
    '@sellApp@tokenexpire'

 ]).then(()=>{
     cb()
 })
}
export const gridTwoColumns = (list)=>{
    let newArticles = []
    let articles = list
    let count = 1
    let vessel ={}
    if(articles){
        articles.forEach(element=>{
            if(count === 1){
                vessel['blockOne'] = element
                count++
            }else{
                vessel['blockTwo'] = element
                newArticles.push(vessel)
                count = 1
                vessel={}
            }
        })
    }
   return newArticles
}

export const longitudeDelta = ()=>{
   return  Dimensions.get('window').width/Dimensions.get('window').height * 0.0122
}