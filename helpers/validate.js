export const validate =  (data , type) => {
    const error = {}


    if(type === 'singup') {
        if(!data.name.trim()){
            error.name = "name is required"
        } else {
            delete error.name
        }
        if(!data.lastname.trim()){
            error.lastname = "lastname is required"
        } else {
            delete error.lastname
        }
        if(!data.phoneNumber){
            error.phoneNumber = "PhoneNumber is required"
        } else if (!/^(\+98|0)?9\d{9}$/g.test(data.phoneNumber)) {
            error.phoneNumber = "PhoneNumber is invalid"
        } else {
            delete error.phoneNumber
        }

    }

    if(type === "login"){
        if(!data.phoneNumber){
            error.phoneNumber = "PhoneNumber is required"
        } else if (!/^(\+98|0)?9\d{9}$/g.test(data.phoneNumber)) {
            error.phoneNumber = "PhoneNumber is invalid"
        } else {
            delete error.phoneNumber
        }

        if(!data.password){
            error.password = "password is required"
        } else if(data.password.lenght < 6) {
            error.password = "Password must be more than 6 characters"
        } else {
           delete error.password
        }
    }

    if(type === 'createPassword'){
        if(!data.password){
            error.password = "password is required"
        } else if(data.password.lenght < 6) {
            error.password = "Password must be more than 6 characters"
        } else {
           delete error.password
        }
        if(!data.confirmPassword) {
            error.confirmPassword = "Confirm the password"
        } else if(data.confirmPassword !== data.password) {
            error.confirmPassword = "Password do not match"
        } else {
            delete error.confirmPassword
        }
    }

    if(type === 'forgetpassword'){
        if(!data.phoneNumber){
            error.phoneNumber = "PhoneNumber is required"
        } else if (!/^(\+98|0)?9\d{9}$/g.test(data.phoneNumber)) {
            error.phoneNumber = "PhoneNumber is invalid"
        } else {
            delete error.phoneNumber
        }
    }

    return error
}