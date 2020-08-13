import React, { Component } from "react";
import M from "materialize-css"

import { findPeople, follow } from "./api.user";
import DefaultProfile from "../images/download.png";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

class FindPeople extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            error: "",
            open: false
        };
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        findPeople(userId, token).then(data => {
            if (data.error) {
                M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
            } else {
                this.setState({ users: data });
            }
        });
    }

    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        follow(userId, token, user._id).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                let toFollow = this.state.users;
                toFollow.splice(i, 1);
                this.setState({
                    users: toFollow,
                    open: true,
                });
                M.toast({html: `Following ${user.name}`, classes:"#66bb6a green lighten-1"})

            }
        });
    };

    renderUsers = users => (
        <div className="row">
        {users.map((user, i) => (
            <div className="card col-md-4" key={i}>
                <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${
                        user._id
                    }`}
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                    alt={user.name}
                />
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                    <Link
                        to={`/user/${user._id}`}
                        className="btn btn-raised btn-primary btn-sm"
                    >
                        View Profile
                    </Link>

                    <button
                        onClick={() => this.clickFollow(user, i)}
                        className="btn btn-raised btn-info float-right btn-sm"
                    >
                        Follow
                    </button>
                </div>
            </div>
        ))}
    </div>
    );

    render() {
        const { users, open, followMessage } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Find People</h2>

                {open && (
                    <div className="alert alert-success">{followMessage}</div>
                )}

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default FindPeople;