import React, { Component } from "react";
import GoogleLogin from "react-google-login";

import { authenticate, socialLogin } from "../auth";
import { Redirect } from "react-router-dom";

class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        }
    }
    responseGoogle = response => {
        console.log(response);
        const { googleId, name, email, imageUrl } = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        };
        socialLogin(user).then(data => {
            if (data.error) {
                console.log("Error Login. Please try again..");
            } else {
                console.log("signin success - setting jwt: ", data);
                authenticate(data, () => {
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };
    render() {
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }
        return(
            <div className="container">
                <GoogleLogin
                    clientId="562567583254-b3jofpa3hsavf1kitu2in0460k1qq4s4.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>
        )
    }
}

export default SocialLogin

// SECRET:HcNGrJiruTw3rYuxy0JPGoNU