import React, { Component } from "react"

import { list } from "./api.user"
import DefaultImage from '../images/download.png'
import { Link } from "react-router-dom"

class Users extends Component {
    constructor() {
        super()
        this.state = ({
            users: []
        })
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({ users: data })
            }
        })
    }

    renderUser = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card col s1 m2" key = {i}>
                    <img 
                        src = {`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                        onError = {i => (i.target.src = `${DefaultImage}`)}
                        alt = {user.name} 
                        style = {{height: "200px", width: 'auto'}}
                        className = "circle center responsive-img"
                    />
                <h4 className="center card-title blue-text text-darken-4">{user.name}</h4>
                <div className="center card-action">
                <Link to={`user/${user._id}`}>view Profile</Link>
                </div>

                </div>
            ))}
        </div>

        // <div class="row">
        //     {users.map((user, i) => (
        //     <div class="col s12 m6" key = {i}>
        //         <div class="card">
        //             <div class="card-image">
        //             <img 
        //                 src = {`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
        //                 onError = {i => (i.target.src = `${DefaultImage}`)}
        //                 alt = {user.name} 
        //                 style = {{height: "200px", width: 'auto'}}
        //             />
        //             <span class="card-title">{user.name}</span>
        //             <Link to={`user/${user._id}`} class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></Link>
        //             </div>
        //             <div class="card-content">
        //                 <p>{user.name}</p>
        //             </div>
        //         </div>
        //     </div>
        //     ))}
        // </div>
    )

    render() {
        const { users } = this.state
        return (
            <div className="row">
                <h2 className="col s12">All User</h2>
                {this.renderUser(users)}
            </div>
        )
    }
}

export default Users