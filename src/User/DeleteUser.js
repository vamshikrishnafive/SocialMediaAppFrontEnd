import React, { Component } from 'react'
import { isAuthenticated, signout } from '../auth'
import { remove } from './api.user'
import { Redirect } from 'react-router-dom'

class DeleteUser extends Component {

    state = {
        redirect:false
    }

    deleteAccout = () => {
        const token = isAuthenticated().token
        const userId = this.props.userId
        remove(userId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                signout(() => console.log('deleted..'))
                this.setState({redirect:true})
                
            }
        })
    }

    deleteComfirmed = () => {
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
                className="waves-effect waves-light btn-small #0d47a1 black darken-4 left" 
                onClick = {this.deleteComfirmed} 
                > <i class="material-icons">delete_sweep</i> </button>
        )
    }
}

export default DeleteUser