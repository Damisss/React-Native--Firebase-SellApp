
import React, { Component } from 'react';
import { View, Text, StyleSheet , Image, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker'

class PickImage extends Component {
    state={
        pickImage: null,
        finish: false
    }
    imagePickerHandler = ()=>{
        ImagePicker.showImagePicker({title: 'Add Image'}, (res)=>{
           if(res.didCancel){
               console.log('User cancel')
           }else if(res.error){
               console,log(res.error)
           }else{
               this.setState({
                   pickImage: {uri: res.uri},
               }),
               this.props.imagePicked({uri: res.uri, base64: res.data})
           }
        })
    }
    componentWillReceiveProps(nextProp){
        if(nextProp.onReset){
            this.setState(prevState=>{
               return{
                  ...prevState,
                  pickImage: null,
               } 
            })
        }
      
    }
    
   
    render() {
        return (
            <View style={styles.container}>
               <View style={styles.image}>
                  <Image source={this.state.pickImage} style={styles.imageStyle} resizeMode={"cover"}/>
               </View>
                <Button title= 'Add an image' onPress={ this.imagePickerHandler}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image:{
        width: '100%',
        height: 200,
        backgroundColor: '#f2f2f2',
        marginTop: 20
    },
    imageStyle:{
        width: '100%',
        height: '100%'
    }
});

//make this component available to the app
export default PickImage;
