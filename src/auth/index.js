//signup
export const signup = user  => {
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

//signin
export const signin = user  => {
    return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

//authenticate
export const authenticate = (jwt, next) => {
    if(typeof window != "undefined") {
        localStorage.setItem('JWT', JSON.stringify(jwt))
        next()  
    }
}

//signout
export const signout = (next) => {
    if(typeof window != "undefined") localStorage.removeItem("JWT")
    next()
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method:'GET'
    })
    .then((res) => {
        // console.log(res)
        res.json()
    })
    .catch(err => console.log(err))
}

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false
    }
    if(localStorage.getItem("JWT")) {
        return JSON.parse(localStorage.getItem("JWT"))
    } else {
        return false
    }
}
//forgotPassword
export const forgotPassword = email  => {
    return fetch(`${process.env.REACT_APP_API_URL}/forgotpassword/`, {
        method:"PUT",
        headers:{
            Accept :"application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}
//resetPassword
export const resetPassword = resetInfo  => {
    return fetch(`${process.env.REACT_APP_API_URL}/resetpassword/`, {
        method:"PUT",
        headers:{
            Accept :"application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
    .then(res =>{ 
        return res.json()
    })  
    .catch(err => console.log(err))
}
export const socialLogin = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};