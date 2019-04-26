import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Animated, Image} from 'react-native';
import Logo from '../../../assets/images/Logo1.jpg'
import LoginForm from './LoginForm'
class LoginPanel extends Component{
    state={
        animFinish: false,
        logo: new Animated.Value(0),
        form: new Animated.Value(0)
    }
    componentWillReceiveProps (nextProps){
        if(nextProps.show === true && this.state.animFinish === false){
            Animated.parallel([
                Animated.timing(this.state.logo, {
                    toValue: 1,
                    duration: 1000
                }),
                Animated.timing(this.state.form, {
                    toValue: 1,
                    duration: 1500
                })
            ]).start(
                this.setState({
                    animFinish: true
                })
            )
        }

    }
    render(){
        return(
            
            <View >
                <Animated.View
                styles={{
                    opacity: this.state.logo
                }}>
                   <Image style={this.props.orientation === 'portrait'?
                   styles.imageProtrait: styles.imageLandscape}
                   source={Logo} resizeMode={'contain'}/>
                </Animated.View>
                <Animated.View
                style={{
                    opacity: this.state.form,
                    top: this.state.form.interpolate({
                        inputRange:[0, 1],
                        outputRange:[100, 30]
                    })
                }}>
                    <LoginForm
                    platform ={this.props.platform}/>
                </Animated.View>
             
            </View>
        )
    }
}
const styles = StyleSheet.create({
    imageProtrait:{
        width: 270,
        height: 150
    },
    imageLandscape:{
        width: 270,
        height: 0
    }
})
export default LoginPanel