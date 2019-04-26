import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import App from '../../../../App'
import {navigatorDrawer} from '../../Utils/misc'

class  NotAllow extends Component{
    constructor(props){
        super(props)
        this.props.navigator.setOnNavigatorEvent(event=>{
            navigatorDrawer(event, this)
        })
    }
    render(){
        return(
            <View style = {styles.container}>
              
              <Text style={styles.text}>Please login or register</Text>
              <Icon name = 'frown-o' size={60} color = 'red'/>
              <Icon.Button 
              name='sign-in'
              size={30}
              backgroundColor='#00ADA9'
              onPress={()=>App()}>
                  <Text style={[styles.text, {color: '#ffffff'}]}>Login/Register</Text>
              </Icon.Button>
         </View>
        )
        
    }
   
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 20,
        fontFamily: 'Roboto-Black',
    }
    
})
export default NotAllow