import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import M from "materialize-css"

import { isAuthenticated } from '../auth';
import { read, update, updateUser } from './api.user';
import DefaultImage from '../images/download.png'


class  EditProfile extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            error: "",
            password: "",
            fileSize: 0,
            about: "",
            loading: false,
            redirectToProfile: false
        }
    }

    init = userId => {
        const token = isAuthenticated().token
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true })
            } else {
                this.setState({ 
                    id: data._id,
                    name: "",
                    email: "",
                    about: "",
                    error: ""
                })
            }
        })
    }

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    isValid = () => {
        const { name, email, password, fileSize} = this.state
        if(fileSize > 100000){
            this.setState({error:"File size shoulde less than 100kb"})
            return false
        }
        if(name.length === 0){
            this.setState({error:"Name is require", loading: false})
            return false
        }
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            this.setState({error:"Email is require", loading: false})
            return false
        }
        if(password.length >= 1 && password.length <= 5){
            this.setState({error:"Password is require", loading: false})
            return false
        }
        return true
    }

    handleChange = name => event => {
        this.setState({error: ""})
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        const fileSize = name === 'photo' ? event.target.files[0].size : 0
        this.userData.set(name, value)
        this.setState({ [name]: value, fileSize })
    }
    
    clickToSubmit = event => {
        event.preventDefault()
        this.setState({loading:true})
        if (this.isValid()) {
            const { name, email, password } = this.state
            const userId = this.props.match.params.userId
            const token = isAuthenticated().token

            update(userId, token, this.userData)
                .then(data => {
                    if (data.error) {M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
                }
                    else updateUser(data,() => { 
                        this.setState({ redirectToProfile: true }) 
                        M.toast({html: "Sucessfully Updated", classes:"#66bb6a green lighten-1"})
                        })
                })
        }
    }

    EditForm = ( name, email, password, about) => (
        <div class="row">
        <form class="col s12">
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
        <div class="row">
                    <div class="col s12">
                        <div class="row">
                            <div class="input-field col s12">
                            <input 
                                type = "text" 
                                className = " from-control" 
                                onChange = {this.handleChange("name")}
                                value = {name}
                            />
                            <label for="name">Name</label>
                            </div>
                        </div>
                    </div>
                </div>
        <div class="row">
            <div class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                    <input 
                        type = "email" 
                        className = " from-control" 
                        onChange = {this.handleChange("email")}
                        value = {email}
                    />
                    <label for="Title">email</label>
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
                        onChange = {this.handleChange("about")}
                        value = {about}
                    />
                    <label for="text">About</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                    <input 
                        type = "password" 
                        className = "from-control" 
                        onChange = {this.handleChange("password")}
                        value = {password}
                    />
                    <label for="text">Password</label>
                    </div>
                    <button 
                        onClick = {this.clickToSubmit} 
                        className = "btn btn-raised btn-primary blue right">
                        Update
                        <i class="material-icons right">
                        update
                        </i> 
                    </button>
                </div>
            </div>
        </div>
    </form>
    </div>
    )

    render() {
        const { id, name, email, password, redirectToProfile,error, about, loading } = this.state
        if(redirectToProfile) {
            return <Redirect to = {`/user/${id}`} />
        }

        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`: DefaultImage;

        return (
            <div className = "container">
                <h2> EditProfile </h2>
                <div 
                    className = "alert data-error"
                    style = {{display : error ? "" : "none"}}>
                {error}
                </div>
                {loading ? (<div className =  'center'>
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
                    </div> : </div>):("")
                }
                <img 
                    src = {photoUrl}
                    onError = {i => (i.target.src = `${DefaultImage}`)}
                    alt = {name} 
                    style = {{height: "200px", width: 'auto'}}
                    className = "image"
                    />
                {this.EditForm( name, email, password, about)}
            </div>
        )
    }
}

export default EditProfile  