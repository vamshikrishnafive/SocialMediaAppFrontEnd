//user profile
export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => { return res.json() })
    .catch(err => console.log(err))
}

//Delete user profile
export const remove = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => { return res.json() })
    .catch(err => console.log(err))
}
// Edit profile 
export const update = (userId, token, user)  => {
    // console.log(user)
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method:"PUT",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body:user
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}
//all users
export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET"
    })
    .then(res => { return res.json() })
    .catch(err => console.log(err))
}
export const updateUser = (user, next) => {
    if (typeof window !== 'undefined') {
        if(localStorage.getItem('JWT')) {
            let auth = JSON.parse(localStorage.getItem('JWT'))
            auth.user = user;
            localStorage.setItem('JWT', JSON.stringify(auth))
            next()
        }
    }
}
// follow profile 
export const follow = (userId, token, followId)  => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({userId, followId})
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}
// unfollow profile 
export const unfollow = (userId, token, unfollowId)  => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({userId, unfollowId})
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}
// find profile 
export const findPeople = (userId, token)  => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/findpeople/${userId}`, {
        method:"GET",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}