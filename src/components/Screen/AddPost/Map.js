import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView from 'react-native-maps'
import {longitudeDelta} from '../../Utils/misc'
class Map extends Component {
    state ={
        initLocation:{
            latitude: 50.049683, 
            longitude: 19.944544,
            latitudeDelta: 0.0122,
            longitudeDelta:  longitudeDelta()
        }, 
        locationMarker: false
    }

    pickLocation = event =>{
        const coords = event.nativeEvent.coordinate
        this.map.animateToRegion({
           ...this.state.initLocation,
           latitude: coords.latitude, 
           longitude: coords.longitude,
    
        })
         this.setState(prevState=>{
             return {
                 initLocation:{
                     ...prevState.initLocation,
                     latitude: coords.latitude, 
                     longitude: coords.longitude,
                 },
                 locationMarker: true
             }
         })
         this.props.userLocation({
            latitude: coords.latitude, 
            longitude: coords.longitude,
         })
    }
    onLocationSelectHander = ()=>{
        navigator.geolocation.getCurrentPosition(post=>{
            const coordEvent =  {
                nativeEvent:{
                    coordinate:{
                      latitude: post.coords.latitude, 
                      longitude: post.coords.longitude,
                    }
                }
            }
            this.pickLocation(coordEvent)
        }, err=>{
            alert('something went wrong please choose manually')
        })
        
      }
      componentWillReceiveProps(nextProp){
        if(nextProp.onReset){
            this.setState(prevState=>{
                return{
                    ...prevState,
                    initLocation:{
                        latitude: 50.049683, 
                        longitude: 19.944544,
                        latitudeDelta: 0.0122,
                        longitudeDelta:  longitudeDelta()
                    },
                    locationMarker: false
                }
                
            })
        }
    }
    
    render() {
        let marker = null
        if(this.state.locationMarker){
            marker= <MapView.Marker coordinate={this.state.initLocation}/>
        }
        return (
        <View>
                <MapView 
                initialRegion={this.state.initLocation}
                region={this.state.initLocation}
                style={styles.map}
                onPress={this.pickLocation}
                ref={ref=>this.map = ref}>
                 {marker}
         </MapView>
          <View>
              <Button 
              title= 'Select User location' 
              onPress={this.onLocationSelectHander}/>
          </View>
    </View>
        );
    }
}

const styles = StyleSheet.create({
    map:{
        width: '100%',
        height: 250
    }
});

export default Map;
