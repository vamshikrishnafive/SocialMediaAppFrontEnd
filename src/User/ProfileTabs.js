import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import DefaultImage from '../images/download.png'   

class ProfileTabs extends Component {
    render() {
        const { followers, following, posts } = this.props
        return(
            <div>
                 <div className = "row" >
                    <div className = "col-md-6" >
                        <h3 className = "text"> Followers </h3>
                        <hr/>
                        {followers.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to = {`/user/${person._id}`}>
                                        <img
                                            style = {{borderRadius: '50%', border: '1px solid black'}}
                                            height = '30px'
                                            width = '60px'
                                            src = {`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                            alt = {person.name}
                                            height ='60px'
                                            onError = {i => (i.target.src = `${DefaultImage}`)}
                                        />
                                        <div>
                                            <p className = "lead">{person.name}</p>
                                        </div>
                                    </Link>
                                    <p style={{clear :"both"}}>{person.about}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className = "col-md-6" >
                        <h3 className = "text"> following </h3>
                        <hr/>
                        {following.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to = {`/user/${person._id}`}>
                                        <img
                                            style = {{borderRadius: '50%', border: '1px solid black'}}
                                            height = '30px'
                                            width = '60px'
                                            src = {`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                            alt = {person.name}
                                            height ='60px'
                                            onError = {i => (i.target.src = `${DefaultImage}`)}
                                        />
                                        <div>
                                            <p className = "lead">{person.name}</p>
                                        </div>
                                    </Link>
                                    <p style={{clear :"both"}}>{person.about}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className = "col-md-6" >
                        <h3 className = "text"> Posts </h3>
                        <hr/>
                        {posts.map((post, i) => (
                            <div key={i}>
                                <div>
                                    <Link to = {`/post/${post._id}`}>
                                        <div>
                                            <p className = "lead">{post.title}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        )
    }
}

export default ProfileTabs