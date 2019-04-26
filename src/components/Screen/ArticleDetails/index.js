import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import MapView from 'react-native-maps'
import {longitudeDelta} from '../../Utils/misc'
const articleDetails = (props)=>{
    const articleImage = ()=>(
        <View style={{position:'relative'}}> 
            <Image style={styles.articleImage}
            resizeMode={'cover'}
            source = {{uri: props.articleData.image}}
            />
            <Text style={styles.price}>
                {props.articleData.price}
            </Text>
        </View>
    )
    const articleText = ()=>(
        <View>
            <Text style={styles.articleTitle}>
                {props.articleData.title}
            </Text>
            <Text style={styles.articleDescription}>
                {props.articleData.description}
            </Text>
        </View>
    )
    const ownerInfo = ()=>(
        <View style={styles.ownerInfo}>
           <Text>Contact the owner of this article to the following mail: </Text>
           <Icon.Button
           name = 'envelope-o'
           color= '#00ADA9'
           backgroundColor= '#ffffff'
           onPress={()=>openEmail()}>
               <Text style={{fontSize: 20}}>
                   {props.articleData.email}
               </Text>
           </Icon.Button>
        </View>
    )
    const openEmail = ()=>{
        Linking.openURL(`mailto://${props.articleData.email} &subject=Regarding ${props.articleData.title}`)
    }
    return(
            <ScrollView style={styles.articleContainer}>
                {articleImage()}
                {articleText()}
                {ownerInfo()}
                <MapView initialRegion={{latitude: props.articleData.location.latitude,
                                         longitude: props.articleData.location.longitude,
                                         latitudeDelta: 0.0122,
                                         longitudeDelta: longitudeDelta() }} style={styles.map}>
                    <MapView.Marker coordinate={props.articleData.location}/>
                </MapView>
            </ScrollView>
    )
}
const styles = StyleSheet.create({
    articleContainer:{
        padding: 10
    },
    articleImage:{
        width: '100%',
        height:200
    },
    price:{
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#ff6444',
        padding: 10,
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Roboto-Black',
       
    },
    articleTitle:{
        fontSize: 30,
        fontFamily: 'Roboto-Black',
        color: '#474143',
        marginTop: 20,

    },
    articleDescription:{
        marginTop: 20,
        fontSize: 18

    },
    ownerInfo:{
        paddingTop: 10,
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: 'lightgrey',

    },
    map:{
        marginTop: 10,
        width: '100%',
        height: 150
    }
})
export default articleDetails