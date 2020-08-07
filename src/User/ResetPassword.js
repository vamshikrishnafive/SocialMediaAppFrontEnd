import React, { Component } from "react";

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
                console.log(data.error)
                this.setState({error: data.error, newPassword: ""})
            } else {
                console.log(data.message)
                this.setState({message: data.message, newPassword: ""})
            }
        })
    }

    render() {
        const { newPassword, message, error } = this.state
        return (
        <div className = "container"> 
            <div className = "row">
                <h2 className = "header">Reset Your Password</h2>
                {error 
                    ? 
                    (<h4 classNam = "warning">{error}</h4>) 
                    : 
                    (<h4 className = 'message'>{message}</h4>)
                }
                <form className="col s12">
                    <div className="row">
                        <div className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your new password..>"
                                    value={newPassword}    
                                    onChange={this.handleChange}
                                    autoFocus
                                />
                                <button 
                                    className = "btn waves-effect waves-light right blue"
                                    onClick = {this.resetPassword}
                                >
                                    Set 
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

export default ResetPassword