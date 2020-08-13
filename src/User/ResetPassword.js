import React, { Component } from "react";
import M from "materialize-css"

import { resetPassword } from "../auth/index";

class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            newPassword: "",
            message: "",
            error: ""
        }
    }

    handleChange  = event => {
        this.setState({
            newPassword: event.target.value,
            message: "",
            error: ""
        })
    }

    resetPassword = event => {
        event.preventDefault();
        this.setState({message: "", error: ""})

        resetPassword({
            newPassword:this.state.newPassword,
            resetPasswordLink: this.props.match.params.resetPasswordToken
        }).then(data => {
            if(data.error) {
                M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
                this.setState({error: data.error, newPassword: ""})
            } else {
                M.toast({html: data.message, classes:"#ef5350 red lighten-1"})
                this.setState({message: data.message, newPassword: ""})
            }
        })
    }

    render() {
        const { newPassword, message, error } = this.state
        return (
            <div className="container">
            <h2 className="mt-5 mb-5">Reset your Password</h2>

            {this.state.message && (
                <h4 className="bg-success">{this.state.message}</h4>
            )}
            {this.state.error && (
                <h4 className="bg-warning">{this.state.error}</h4>
            )}

            <form
                style={{ display: this.state.message.length ? "none" : "" }}
            >
                <div className="form-group mt-5">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Your new password"
                        value={this.state.newPassword}
                        name="newPassword"
                        onChange={e =>
                            this.setState({
                                newPassword: e.target.value,
                                message: "",
                                error: ""
                            })
                        }
                        autoFocus
                    />
                </div>
                <button
                    onClick={this.resetPassword}
                    className="btn btn-raised btn-primary"
                >
                    Reset Password
                </button>
            </form>
        </div>
        )
    }
}

export default ResetPassword