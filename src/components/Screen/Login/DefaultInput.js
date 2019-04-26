import React, {Component} from 'react';
import { StyleSheet, TextInput, View, Picker} from 'react-native';

const defaultInput = (props)=>{
    let template = null
    switch(props.type){
        case 'textInput':
          template= <TextInput
          underlineColorAndroid = 'transparent'
          {...props}
          style ={[styles.input, props.overrideStyle]}/>
          break;
          case 'picker':
          template= 
                <Picker selectedValue = {props.value} {...props}>
                          
                    {
                        props.options.map((item, i)=>(
                            <Picker.item key={i} label ={item} value={item}/>
                        ))
                    }
                </Picker>
          break
          default:
          return template;
    }
    return template;
}
const styles = StyleSheet.create({
    input:{
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: 'white',
        fontSize: 18,
        marginTop: 10,
        padding: 5,
    }

})

export default  defaultInput