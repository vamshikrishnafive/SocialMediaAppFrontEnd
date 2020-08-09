import React, { Component } from "react"

import { list } from "./api.post"
import { Link } from "react-router-dom"
import DefaultePost from "../images/beauty.jpg"

class Posts extends Component {
    constructor() {
        super()
        this.state = ({
            posts: []
        })
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    posts: data
                })
            }
        })
    }

    renderPost = posts => (
        <div className="row">
            {posts.map((post, i) => {

                const postedId = post.postedBy ?
                    post.postedBy._id : "";
                const postedName = post.postedBy ?
                    post.postedBy.name :
                    "Unknown";

                return (
                        <div className="card" key={i}>
                        <div className="card-action text-italian text-darken-2">
                            <h5>
                                <Link to={`/user/${postedId}`}>
                                    {postedName}
                                </Link>
                            </h5>
                        </div>
                            
                            <img
                            className = "card-image"
                            src = {`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                            alt = {post.title}
                            onError = {i => (i.target.src = `${DefaultePost}`)}
                            style = {{height:"500px", width:"662px", objectFit:"fill"}}
                            />
                        <div className="card-content">
                        <span class="card-title blue-text text-darken-4">
                            {post.title}
                        </span>
                            <Link to={`/post/${post._id}`}>
                            <p class="card-body">{post.body.substr(0,75)} ...read More</p>
                            </Link>
                            <h6>{post.likes.length} likes</h6>
                            <h6>{post.comments.length} comments</h6>
                        </div>
                        </div>
                )
            })}
        </div>
    )

    render() {
        const { posts } = this.state
        return (
            <div className="gallery">
                <h2 className=" mt-5 mb-5">
                {!posts.length ? <div className = 'center'>
                    <div class="preloader-wrapper big active">
                        <div class="spinner-layer spinner-blue">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>

                        <div class="spinner-layer spinner-red">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>

                        <div class="spinner-layer spinner-yellow">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>

                        <div class="spinner-layer spinner-green">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div></div> : " "}
                </h2>
                {this.renderPost(posts)}
            </div>
        )
    }
}

export default Posts