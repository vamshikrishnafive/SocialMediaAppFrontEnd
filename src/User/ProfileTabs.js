import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import DefaultImage from '../images/download.png'   

class ProfileTabs extends Component {
    render() {
        
    const { followers, following, posts } = this.props
    
    return(
        <div className = "container" style = {{marginLeft:"350px"}}>

        <div className = "col s2 m3" id = "Followers">
            <h3 className = "iteam"> Followers </h3>
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
                    </Link>
                </div>
                <div>
                    <p className = "lead">{person.name}</p>
                    <p style={{clear :"both"}}>{person.about}</p>
                </div>
            </div>
            ))}
        </div>
      
        <div className = "col s1 m3">
            <h3 className = "text"> Following </h3>

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
                            </Link>
                            <div>
                                <p className = "lead">{person.name}</p>
                                <p style={{clear :"both"}}>{person.about}</p>
                            </div>
                    </div>
                </div>
            ))}
        </div>

        <div className = "col s1 m3">
            <h3 className = "text"> posts </h3>
                {posts.map((post, i) => (
                    <div key={i}>
                        <div>
                            <Link to = {`/post/${post._id}`}>
                                <div>
                                    <p className = "item">{post.title}</p>
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