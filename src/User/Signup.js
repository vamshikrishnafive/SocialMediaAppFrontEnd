import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import M from "materialize-css"

import { signup, socialLogin } from "../auth"
import SocialLogin from './SocialLogin'

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
    
    clickSubmit = event => {
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

    signupForm = ( name, email, password,) => (
        <form>
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
            <label className="text-muted">Password</label>
            <input
                onChange={this.handleChange("password")}
                type="password"
                className="form-control"
                value={password}
            />
        </div>

        <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
        >
            Submit
        </button>
    </form>
    )

    render(){
        const { name, email, password, error, open, redirectToReferer,loading } = this.state

        if(redirectToReferer){
            return <Redirect to = "/signin"/>
        }

        return (
            <div className="container">
            <h2 className="mt-5 mb-5">Signup</h2>

            <hr />
            <SocialLogin />

            <hr />
            <br />

            <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
            >
                {error}
            </div>

            <div
                className="alert alert-info"
                style={{ display: open ? "" : "none" }}
            >
                New account is successfully created. Please{" "}
                <Link to="/signin">Sign In</Link>.
            </div>

            {this.signupForm(name, email, password)}
        </div>

        )
    }

}

export default Signup