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

    renderPosts() {
        const { posts } = this.state
        return (
            <div className="row">
                {posts.map((post, i) => {
                    const posterId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const posterName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";

                    return (
                        <div className="card col-md-4" key={i}>
                            <div className="card-body">
                                <img
                                    src={`${
                                        process.env.REACT_APP_API_URL
                                    }/post/photo/${post._id}`}
                                    alt={post.title}
                                    onError={i =>
                                        (i.target.src = `${DefaultePost}`)
                                    }
                                    className="img-thunbnail mb-3"
                                    style={{ height: "200px", width: "100%" }}
                                />
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">
                                    {post.body.substring(0, 100)}
                                </p>
                                <br />
                                <p className="font-italic mark">
                                    Posted by{" "}
                                    <Link to={`${posterId}`}>
                                        {posterName}{" "}
                                    </Link>
                                    on {new Date(post.created).toDateString()}
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised btn-primary btn-sm"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { posts, page } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    {!posts.length ? "No more posts!" : "Recent Posts"}
                </h2>

                {this.renderPosts(posts)}

                {page > 1 ? (
                    <button
                        className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
                        onClick={() => this.loadLess(1)}
                    >
                        Previous ({this.state.page - 1})
                    </button>
                ) : (
                    ""
                )}

                {posts.length ? (
                    <button
                        className="btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore(1)}
                    >
                        Next ({page + 1})
                    </button>
                ) : (
                    ""
                )}
            </div>
        )
    }
}

export default Posts