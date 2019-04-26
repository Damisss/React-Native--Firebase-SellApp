import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';
import LoadTabs from '../loadTabScreen'
import Logo from './Logo/Logo'
import {getOrientation, 
    setOrientation, 
    removeOrientation, 
    platform, 
    getTokens, 
    setTokens} from '../../Utils/misc'
import LinearGradient from 'react-native-linear-gradient'
import { Emitter } from 'react-native-particles'
import LoginPanel from './LoginPanel'
import {connect} from 'react-redux'
import {autoSignIn} from '../../Store/action/user_action'
import {bindActionCreators} from 'redux'


class Login extends Component{
    constructor(props){
        super(props)
        this.state ={
            loading: true,
            orientation: getOrientation(500),
            logoAnimation: false,
            platform: platform()
            
        }
        setOrientation(this.changeOrientation)
        
    }
    changeOrientation = ()=>{
        this.setState({
           orientation: getOrientation(500)
        })
    }
    componentWillUnmount(){
        removeOrientation()
    }
    showLogin = ()=>{
       this.setState({
           logoAnimation: true
       })
    }
    componentDidMount (){
        getTokens(value=>{
            if(value[0][1] === null){
                this.setState({ loading: false})
            }else{
                this.props.autoSignIn(value[1][1]).then(()=>{
                    if(!this.props.User.userData.token){
                       this.setState({ loading: false})
                    }else{
                       setTokens(this.props.User.userData, ()=>{
                           LoadTabs(true)
                       })
                    }
                })
   
               }
        })
    }
    render(){
        if(this.state.loading){
            return( <View style={styles.loading}>
                       <ActivityIndicator/>
                    </View>)
        }else{
        return(
            <LinearGradient colors ={[ '#FF5EDF', '#04C8DE']} style={styles.linear}>
            <Emitter
                  autoStart={true}
                  numberOfParticles={50}
                  interval={200}
                  emissionRate={25}
                  particleLife={30000}
                  direction={-90}
                  spread={150}
                  speed={8}
                  segments={100}
                  width={500}
                  height={500}
                  fromPosition={{ x: 200, y: 200 }}
                  gravity={0.2}
                > 
                <View style={styles.circle}></View>
                </Emitter> 
            <ScrollView>
            <View style={styles.container}>
               <Logo showLogin = {this.showLogin}
               orientation ={this.state.orientation}/>  
               <LoginPanel 
               platform = {this.state.platform}
               show ={this.state.logoAnimation}
               orientation ={this.state.orientation}/>
            </View>
                </ScrollView>
            </LinearGradient>
        )   
    }
}

}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    linear:{
        flex:1,  
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 10/2,
        backgroundColor: 'white'
    },
    loading:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})
function  mapStateToProps (state) {
    return {
        User: state.User
    }
}
function  mapDispatchToProps (dispatch) {
    return bindActionCreators({autoSignIn}, dispatch)
        
    }
export default connect(mapStateToProps, mapDispatchToProps)(Login)