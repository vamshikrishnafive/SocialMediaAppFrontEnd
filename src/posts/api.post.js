//user profile
export const create = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body:post
    })
    .then(res => { 
        return res.json() 
    })
    .catch(err => console.log(err))
}
//list of posts
export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "GET"
    })
    .then(res => { 
        return res.json() 
    })
    .catch(err => console.log(err))
}
//user list of posts
export const listByuser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(res => { 
        return res.json() 
    })
    .catch(err => console.log(err))
}
//singlePost
export const singlePost = postId => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "GET"
    })
    .then(res => { 
        return res.json() 
    })
    .catch(err => console.log(err))
}
//remove post
export const remove = (postId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
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
//update
export const update = (postId, token, post)  => {
    // console.log(postId, "T:" + token, "P:" + post)
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method:"PUT",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body:post
    })
    .then(res => { 
        return res.json()
    })
    .catch(err => console.log(err))
}
//like
export const like  = (userId, token, postId)  => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
        method:"PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
    .then(res => { 
        return res.json()
    })
    .catch(err => console.log(err))
}
//unlike
export const unlike  = (userId, token, postId)  => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
        method:"PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
    .then(res => { 
        return res.json()
    })
    .catch(err => console.log(err))
}
//commet
export const comment  = (userId, token, postId, comment)  => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
        method:"PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId, comment})
    })
    .then(res => { 
        return res.json()
    })
    .catch(err => console.log(err))
}
//uncommet
export const uncomment  = (userId, token, postId, comment)  => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
        method:"PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId, comment})
    })
    .then(res => { 
        return res.json()
    })
    .catch(err => console.log(err))
}