import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
const categoriesIcons = (values)=>{
    let name = ''
    switch(values){
        case 'All':
        name = 'circle-o-notch'
        break
        case 'Sports':
        name = 'soccer-ball-o'
        break
        case 'Music':
        name = 'music'
        break
        case 'Electronics':
        name = 'tv'
        break
        case 'Clothing':
        name = 'shopping-bag'
        break
        default:
        name =''
    }
    return name 
}
class HorizontalScroll extends Component{

   
    generateIcons = (categories)=>(
        categories? categories.map(item=>(
            <View style={{marginRight: 15}} key={item}>
            <Icon.Button
            iconStyle={{marginRight: 15, marginLeft: 3}}
            backgroundColor={
                this.props.categorySelected !== item?'#c1c1c1': '#FF6444'}
            borderRadius={100}
            size={20}
            name={categoriesIcons(item)}
            onPress={()=>this.props.categoryColorHandler(item)}>
                <Text style={{color: '#ffffff', marginRight: 5}}>{item}</Text>
            </Icon.Button> 
            </View>
        )): null
    )
    render(){
        return(
            <ScrollView
            horizontal={true}
            decelarationRate ={0}
            snapToInterval={200}
            showsHorizontalScrollIndicator={false}>
               <View style={styles.scrollContainer}>
                    {this.generateIcons(this.props.categories)}
                </View>
            </ScrollView>
    
        )
    }
}
const styles = StyleSheet.create({
    scrollContainer:{
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        width: '100%'
    }
})
export default HorizontalScroll