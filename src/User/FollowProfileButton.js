import React, { Component } from 'react'

import {follow, unfollow} from './api.user'

class FollowProfileButton extends Component {

    followClick = () => {
        this.props.onButtonclick(follow)
    }

    unfollowClick = () => {
        this.props.onButtonclick(unfollow)
    }

    render() {
        return(
            <div className = "row">
            {
                !this.props.following ? (
                    <button 
                        className = "waves-effect waves-light btn-small #0d47a1 blue darken-4 mr-5"
                        onClick = {this.followClick}
                        >Follow</button>
                ) : (
                    <button 
                        className = "waves-effect waves-light btn-small #0d47a1 blue darken-4 mr-5"
                        onClick = {this.unfollowClick}
                        >UnFollow</button>
                )
            }
            </div>
        )
    }
}

export default FollowProfileButton