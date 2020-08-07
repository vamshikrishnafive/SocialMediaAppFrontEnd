import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

import { signin, authenticate } from "../auth"
import SocialLogin from "./SocialLogin";

class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        }
    }

    handleChange = name => event => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
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
                if (data.error) this.setState({ error: data.error, loading: false })
                else {
                    authenticate(data, () => {
                        this.setState({ redirectToReferer: true })
                    })
                }
            })
    }

    SigninForm = (email, password,) => (
        <form>
            <div className="from-group">
                <label className="text-muted"> email </label>
                <input
                    type="text"
                    className="from-control"
                    onChange={this.handleChange("email")}
                    value={email}
                />
            </div>
            <div className="from-group">
                <label className="text-muted"> password </label>
                <input
                    type="password"
                    className="from-control"
                    onChange={this.handleChange("password")}
                    value={password}
                />
            </div>
            <button onClick={this.clickToSubmit} className="btn btn-raised btn-primary" >Submit </button>
        </form>
    )

    render() {
        const { email, password, error, redirectToReferer, loading } = this.state

        if (redirectToReferer) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5"> Signin </h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                <SocialLogin />
                <hr />
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
                <p>
                    <Link to='/forgotpassword' className="btn float-right">
                        {" "}
                        forgotPassword
                    </Link>
                </p>
            </div>
        )
    }

}

export default Signin