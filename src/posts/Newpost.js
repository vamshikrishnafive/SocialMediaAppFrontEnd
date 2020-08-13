import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import M from "materialize-css"

import { isAuthenticated } from '../auth';
import { create } from './api.post';


class Newpost extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            photo: "",
            error: "",
            loading: false,
            user: [],
            redirectToProfile: false
        };
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({user: isAuthenticated().user})
    }

    isValid = () => {
        const { title, body, fileSize} = this.state
        if(fileSize > 1000000){
            this.setState({
                error:"File size shoulde less than 1000kb"
            })
            return false
        }
        if(title.length === 0 || body.length === 0){
            this.setState({
                error:"All fields are required", loading: false
            })
            return false
        }
        return true
    }

    handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        const fileSize = name === "photo" ? event.target.files[0].size : 0
        this.postData.set(name, value)
        this.setState({ [name]: value, fileSize })
    }
    
    clickSubmit = event => {
        event.preventDefault()
        this.setState({loading:true})
        if (this.isValid()) {
            const userId = isAuthenticated().user._id
            const token = isAuthenticated().token
            create(userId, token, this.postData).then(data => {
                if (data.error) { 
                    M.toast({html: data.error, classes:"#ef5350 red lighten-1"}) 
                }
                else this.setState({
                    loading: false,
                    title: "",
                    body: "",
                    redirectToProfile: true
                })
                M.toast({html: "Sucessfully Created", classes:"#66bb6a green lighten-1"})
            })
        }
    }

    newPostForm = ( title, body ) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Post Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Create Post
            </button>
        </form>
    )

    render() {
        const {user, error, loading, title, body, photo, redirectToProfile} = this.state
        if(redirectToProfile) {
            return <Redirect to = {`/user/${user._id}`} />
        }

        return (
            <div className="container">
            <h2 className="mt-5 mb-5">Create a new post</h2>
            <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
            >
                {error}
            </div>

            {loading ? (
                <div className="jumbotron text-center">
                    <h2>Loading...</h2>
                </div>
            ) : (
                ""
            )}

            {this.newPostForm(title, body)}
        </div>
        )
    }
}

export default Newpost