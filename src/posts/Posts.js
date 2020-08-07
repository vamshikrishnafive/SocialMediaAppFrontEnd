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
        <div className="left row">
            {posts.map((post, i) => {

                const postedId = post.postedBy ?
                    post.postedBy._id : "";
                const postedName = post.postedBy ?
                    post.postedBy.name :
                    "Unknown";

                return (
                    <div className="col s12 m7" key={i}>
                        <div className="card">
                        <div className = "card image">
                        <img 
                            className = "responsive-img"
                            src = {`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                            alt = {post.title}
                            onError = {i => (i.target.src = `${DefaultePost}`)}
                            style = {{height:"199px", width:"500px"}}
                            />
                        <span className="font-w­eig­ht-­normal card-title"></span>
                        </div>  
                        <div className="card-content">
                        <span 
                            class="card-title activator grey-text text-darken-4">
                            {post.title} 
                            <Link to={`/post/${post._id}`}><i class="material-icons right">add</i></Link>  
                        </span>
                            <p>{post.body.substr(0, 100)}</p>
                        </div>
                        <div className="card-action">
                            <span className="font-italic mark">
                                PostedBy <Link to={`/user/${postedId}`}>
                                    {postedName}</Link>on {new Date(post.created).toDateString()}
                            </span>
                            {/* <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i>Card Title</span>
                                <p>Here is some more information about this product that is only revealed once clicked on.</p>
                            </div> */}
                        </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )

    render() {
        const { posts } = this.state
        return (
            <div className="container">
                <h2 className=" mt-5 mb-5">
                {!posts.length ? <div className =  'center'>
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
                    </div></div> : "Recent Post"}
                </h2>
                {this.renderPost(posts)}
            </div>
        )
    }
}

export default Posts