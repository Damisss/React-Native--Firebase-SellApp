import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {logOut} from '../../Utils/misc'
import {userLogout} from '../../Store/action/user_action'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import App from '../../../../App'

class Sidedrawer extends Component{
    state={
        buttons:[
            {   value: 'Home',
                iconName: 'search',
                shouldGoTo: 'example.Home',
                typeLink: 'tab',
                index: 0,
                privacy: false
            },
            {
                value: 'Sell',
                iconName: 'dollar',
                shouldGoTo: 'example.AddPost',
                typeLink: 'tab',
                index: 1,
                privacy: false
            },
            {
                value: 'My post',
                iconName: 'th-list',
                shouldGoTo: 'example.UserPost',
                typeLink: 'view',
                index: null,
                privacy: true
            }
        ]
    }
    signout = ()=>{
        logOut(()=>App())
            this.props.userLogout()
    }
    button = button=>(
        <Icon.Button
        key={button.value}
        name={button.iconName}
        backgroundColor='#474143'
        iconStyle ={{width: 15}}
        color= '#ffffff'
        size={18}
        onPress={()=>{
            this.props.navigator.handleDeepLink({
                link: button.shouldGoTo,
                payload:{
                    typeLink: button.typeLink,
                    indexLink: button.index
                }
            })
        }}>
            <Text style={styles.buttonText}>{button.value}</Text>
        </Icon.Button>
    )
    showButtons = (buttons)=>(
        buttons.map(button=>(
           !button.privacy? 
           this.button(button)
           : this.props.User.userData?
           this.button(button): null
        ))
    )
    render(){
        return(
           <View style={styles.container}>
               <View style={styles.buttonContainer}>
                  {this.showButtons(this.state.buttons)}
                  <Button title='logout'onPress={this.signout}/>

               </View>
           </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#474142'
    },
    buttonContainer:{
        padding: 10,
        marginTop: 20,
    },
    buttonText:{
        fontFamily: 'Roboto-Regular',
        color: '#ffffff',
        fontSize: 13,
    }
})
function  mapStateToProps (state){
    console.log(state)
    return {
        User: state.User
    }
}
function  mapDispatchToProps (dispatch){
    return bindActionCreators({userLogout}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps) (Sidedrawer)