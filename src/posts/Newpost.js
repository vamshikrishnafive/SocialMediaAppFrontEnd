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
    
    clickToSubmit = event => {
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
        <div class="row">
            <form class="col s12">
                    <div class="row">
                    <div class="col s12">
                        <div class="row">
                            <div class="input-field col s12">
                            <input 
                                type = "text" 
                                className = " from-control" 
                                onChange = {this.handleChange("title")}
                                value = {title}
                            />
                            <label for="Title">Title</label>
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
                            </div>
                        </div>
                    </div>
                </div>
                        <div class = "row">
                            <label>Post</label>
                            <div class = "file-field input-field">
                                <div class = "btn btn-raised btn-primary blue left">
                                    <span>upload</span>
                                    <input
                                        onChange={this.handleChange("photo")}
                                        type="file"
                                        accept="image/*"
                                    />
                                </div>
                  
                                <div class = "file-path-wrapper">
                                    <input class = "file-path validate" type = "text"
                                        placeholder = "Add your file" />
                                </div>
                            </div>
                        </div>
                <button 
                    onClick = {this.clickToSubmit} 
                    className = "btn waves-effect waves-light blue right" >
                    CreatePost<i class="material-icons right">file_upload</i>
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
                    className = "btn red"
                    style = {{display : error ? "" : "none"}}>
                {error}
                </div>
                {loading ? 
                    (<div className =  'center'>
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
                    </div> : </div>
                    ):(
                    ""
                )}
                {this.newPostForm(title, body)}
            </div>
        )
    }
}

export default Newpost