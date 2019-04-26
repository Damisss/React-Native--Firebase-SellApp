const validation = (val, rules, copyForm)=>{
    let valid = true
    for(let rule in rules){
    switch(rule){
        case 'isRequired':
        valid = valid && required(val)
        break
        case 'isEmail':
        valid = valid && emailValidation(val)
        break
        case 'minLength':
        valid = valid && passwordValidation(val, rules[rule])
        break
        case 'maxLength':
        valid = valid && titleOrDescriptionValidation(val, rules[rule])
        break
        case 'confirm':
        valid = valid && confirmPassValidation(val, copyForm[rules.confirm].value )
        break
        default:
        return valid = true
    }
    }
    return valid
}

export default validation

const required = (val)=>{
   if(val !== ' '){
    return true 
}else{
    return false
}
}
const emailValidation = (val)=>{
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    .test(String(val).toLocaleLowerCase())
}

const passwordValidation  = (val, checkpass) =>{
    if (val.length >= checkpass){
        return true
    }else{
        return false
    }
}
const titleOrDescriptionValidation  = (val, checkpass) =>{
    if (val.length <= checkpass){
        return true
    }else{
        return false
    }
}

const confirmPassValidation = (val, confirmPass)=>{
    return val === confirmPass
}