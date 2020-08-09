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
        <div className = "container"> 
            <div className = "row">
                <h2 className = "header">Ask for Password Reset</h2>
                {message && (
                    <h4 className="message">{message}</h4>
                )}
                {error && (
                    <h4 className="warning">{error}</h4>
                )}
                <form className="col s12">
                    <div className="row">
                        <div className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Your email address..>"
                                    value={email}    
                                    onChange={this.handleChange}
                                    autoFocus
                                />
                                <button 
                                    className = "btn waves-effect waves-light right blue"
                                    onClick = {this.forgotPassword}
                                >
                                    send 
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div> 
        )
    }
}

export default ForgotPassword