import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom"

import DefaultePost from "../images/beauty.jpg"
import { singlePost, remove, like, unlike } from "./api.post"
import { isAuthenticated } from '../auth'
import Comment from "./Comment"

class SinglePost extends Component {
    state = {
        post : "",
        redirectToHome: false,
        redirectToSignin: false,
        like : false,
        likes : 0,
        comments: []
    }

    checkLike = (likes) => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match
    }

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else {
               this.setState({
                   post:data, 
                   likes: data.likes.length,
                   like: this.checkLike(data.likes),
                   comments: data.comments
                })
            }
        })
    }

    updateComments = comments => {
        this.setState({ comments });
    }

    likeToggle = () => {
        if(!isAuthenticated()){
            this.setState({ redirectToSignin:true })
            return false
        }
        
        let callApi = this.state.like ? unlike : like
        const userId = isAuthenticated().user._id;  
        const postId = this.state.post._id;
        const token = isAuthenticated().token


        callApi(userId, token, postId).then(data => {
            if(data.error) {
                console.log(data.error)
            } else { 
                this.setState({
                    like : !this.state.like,
                    likes : data.likes.length   
                })
            }
        })
    }   

    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token
        
        remove(postId, token).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else {
               this.setState({ redirectToHome: true })
            }
        })
    }

    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your post?');
        if(answer) {
            this.deletePost();
        }
    };


    renderPost = post => {
        const postedId = post.postedBy ?
                    post.postedBy._id : "";
        const postedName = post.postedBy ?
                    post.postedBy.name :
                    "Unknown";

        const { like, likes } = this.state 
        return (
            <div className="row">
            <div className =  "col s12">
            <div className = "card-image">
            <img    
                className = "responsive-img"
                src = {`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                alt = {post.title}
                onError = {i => (i.target.src = `${DefaultePost}`)}
                style = {{height:"200px", width:"200px", objectFit:"cover"}}
                />
            </div>
            {like ? (
                <h4 
                    onClick = {this.likeToggle}>
                    <i 
                        className="material-icons"
                        style={{padding:"10px",borderRadius:"50%", color: "red"}}
                        >favorite</i>{" "}
                    {likes}
                </h4>
            ) : (
                <h4 
                    onClick = {this.likeToggle}>
                    <i 
                        className="material-icons"
                        style={{padding:"10px",borderRadius:"50%"}}
                        >favorite_border</i>{" "}
                    {likes}
                </h4>
            )} 
            <div className="card-content">
                <p>{post.body}</p>
            <div className = "right">
                <Link 
                    className="waves-effect waves-light btn-small right blue" 
                    to={`/`}> 
                    Back to home
                </Link>
                {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
                    <>
                    <Link
                        className="waves-effect waves-light btn-small right blue"
                        to={`/post/edit/${post._id}`}
                    > 
                    update Post
                    </Link>    
                    <Link
                        to = ""
                        onClick = {this.deleteConfirmed}
                        className="waves-effect waves-light btn-small right blue"
                    > 
                    delete Post
                    </Link>
                    </>
                )}
            </div>
            </div>
            <div className="card-action">
                <span className="font-italic mark">
                        PostedBy <Link to={`/user/${postedId}`}>{postedName} </Link>
                        on {new Date(post.created).toDateString()}
                </span>
            </div>
            </div>
            </div>
        )
    }

    render() {  
        const {post, redirectToHome, redirectToSignin, comments} = this.state

        if(redirectToHome) {
            return <Redirect to = {`/`} />
        } else if(redirectToSignin) {
            return <Redirect to = {`/signin`} />
        }
        return (
            <div className = "container">
                <h2 className = "center-card-title">{post.title}</h2>
                {!post ? ( <div className =  'center'>
                <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>

                        <div className="spinner-layer spinner-red">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>

                        <div className="spinner-layer spinner-yellow">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>

                        <div className="spinner-layer spinner-green">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div></div> ) : ( 
                        this.renderPost(post)
                    )}
                    <Comment 
                        postId = {post._id} 
                        comments = {comments.reverse()} 
                        updateComments = {this.updateComments}       
                    />                 
            </div>
        )
    }   
}

export default SinglePost