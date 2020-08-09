import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import M from "materialize-css"

import { signin, authenticate } from "../auth"
import SocialLogin from "./SocialLogin";

class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            redirectToReferer: false,
            loading: false
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value, loading:false})
    }

    clickToSubmit = event => {
        event.preventDefault()
        this.setState({ loading: true })
        const { email, password } = this.state
        const user = {
            email,
            password
        }
        signin(user)
            .then(data => {
                if (data.error) { M.toast({html: data.error, classes:"#ef5350 red lighten-1"}) }
                else {
                authenticate(data, () => {
                    this.setState({ redirectToReferer: true })
                    M.toast({html: "Sucessfully Logined", classes:"#66bb6a green lighten-1"})
                })
                }
            })
    }

    SigninForm = (email, password,) => (
        <div className = "myCard">
            <div className="card auth-card input-field">
                <h1> Instagram </h1>    
                <input
                    type="text"
                    className = "from-control" 
                    onChange={this.handleChange("email")}
                    value={email}
                    placeholder = "Email"
                />
                
                <input
                    type="password"
                    onChange={this.handleChange("password")}
                    value={password}
                    placeholder = "password"
                />
                <button onClick={this.clickToSubmit} className="btn waves-effect waves-light #1e88e5 blue darken-1" >Submit </button>
                <SocialLogin />
                {this.state.loading ? (<p>
                    <Link to='/forgotpassword' className="btn float-right center">
                        {" "}
                        forgotPassword
                    </Link>
                </p>) : (" ")}
                <h5><Link to = "/signup">Create Account..!</Link></h5>         
            </div>
        </div>
    )

    render() {
        const { email, password, error, redirectToReferer, loading } = this.state

        if (redirectToReferer) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}>
                    {error}
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
                    </div></div> : ""}

                {this.SigninForm(email, password,)}
            </div>
        )
    }

}

export default Signin