import React, { Component } from 'react'
import M from "materialize-css"

import { isAuthenticated, signout } from '../auth'
import { remove } from './api.user'
import { Redirect } from 'react-router-dom'

class DeleteUser extends Component {

    state = {
        redirect:false,
        posts: ""
    }

    deleteAccout = () => {
        const token = isAuthenticated().token
        const userId = this.props.userId
        remove(userId, token).then(data => {
            if (data.error) {
                M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
            } else {
                signout(() => console.log('deleted..'))
                this.setState({redirect:true, posts: ""})
                M.toast({html: "Sucessfully Removed", classes:"#66bb6a green lighten-1"})
            }
        })
    }

    deleteConfirmed = () => {
        let anwser = window.confirm('Are you Sure')
        if(anwser){
            this.deleteAccout()
        }
    }

    render() {
        const { redirect } = this.state
        if(redirect) {
            return <Redirect to="/" />
        }
        return (
            <button
                onClick={this.deleteConfirmed}
                className="btn btn-raised btn-danger"
            >
                Delete Profile
            </button>        
            )
    }
}

export default DeleteUser