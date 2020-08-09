import React, { Component } from "react"
import { Link } from "react-router-dom"
import M from "materialize-css"

import { isAuthenticated } from "../auth"
import { comment, uncomment } from "./api.post";
import DefaultProfile from "../images/download.png"

class Comment extends Component {
    state = {
        text: "",
        error: ""
    }

    handleChange = event => {
        this.setState({ error: "" })
        this.setState({ text : event.target.value })
    }

    isValid = () => {
        const { text } = this.state

        if(!text.length > 0 || text.length > 150){
            this.setState({
                error:"Comment should not be empty and less than 150 characters long"
            })
            return false
        }   
        return true
    }

    addComment = event => {
        event.preventDefault()
        
        if(!isAuthenticated) {
            this.setState({error:"Please signin to leave a comment"});
            return false;
        }

        if(this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token
            const postId = this.props.postId;
            
            comment(userId, token, postId, {text: this.state.text}).then(data => {
                if(data.error) {
                    M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
                } else {
                    this.setState({text: "" });
                    this.props.updateComments(data.comments)
                    M.toast({html: "Done", classes:"#66bb6a green lighten-1"})
                }
            }) 
        }
    }
    deleteComment = comment => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;
        
        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
                M.toast({html: data.error, classes:"#66bb6a green lighten-1"})
            } else {
                this.props.updateComments(data.comments);
                M.toast({html: "Deleted", classes:"#66bb6a blue lighten-1"})
            }
        });
    };

    deleteComfirmed = comment => {
        let answer = window.confirm(
            "Are you sure you want to delete your comment?"
        );
        if (answer) {
            this.deleteComment(comment);
        }
    };

    render(){
        const { comments } = this.props;
        const {error, text} = this.state; 
        return (
            <div>
                <h2>Leave a comment</h2>
                <form className="col s12" onSubmit = {this.addComment}>
                    <div className="row">
                        <div className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                <input
                                    type="text"
                                    onChange={this.handleChange}
                                    value={text}
                                    className="form-control"
                                    placeholder="Leave a comment..."
                                />
                                <button 
                                    className = "btn waves-effect waves-light right blue">
                                    Post 
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div
                    className="valign-wrapper"
                    style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                <div className = "row">
                    <h4>{comments.length} Comments</h4>
                    <hr/>
                    {comments.map((comment, i) => (
                        <div key = {i}>
                            <div>
                                <Link to={`/user/${comment.postedBy._id}`}>
                                    <img 
                                        style = {{
                                            borderRadius:"50%", 
                                            border:"1px soild black"
                                        }}
                                        className = "responsive-img"
                                        height = "30px"
                                        width = "30px"
                                        onError = {i =>
                                            (i.target.src = `${DefaultProfile}`
                                        )}
                                        src = {`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                                        alt = {comment.postedBy.name}
                                    />
                                </Link>
                                <div>
                                    <p>{comment.text}</p>
                                    <p>
                                        PostedBy{" "}
                                        <Link to={`/user/${comment.postedBy._id}`}>
                                            {comment.postedBy.name}{" "}
                                        </Link>
                                        on{" "}
                                        {new Date(
                                            comment.created
                                        ).toDateString()}
                                        <p>
                                            {isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id && (
                                                <>
                                                    <span
                                                        onClick={() => this.deleteComfirmed(comment)}
                                                    >
                                                    Remove
                                                    </span>
                                                </>
                                            )}
                                        </p>
                                    </p> 
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> 
        )
    }
}

export default Comment;