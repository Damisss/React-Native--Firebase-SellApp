import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUserPosts, userPostDelete} from '../../Store/action/user_action'

class UserPost extends Component{
   
   static navigatorButtons ={
     leftButtons: Platform.OS =="ios"? [
        {title: 'Go Back',
        id: 'goBackPressed',
       }
     ]: null
   }
   constructor(props){
       super(props)
       this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
   }
   onNavigatorEvent = (event)=> {
	if (event.id === 'goBackPressed') {
        this.props.navigator.dismissModal({
            animationType: 'slide-down' 
        })
    }
}
state={
    posts: [],
    modal: false
}
componentDidMount(){
    const UID = this.props.User.userData.uid
    this.props.getUserPosts(UID)
}
componentWillReceiveProps(nextProps){
    if(nextProps.User.userPosts){
        this.setState({
            posts: nextProps.User.userPosts
        })
    }
}
showConfirm= (openModal, id)=>{
    this.setState({
        modal: openModal,
        toDelete: id
    })
}
showPosts = (posts)=>{
  return posts?posts.map(item=>(
      <View style={styles.itemWraper} key={item.id}>
          
          <View style ={{ flexDirection: 'row'}}>
          <View>
              <Image source={{uri: item.image}} style={{width: 40, height: 40}}/>
          </View>
          <View style={styles.title}>
              <Text style={{fontFamily: 'Roboto-Black'}}>
                  {item.title}
              </Text>
          </View>
          </View>
          <View style={styles.description}>
             <Text>{item.description}</Text>
              <View style ={{marginTop: 10}}>
              <Text syle= {styles.small}>Price: {item.price} PLN</Text>
              <Text syle= {styles.small}>Category: {item.category}</Text>
              </View>
           </View>
           <View style ={styles.button}>
            <TouchableOpacity onPress={()=>this.showConfirm(true, item.id)}>
                 <Text style={{fontFamily: 'Roboto-Black', 
                                  color: '#F44336', paddingBottom:10 }}>
                                  delete
                 </Text>
            </TouchableOpacity>
           </View>
      </View>
  )):null
}

onDeleteHander = (postId)=>{
    this.props.userPostDelete(postId, this.props.User.userData)
    .then(()=>{
        const UID = this.props.User.userData.uid
          this.props.getUserPosts(UID)
          this.setState({
              modal: false,
              toDelete: ''
          })
    }).catch((err)=> console.log(err))
}
    render(){
        return(
            <ScrollView >
               <View style={styles.container}>
               <View style={{marginBottom: 20}}>
                  <Text>You have {this.state.posts.length}</Text>
               </View>
                 {
                     this.showPosts(this.state.posts)
                 }
               </View>
                <Modal
                animationType = 'fade'
                transparent = {false}
                visible = {this.state.modal}>
                <View style={{padding: 50}}>
                    <Text style={{fontSize: 20}}>
                        Are you sure you want to delete?
                    </Text>
                </View>
                <View style={{marginTop: 50, flexDirection: 'row', justifyContent: 'space-between',}}>
                    <TouchableOpacity onPress={()=>this.onDeleteHander(this.state.toDelete)}>
                        <Text style={styles.deleteButton}>Yes, delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.showConfirm(false, '')}>
                        <Text style={styles.cancelDelete}>No, cancel</Text>
                    </TouchableOpacity>
                </View>

                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      padding: 10
    },
    itemWraper:{
      borderWidth: 1,
      borderColor: '#ececec',
      borderRadius: 2,
      marginBottom: 20,
      //flexDirection: 'row',
    },
    title:{
        borderBottomColor: '#ececec',
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: '#f5f5f5'
    },
    description: {
        padding: 10
    },
    small:{
     fontSize: 12
    },
    button:{
        alignSelf: 'center'
    },
    deleteButton:{
        marginBottom: 20,
        marginLeft: 20,
        color: '#f44336',
        fontSize: 16,
        fontFamily: 'Roboto-Black'
    },
    cancelDelete:{
        marginBottom: 20,
        marginRight: 20,
        color: '#00ADA9',
        fontSize: 16,
        fontFamily: 'Roboto-Black'
    }
})
const  mapStateToProps = (state) => {
    console.log(state)
    return {
        User: state.User
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUserPosts, userPostDelete}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps) (UserPost)