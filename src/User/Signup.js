import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

import { signup } from "../auth"

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
            redirectToReferer:false,
            loading: false
        }
    }

    handleChange = name => event => {
        this.setState({error: "", loading: false})
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
                if(data.error) this.setState({error:data.error, loading:true})
                else this.setState({
                        error:"",
                        name:"",
                        email:"",
                        password:"",
                        open:true,
                        redirectToReferer:true
                    })
            })
    }

    SignupForm = ( name, email, password,) => (
        <form>
        <div className = "from-group">
            <label className = "text-muted"> Name </label>
            <input 
                type = "text" 
                className = "from-control" 
                onChange = {this.handleChange("name")}
                value = {name}
            />
        </div>
        <div className = "from-group">
            <label className = "text-muted"> email </label>
            <input 
                type = "text" 
                className = "from-control" 
                onChange = {this.handleChange("email")}
                value = {email}
            />
        </div>
        <div className = "from-group">
            <label className = "text-muted"> password </label>
            <input 
                type = "password" 
                className = "from-control" 
                onChange = {this.handleChange("password")}
                value = {password}
            />
        </div>
        <button onClick = {this.clickToSubmit} className = "btn btn-raised btn-primary" >Submit </button>
    </form>
    )

    render(){
        const { name, email, password, error, open, redirectToReferer,loading } = this.state

        if(redirectToReferer){
            return <Redirect to = "/signin"/>
        }

        return (
            <div className = "container">
                <h2 className = "mt-5 mb-5"> Signup </h2>
                <div 
                    className = "alert alert-danger"
                    style = {{display : error ? "" : "none"}}>
                {error}
                </div>
                <div 
                    className = "alert alert-info"
                    style = {{display : open ? "" : "none"}}>
                New Account is created please <Link to = "/signin"> Sigin in</Link>
                </div>
                {loading ? <div className = "jumbotron text-center"><h2> loading...</h2></div>: ""}
                {this.SignupForm( name, email, password,)}
            </div>

        )
    }

}

export default Signup