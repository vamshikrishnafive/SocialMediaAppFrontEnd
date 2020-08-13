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
    
    clickSubmit = event => {
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

    signupForm = ( name, email, password, about) => (
        <form>
      <div className="form-group">
        <label className="text-muted">Profile Photo</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={this.handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">About</label>
        <textarea
          onChange={this.handleChange("about")}
          type="text"
          className="form-control"
          value={about}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Update
      </button>
    </form>
    )

    render() {
        const { id, name, email, password, redirectToProfile,error, about, loading } = this.state
        if(redirectToProfile) {
            return <Redirect to = {`/user/${id}`} />
        }

        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`: DefaultImage;

        return (
            <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
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

        <img
          style={{ height: "200px", width: "auto" }}
          className="img-thumbnail"
          src={photoUrl}
          onError={i => (i.target.src = `${DefaultImage}`)}
          alt={name}
        />

        {isAuthenticated().user.role === "admin" &&
          this.signupForm(name, email, password, about)}

        {isAuthenticated().user._id === id &&
          this.signupForm(name, email, password, about)}
      </div>
        )
    }
}

export default EditProfile  