import React, { Component } from "react"
import { Redirect, Link } from 'react-router-dom'

import { isAuthenticated } from "../auth"
import { read } from "./api.user";
import DefaultImage from '../images/download.png'
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTabs'
import { listByuser } from "../posts/api.post";

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            user: { following: [], followers: [] },
            following: false,
            error: "",
            redirectToSignin: false,
            posts: []
        }
    }

    checkFollow = user => {
        const jwt = isAuthenticated()
        const match = user.followers.find(follower => {
            return follower._id === jwt.user._id
        })
        return match
    }

    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token

        callApi(userId, token, this.state.user._id).then(data => {
            if (data.error) {
                this.setState({ error: data.error })
            } else {
                this.setState({ user: data, following: !this.state.following })
            }
        })
    }

    init = userId => {
        const token = isAuthenticated().token
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true })
            } else {
                let following = this.checkFollow(data)
                this.setState({ user: data, following })
                this.loadPosts(data._id)
            }
        })
    }

    loadPosts = userId => {
        const token = isAuthenticated().token
        listByuser(userId, token).then(data => {
            if (data.error) {
                this.setState({ error: data.error })
            } else {
                this.setState({ posts: data })
            }
        })
    }

    componentDidMount() {
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId
        this.init(userId)
    }

    render() {
        const { user, redirectToReferer, posts } = this.state

        if (redirectToReferer) { return <Redirect to="/signin" /> }

        const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : DefaultImage

        return (
        <div className = "row">
            <div style={{maxWidth:"550px",margin:"0px auto"}}>
                <div style = {{
                    display:"flex",
                    justifyContent:"space-around",
                    margin:"25px 0px",
                    borderBottom:"1px solid grey"
                    }}>
                    <div>
                        <img
                            src={photoUrl}
                            alt={user.name}
                            style = {{width:"160px",height:"160px",borderRadius:"80px"}}
                            onError={i => (i.target.src = `${DefaultImage}`)}
                        />
                    </div>
                    <div>
                        <h4> {user.name} </h4>
                        <div style = {{display:"flex",justifyContent:"space-between",width:"108%"}}>
                            <h6> {posts.length} posts </h6>
                            <h6> {user.followers.length} followers </h6>
                            <h6> {user.following.length} following </h6>
                        </div>
                    </div>
                </div>

                <div>
                    <p> Email: {user.email} </p>
                    <p> {`Joined on ${new Date(user.created).toUTCString()}`} </p>
                    <p>{user.about}</p>
                {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                <div className="col s10 flow-text" >
                    <Link
                        className="waves-effect waves-light btn-small #0d47a1 white darken-4 left"
                        to={`/user/edit/${this.state.user._id}`}>
                        <i class="material-icons">create</i>
                    </Link>
                    <Link
                        className="waves-effect waves-light btn-small #0d47a1 white darken-4 left"
                        to={`/post/create`} >
                        <i class="material-icons">add_a_photo</i>
                    </Link>
                    <DeleteUser userId={user._id} />
                </div>
                ) : (
                
                <FollowProfileButton
                following={this.state.following}
                onButtonclick={this.clickFollowButton}
                />
                )}
                </div>
            </div>
            <br/>
            <div className = "row">
            <br/>
            <ProfileTabs
                following={user.following}
                followers={user.followers}
                posts={posts}
            />
            </div>
           
        </div>
        )
    }
}

export default Profile