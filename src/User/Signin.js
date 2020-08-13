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

    clickSubmit = event => {
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

    signinForm = (email, password,) => (
        <form>
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

    render() {
        const { email, password, error, redirectToReferer, loading } = this.state

        if (redirectToReferer) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">SignIn</h2>
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

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                {this.signinForm(email, password)}

                <p>
                    <Link
                        to="/forgotpassword"
                        className="btn btn-raised btn-danger"
                    >
                        {" "}
                        Forgot Password
                    </Link>
                </p>
            </div>
        )
    }

}

export default Signin