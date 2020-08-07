import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

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
        if(fileSize > 100000){
            this.setState({
                error:"File size shoulde less than 100kb"
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
        this.setState({error: ""})
        const value = name === "photo" ? event.target.files[0] : event.target.value
        const fileSize = name === "photo" ? event.target.files[0].size : 0
        this.postData.set(name, value)
        this.setState({ [name]: value, fileSize })
    }
    
    clickToSubmit = event => {
        event.preventDefault()
        this.setState({loading:true})
        if (this.isValid()) {
            const userId = isAuthenticated().user._id
            const token = isAuthenticated().token
            create(userId, token, this.postData).then(data => {
                if (data.error) this.setState({ 
                    error: data.error 
                })
                else this.setState({
                    loading: false,
                    title: "",
                    body: "",
                    redirectToProfile: true
                });
            })
        }
    }

    newPostForm = ( title, body ) => (
        <div class="row">
            <form class="col s12">
                <div class="row">
                    <div class="col s12">
                        <div class="row">
                            <div class="input-field col s12">
                            <input 
                                type = "text" 
                                className = "from-control" 
                                onChange = {this.handleChange("title")}
                                value = {title}
                            />
                            <label for="text">Title</label>
                            {/* <span class="helper-text" data-error="wrong" data-success="right">Helper text</span> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                            <div class="col s12">
                                <div class="row">
                                    <div class="input-field col s12">
                                    <input 
                                        type = "text" 
                                        className = "from-control" 
                                        onChange = {this.handleChange("body")}
                                        value = {body}
                                    />
                                    <label for="text">Body</label>
                                    {/* <span class="helper-text" data-error="wrong" data-success="right">Helper text</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                <div class="file-field input-field">
                    <div class="btn">
                        <span>Photo</span>
                            <input
                                onChange={this.handleChange("photo")}
                                type="file"
                                accept="image/*"
                                className="form-control"
                            />
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text"/>
                    </div>
                </div>
                <button 
                    onClick = {this.clickToSubmit} 
                    className = "btn waves-effect waves-light right" >
                    Create Post <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    )

    render() {
        const {user, error, loading, title, body, photo, redirectToProfile} = this.state
        if(redirectToProfile) {
            return <Redirect to = {`/user/${user._id}`} />
        }

        return (
            <div className = "container">
                <h2> Create a New Post </h2>
                <div 
                    className = "alert alert-danger"
                    style = {{display : error ? "" : "none"}}>
                {error}
                </div>
                {loading ? 
                    (<div className = "jumbotron text-center">
                        <h2> loading...</h2>
                    </div>
                    ):(
                    ""
                )}
                {this.newPostForm(title, body)}
            </div>
        )
    }
}

export default Newpost