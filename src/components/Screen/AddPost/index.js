import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, 
    Button, KeyboardAvoidingView, Modal} from 'react-native';
import {navigatorDrawer, 
    getTokens, 
    setTokens} from '../../Utils/misc'
import DefaultInput from '../Login/DefaultInput'
import Validation from '../../Utils/Form/validation'
import {Navigator} from 'react-native-navigation'
import MapView from './Map'
import PickImage from './PickImage';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import {postArticles, resetArticle} from '../../Store/action/article_action'
import {autoSignIn} from '../../Store/action/user_action'
class AddPost extends Component{
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(event=>{
            
            navigatorDrawer(event, this)

        });
    }
    
    state = {
        reset: false,
        isLoading: false,
        hasError: false,
        errorArray: [],
        modalSuccess: false,
        modalVisible: false,
        form:{
            category:{
                value: '',
                name: 'category',
                valid: false,
                type: 'picker',
                options: ['Select a category', 'Sports', 'Music', 'Electronics', 'Electronics', 'Clothing'],
                validationRule:{
                    isRequired: true,
                },
                ErrorMsg:'The category is not selected'
            },
            title:{
                value: '',
                name: 'title',
                valid: false,
                type: 'textInput',
                validationRule:{
                    isRequired: true,
                    maxLength: 50
                },
                ErrorMsg:'The title must be 50 characters or less'
            },
            description:{
                value: '',
                name: 'description',
                valid: false,
                type: 'textInput',
                validationRule:{
                    isRequired: true,
                    maxLength: 200
                },
                ErrorMsg:'The description must be 200 characters or less'
            },
            price:{
                value: '',
                name: 'price',
                valid: false,
                type: 'textInput',
                validationRule:{
                    isRequired: true,
                    maxLength: 6
                },
                ErrorMsg:'The price must be 200 digits or less'
            },
            email:{
                value: '',
                name: 'email',
                valid: false,
                type: 'textInput',
                validationRule:{
                    isRequired: true,
                    isEmail: true
                },
                ErrorMsg:'Invalid email'
            },
            location:{
                value: null,
                valid: false,
                ErrorMsg:'Please use a location'
            },
            image:{
                value: null,
                valid: false,
                ErrorMsg:'Please add an image'
            }
        }
    }
    
    

    updateInput = (name, val)=>{
        this.setState({
            hasError: false,
            reset: false
        })
        let copyForm = this.state.form
        copyForm[name].value =val
        this.setState({
            form: copyForm
        })
        let rules = copyForm[name].validationRule
        let valid = Validation(val, rules, copyForm)
        copyForm[name].valid = valid
    }    
    UserLocationHandler = (location)=>{
        this.setState(prevState=>{
            return{
                form:{
                    ...prevState.form,
                    location:{
                        value: location,
                        valid: true
                    }
                }
            }
        })
      }
      onImagePickeHandler = (image)=>{
          this.setState(prevState=>{
            return {
                form:{
                    ...prevState.form,
                    image:{
                        value: image,
                        valid: true
                    }
                }
            }
          })
      }
    submitItemHandler =()=>{
        let isFormValid = true
        let formToSubmit ={}
        let formCopy = this.state.form
        for (let key in formCopy){
            isFormValid = isFormValid && formCopy[key].valid
            formToSubmit[key] = formCopy[key].value

           
           
        }
        if(isFormValid){
            this.setState({
                isLoading: true
            })
            getTokens((value)=>{
                const dateNow = new Date()
                const tokenExpered = dateNow.getTime()
                const form ={
                 ...formToSubmit,
                 uid: value[2][1]
                }
                if(tokenExpered > value[2][1]){
                       this.props.autoSignIn(value[1][1]).then(()=>{
                           setTokens(this.props.User.userData, ()=>{
                               this.props.postArticles(form, this.props.User.userData.token).then(()=>{
                                   this.setState({
                                    modalSuccess: true
                                   })
                               })
                           })
                       })
                }else{
                    this.props.postArticles(form, value[0][1]).then(()=>{
                        this.setState({
                         modalSuccess: true
                        })
                    })
                }
            })
            

        }else{
            let errorMessage = []
            for(let key in formCopy){
                if(!formCopy[key].valid){
                    errorMessage.push(formCopy[key].ErrorMsg)
                }
            }
            this.setState({
                hasError: true,
                isLoading: false,
                errorArray: errorMessage,
                modalVisible: true
            })
            
        }
    }
    showError = (error)=>(
        error?
        error.map((item, i)=>(
           <Text key={`error-${i}`} style={styles.errors}>{item}</Text>
        )): null
    )
    clearError = ()=>{
        this.setState({
            hasError: false,
            errorArray: [],
            modalVisible: false
        })
    }
    resetScreen = ()=>{
        const formCopy = this.state.form
        for(let key in formCopy){
            formCopy[key].valid = false
            formCopy[key].value = ''
        }
        this.setState({
            modalSuccess: false,
            errorArray: [],
            hasError: false,
            isLoading: false,
            reset: true
        })
        this.props.resetArticle()
    }
    
    render(){
        return(
           <ScrollView>
               <KeyboardAvoidingView  style={styles.formInputContainer} behavior='padding'>
                 <View style={{flex: 1, alignItems: 'center'}}>
                     <Text style={styles.mainTitte}>Sell your things</Text>
                 </View>
                 <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex:1}}>
                       <Text>
                           Select a category
                       </Text>
                    </View>
                    <View style={{flex:1}}>
                    <DefaultInput
                        placeholder ='Select a category'
                        type={this.state.form.category.type}
                        value={this.state.form.category.value}
                        onValueChange ={(val)=>this.updateInput('category', val)}
                        options = {this.state.form.category.options}
                        />
                    </View>
                 </View>
                 <View >
                      <PickImage imagePicked={this.onImagePickeHandler} 
                      onReset={this.state.reset}/>
                 </View>
                 <View style={{flex:1, alignItems: 'center'}}>
                     <Text style={styles.secondTitle}>Describe what you are selling.</Text>
                 </View>
                 <View>
                     <Text>Please write a title.</Text>
                     <DefaultInput
                        placeholder ='Please enter a title'
                        type={this.state.form.title.type}
                        value={this.state.form.title.value}
                        onChangeText ={(val)=>this.updateInput('title', val)}
                        overrideStyle={styles.title}
                        />
                 </View>
                 <View>
                 <Text>Please describe the item.</Text>
                 <DefaultInput
                        placeholder ='Please describe your item'
                        type={this.state.form.description.type}
                        value={this.state.form.description.value}
                        onChangeText ={(val)=>this.updateInput('description', val)}
                         multiline ={true}
                         numberOfLines = {5}
                         overrideStyle={styles.description}
                        />
                 </View>
                 <View>
                     <Text style={{ marginTop: 20, marginBottom: 20}}>
                     Please enter the price for item.</Text>
                     <DefaultInput
                        placeholder ='Please write a price for the item'
                        type={this.state.form.price.type}
                        value={this.state.form.price.value}
                        onChangeText ={(val)=>this.updateInput('price', val)}
                         overrideStyle={styles.title}
                         keyboardType = 'numeric'
                        />
                 </View>
                 <View style={{flex:1, alignItems: 'center'}}>
                     <Text style={styles.secondTitle}>Enter your contact.</Text>
                 </View>
                 <View>
                    <Text>Please enter your contact</Text>
                 </View>
                 <View>
                 <DefaultInput
                        placeholder ='Please enter an email'
                        type={this.state.form.email.type}
                        value={this.state.form.email.value}
                        onChangeText ={(val)=>this.updateInput('email', val)}
                         overrideStyle={styles.title}
                         keyboardType = 'email-address'
                         autoCapitalize = 'none'
                        />
                 </View>
                 <View style={styles.mapContainer} >
                     <MapView userLocation ={this.UserLocationHandler} onReset={this.state.reset}/>
                 </View>
                 {
                     !this.state.isLoading?
                     <Button title= 'Submit item' 
                     color = 'lightgrey'
                     onPress={this.submitItemHandler}/>
                     : null
                 }
                 <Modal
                 animateType = 'slide'
                 visible={this.state.modalVisible}
                 onRequestClose={()=>{}}>
                    <View style={{flex:1, justifyContent: 'center',alignItems:'center'}}>
                    {this.showError(this.state.errorArray)}
                    <Button
                    title='Go it !!!'
                    onPress={this.clearError}/>
                    </View>
                 </Modal>
                 <Modal
                 animateType = 'slide'
                 visible={this.state.modalSuccess}
                 onRequestClose={()=>{}}>
                    <View style={{flex:1, justifyContent: 'center',alignItems:'center'}}>
                    <Text>Your Post has successful added</Text>
                    <Button
                    title='Go Back to articles'
                    onPress={()=>{
                        this.resetScreen(),
                        this.props.navigator.switchToTab({
                            tabIndex: 0
                        })
                    }}/>
                    </View>

                 </Modal>
               </KeyboardAvoidingView>
           </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    formInputContainer:{
        flex: 1,
        flexDirection: 'column',
        padding: 20,
    },
    mainTitte:{
        fontFamily: 'Roboto-Black',
        fontSize: 30,
        color: '#00ada9'
    },
    secondTitle:{
        fontFamily: 'Roboto-Black',
        fontSize: 20,
        color: '#00ada9',
        marginTop: 30,
        marginBottom: 30,
    },
    title:{
        padding: 10,
        borderBottomWidth: 0,
        backgroundColor: '#f2f2f2',
    },
    description:{
        padding: 10,
        borderBottomWidth: 0,
        backgroundColor: '#f2f2f2',
        minHeight: 200
    },
    errors:{
        fontFamily: 'Roboto-Black',
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
    },
    mapContainer:{
        marginTop: 20,
        marginBottom: 20
    },
    image:{
        width: '100%',
        height: 200,
        backgroundColor: '#f2f2f2',
        marginTop: 20
    }
})
const mapStateToProps = (state) => {
    return {
        User: state.User,
        Articles: state.Articles
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({postArticles, autoSignIn, resetArticle}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPost)