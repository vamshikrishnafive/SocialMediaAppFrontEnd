import React, { Component } from "react";
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
                console.log(data.error);
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
                    followMessage: `Following ${user.name}`
                });
            }
        });
    };

    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card col md-4" key={i}>
                    <img
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                        alt={user.name}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        style={{ height: "200px", width: "auto" }}
                        className="circle center responsive-img" 
                    />
                        <h4 className="center card-title">{user.name}</h4>
                        <div className="card-content">
                        <p>{user.email}</p>
                        </div>
                        <div className = "card-action">
                        <Link
                            to={`/user/${user._id}`}
                            className="btn float-leftwaves-effect waves-light btn-small blue">
                            View Profile
                        </Link>
                        <button
                            onClick={() => this.clickFollow(user, i)}
                            className="waves-effect waves-light btn-small red">
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
                <h2 className="col s12">Find People</h2>

                {open && (
                    <div className="flow-text">{followMessage}</div>
                )}

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default FindPeople;