import React, { Component } from "react";
import M from "materialize-css"

import { forgotPassword } from "../auth/index";

class ForgotPassword extends Component {
    state = {
        email : "",
        message : "",
        error: ""
    }
    handleChange  = event => {
        this.setState({
            email: event.target.value,
            message: "",
            error: ""
        })
    }

    forgotPassword = event => {
        event.preventDefault();
        this.setState({message: "", error: ""})
        
        forgotPassword(this.state.email).then(data => {
            if(data.error) {
                M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
                this.setState({error: data.error})
            } else {
                console.log(data.messag);
                this.setState({message: data.messag})
            }
        })
    }

    render() {
        const { email, message, error } = this.state
        return (
            <div className="container">
            <h2 className="mt-5 mb-5">Ask for Password Reset</h2>

            {this.state.message && (
                <h4 className="bg-success">{this.state.message}</h4>
            )}
            {this.state.error && (
                <h4 className="bg-warning">{this.state.error}</h4>
            )}

            <form>
                <div className="form-group mt-5">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Your email address"
                        value={this.state.email}
                        name="email"
                        onChange={e =>
                            this.setState({
                                email: e.target.value,
                                message: "",
                                error: ""
                            })
                        }
                        autoFocus
                    />
                </div>
                <button
                    onClick={this.forgotPassword}
                    className="btn btn-raised btn-primary"
                >
                    Send Password Rest Link
                </button>
            </form>
        </div>
        )
    }
}

export default ForgotPassword