import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';

class Logo extends Component{
    state={
        animSell: new Animated.Value(0),
        animIt: new Animated.Value(0),
        animOudou: new Animated.Value(0)
    }
    componentWillMount (){
        Animated.parallel([
            Animated.timing(this.state.animSell, {
                toValue: 1,
                duration: 1000,
                easing: Easing.easeOutCubic
            }),
            Animated.timing(this.state.animOudou, {
                toValue: 1,
                duration: 800,
                easing: Easing.easeOutCubic
            }),
            Animated.timing(this.state.animIt, {
                toValue: 1,
                duration: 600,
                easing: Easing.easeOutCubic
            })

        ]).start( ()=>{
            this.props.showLogin()
        })
        
    }
    render(){
        return(
            <View style={
                this.props.orientation === 'portrait' 
                ? styles.portraitStyle 
                : styles.landescapeStyle
            }>
                <Animated.View
                style={{
                    opacity: this.state.animSell,
                    top: this.state.animSell.interpolate({
                        inputRange:[0, 1],
                        outputRange: [100, 0]
                    })
                }}>
                   <Animated.Text
                   style={{
                       fontSize: this.state.animSell.interpolate({
                           inputRange:[0, 1],
                           outputRange: [5, 40]
                       }),
                   }}>
                        <Text style={styles.soug}>Soug</Text>
                   </Animated.Text>
                </Animated.View>
                <Animated.View
                style={{
                    opacity: this.state.animOudou,
                    bottom: this.state.animOudou.interpolate({
                        inputRange:[0, 1],
                        outputRange: [100, 0]
                    })
                }}>
                   <Animated.Text
                   style={{
                       fontSize: this.state.animOudou.interpolate({
                           inputRange:[0, 1],
                           outputRange: [5, 40]
                       }),
                   }}>
                        <Text style={styles.oudou}>ouDou</Text>
                   </Animated.Text>
                </Animated.View>
                <Animated.View
                style={{
                    opacity: this.state.animIt
                }}>
                    <Animated.Text
                   style={{
                       fontSize: this.state.animIt.interpolate({
                           inputRange:[0, 1],
                           outputRange: [5, 40]
                       }),
                   }}>
                        <Text style={styles.mani}>mani</Text>
                    </Animated.Text>
                </Animated.View>
            </View>
        )   
    }
}
const styles = StyleSheet.create({
    portraitStyle:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 50,
        maxHeight: 100
    },
    landescapeStyle:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        maxHeight: 50
    },
    soug:{
        fontFamily: 'RobotoCondensed-Regular',
        color: 'green'
    },
    oudou:{
        fontFamily: 'RobotoCondensed-Regular',
        color: 'yellow' 
    },
    mani:{
        fontFamily: 'RobotoCondensed-Regular',
        color: 'red'
    }

})
export default Logo