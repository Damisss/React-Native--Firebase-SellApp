import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const blockItems = (props)=>{
    const itemText = (item)=>(
        <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>
           {item.title}
        </Text>
        <Text style={styles.itemPrice}>
             {item.price} PLN
        </Text>
    </View>

    )
     
    
    const itemImage = (item)=>(
        <View>
            <Image
            resizeMode={'cover'}
            style={styles.itemImage}
            source={{uri: item.image}}/>
           
        </View>
    )
   // 'https://loremflickr.com/320/240/paris,girl/all'
    const block = ({item, i})=>(
        <View style={styles.blockRow}>
            <TouchableOpacity
            onPress={()=> props.itemDetail(item.blockOne)}
            style={{flex:2}}>
                <View style={[styles.itembackground, styles.itemLeft]}>
                  {itemImage(item.blockOne)}
                  {itemText(item.blockOne)}
                </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>props.itemDetail(item.blockTwo)}
            style={{flex:2}}>
                <View style={[styles.itembackground, styles.itemRight]}>
                  {itemImage(item.blockTwo)}
                  {itemText(item.blockTwo)}
                </View>
            </TouchableOpacity>
        
        </View>
    )

    return(
        <View>
          {block(props)}
        </View>
    )
}

const styles = StyleSheet.create({
    blockRow:{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between',
    },
    itemImage:{
        width: '100%',
        height: 200
    },
    itemTextContainer:{
        padding: 10,
        borderLeftWidth:4 ,
        borderLeftColor: '#FF6444',
    },
    itemTitle:{
        fontFamily: 'Roboto-Black',
        color: '#4C4C4C',
        marginBottom: 5
    },
    itemPrice:{
        fontFamily: 'Roboto-Black',
        color: '#00ada9',
        marginBottom: 5
    },
    itembackground:{
        backgroundColor: '#f1f1f1'
    },
    itemLeft:{
        marginRight : 2.5
    },
    itemRight:{
        marginLeft: 2.5
        
    }
     
})

export default blockItems