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
            <div className="row" >
                <h2 className="col s2 m4 flow-text"> Profile </h2>
                <div className="col s10" >
                    <img
                        src={photoUrl}
                        alt={user.name}
                        style={{ height: "200px", width: 'auto' }}
                        onError={i => (i.target.src = `${DefaultImage}`)}
                        className="circle responsive-img"
                    />

                    <div className="col s10 flow-text">
                        <p> Hello {user.name} </p>
                        <p> EMail {user.email} </p>
                        <p> {`Joined ${new Date(user.created).toDateString()}`} </p>
                        <p className="lead">{user.about}</p>
                    </div>
                    <div>
                        {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                            <div className="col s10 flow-text" >
                                <Link
                                    className="waves-effect waves-light btn-small #0d47a1 blue darken-4"
                                    to={`/post/create`} >
                                    Create Post
                                </Link>
                                <Link
                                    className="waves-effect waves-light btn-small #0d47a1 blue darken-4"
                                    to={`/user/edit/${this.state.user._id}`} >
                                    Edit Profile
                                </Link>
                                <DeleteUser userId={user._id} />
                            </div>
                        ) : (<FollowProfileButton
                            following={this.state.following}
                            onButtonclick={this.clickFollowButton}
                        />
                            )}
                    </div>
                </div>
            <hr />
            <div className="row">
                
            </div>
            <hr />
            <ProfileTabs
                following={user.following}
                followers={user.followers}
                posts={posts}
            />
            </div>
        )
    }
}

export default Profile