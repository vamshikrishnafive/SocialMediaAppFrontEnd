import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import M from "materialize-css"

import { signup } from "../auth"

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            open: false,
            redirectToReferer:false,
            loading: false
        }
    }

    handleChange = name => event => {
        this.setState({loading: false})
        this.setState({[name]:event.target.value})
    }
    
    clickToSubmit = event => {
        event.preventDefault()
        this.setState({loading:true})
        const { name, email, password } = this.state
        const user = {
            name ,
            email,
            password
        }
        signup(user)
            .then(data => {
                if(data.error) {
                    this.setState({loading:true})
                    M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
            }
                else this.setState({
                        name:"",
                        email:"",
                        password:"",
                        open:true,
                        redirectToReferer:true
                    })
                    M.toast({html: data.message, classes:"#66bb6a green lighten-1"})
            })
    }

    SignupForm = ( name, email, password,) => (
        <div className = "myCard">
            <div className="card auth-card input-field">
                <h1> Instagram </h1>  

                <input 
                    type = "text" 
                    className = "from-control" 
                    onChange = {this.handleChange("name")}
                    value = {name}
                    placeholder = "Name"
                />

                <input 
                    type = "text" 
                    className = "from-control" 
                    onChange = {this.handleChange("email")}
                    value = {email}
                    placeholder = "Email"
                />

                <input 
                    type = "password" 
                    className = "from-control" 
                    onChange = {this.handleChange("password")}
                    value = {password}
                    placeholder = "Password"
                />

                <button 
                    onClick = {this.clickToSubmit} 
                    className="btn waves-effect waves-light #1e88e5 blue darken-1" 
                    onClick = {this.clickToSubmit}>
                    Signup
                </button>
              
            </div>
        </div>
    )

    render(){
        const { name, email, password, error, open, redirectToReferer,loading } = this.state

        if(redirectToReferer){
            return <Redirect to = "/signin"/>
        }

        return (
            <div className = "container">
                <div 
                    className = "left"
                    style = {{display : error ? "" : "none"}}>
                {error}
                </div>
                <div 
                    className = "alert alert-info"
                    style = {{display : open ? "" : "none"}}>
                    New Account is created please 
                    <Link to = "/signin"> Sigin in</Link>
                </div>
                {loading ? <div className =  'center'>
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
                    </div></div>: ""}
                {this.SignupForm( name, email, password,)}
            </div>

        )
    }

}

export default Signup