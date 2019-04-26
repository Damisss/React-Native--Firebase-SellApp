import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import DefaultInput from './DefaultInput'
import Validation from '../../Utils/Form/validation'
import Loadtabs from '../loadTabScreen'
import {connect} from 'react-redux'
import {signUp, signIn} from '../../Store/action/user_action'
import {bindActionCreators} from 'redux'
import {setTokens} from '../../Utils/misc'

class LoginForm extends Component{
    state={
        type: 'Login',
        action: 'Login',
        actionMode: 'New User?',
        hasError: false,
        form:{
            email:{
                value: '',
                valid: false,
                type: 'textInput',
                validationRule:{
                    isRequired: true,
                    isEmail: true
                }
            },
            password:{
                value: '',
                valid: false,
                type: 'textInput',
                validationRule:{
                    isRequired: true,
                    minLength: 6
                }

            },
            confirmPassword:{
                value: '',
                valid: false,
                type: 'textInput',
                validationRule:{
                    confirm: 'password'
                }
            }
        }
    }
    updateInput = (name, val)=>{
        this.setState({
            hasError: false
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
    action = ()=>{
        let type = this.state.type
        this.setState({
            type: type === 'Login'? 'Register' : 'Login',
            action: type === 'Login'? 'Register' : 'Login',
            actionMode: type === 'Login'? 'Have an account?' : 'New user?',
        })
    }
    manageAccess = ()=>{
        if(!this.props.User.userData.uid){
            this.setState({
                hasError: true
            })
        }else{
            setTokens(this.props.User.userData, ()=>{
                this.setState({
                    hasError: false
                })
                Loadtabs(true)
            })

        }

    }
    submitUser = ()=>{
       let isFormValid = true
       let formToSubmit = {}
       const formCopy = this.state.form
       for(let key in formCopy){
           if(this.state.type === 'Login'){
               if(key !== 'confirmPassword')
                 isFormValid = isFormValid && formCopy[key].valid
                 formToSubmit[key]= formCopy[key].value
           }else{
            isFormValid = isFormValid && formCopy[key].valid
            formToSubmit[key]= formCopy[key].value
           }
       }
       if(isFormValid){
             if(this.state.type === 'Login'){
                this.props.signIn(formToSubmit).then(()=>{
                    this.manageAccess()
                })

             }else{
                 this.props.signUp(formToSubmit).then(()=>{
                    this.manageAccess()
                 })
             }
       }else{
           this.setState({
               hasError: true
           })
       }
    }
    formHasError = ()=>(
        this.state.hasError?
        <View style ={styles.errorContainer}>
            <Text style ={styles.errorLabel}>Opps, check your info</Text>
        </View>
        : null
    )
    confirmPass = ()=>(
        this.state.type !== 'Login'? 
        <DefaultInput
        placeholder ='Confirm password'
        type={this.state.form.confirmPassword.type}
        value={this.state.form.confirmPassword.value}
        onChangeText ={(val)=>this.updateInput('confirmPassword', val)}
        secureTextEntry
        />
        :null )
    
    render(){
        return(
            <View style ={styles.inputforms}>
              <DefaultInput
              placeholder ='Enter your email'
              type={this.state.form.email.type}
              value={this.state.form.email.value}
              onChangeText ={(val)=>this.updateInput('email', val)}
              autoCapitalize = {'none'}
              keyboard ={'email-address'}
              
              />
              <DefaultInput
              placeholder ='Enter your password'
              type={this.state.form.password.type}
              value={this.state.form.password.value}
              onChangeText ={(val)=>this.updateInput('password', val)}
              secureTextEntry
              
              />
              {this.confirmPass()}
              {this.formHasError()}
              <View style ={this.props.platform === 'android'? styles.android: null}>
              <Button color = '#fd9727'
              title = {this.state.action} onPress ={this.submitUser}/>
              </View>
              <View style ={this.props.platform === 'android'? styles.android: null}>
              <Button color = 'lightgrey'
              title = {this.state.actionMode} onPress ={()=>this.action()}/>
              </View>
              <View style ={this.props.platform === 'android'? styles.android: null}>
              <Button color = 'lightgrey'
              title = 'Visit without register' onPress ={()=>Loadtabs(false)}/>
              </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    inputforms:{
        minHeight: 400
    },
    android:{
        marginTop: 10,
        padding: 5,
    },
    errorContainer:{
        marginBottom: 20,
        marginTop: 10
    },
    errorLabel:{
      color: 'red',
      fontFamily: 'Roboto-Black',
    }

})
function  mapStateToProps(state) {
    return {
        User: state.User
    }
}
function mapDispatchToProps (dispatch){
    return bindActionCreators({signUp, signIn}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps) (LoginForm)