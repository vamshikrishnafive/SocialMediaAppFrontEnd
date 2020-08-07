import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import { singlePost, update } from './api.post'
import { isAuthenticated } from '../auth';
import DefaultePost from '../images/beauty.jpg'

class EditPost extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            title: "",
            body: "",
            error: "",
            loading: false,
            redirectToProfile: false,
            fileSize : 0
        }
    }

    init = postId => {
        singlePost(postId).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true })
            } else {
                this.setState({ 
                    id: data.postedBy._id,
                    title: data.title,
                    body: data.body,
                    error: ""
                })
            }
        })
    }

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId
        this.init(postId)
    }

    isValid = () => {
        const { title, body, fileSize} = this.state
        if(fileSize > 100000){
            this.setState({
                error:"File size shoulde less than 100kb"
            })
            return false
        }
        if(title.length === 0 || body.length === 0){
            this.setState({
                error:"All fields are required", loading: false
            })
            return false
        }
        return true
    }

    handleChange = name => event => {
        this.setState({error: ""})
        const value = name === "photo" ? event.target.files[0] : event.target.value
        const fileSize = name === "photo" ? event.target.files[0].size : 0
        this.postData.set(name, value)
        this.setState({ [name]: value, fileSize })
    }
    
    clickToSubmit = event => {
        event.preventDefault()
        this.setState({loading:true})
        const { title, body } = this.state
        if (this.isValid()) {
            const postId = this.props.match.params.postId
            const token = isAuthenticated().token
            
            update(postId, token, this.postData).then(data => {
                if (data.error) this.setState({ 
                    error: data.error 
                })
                else this.setState({
                    loading: false,
                    title: "",
                    body: "",
                    redirectToProfile: true
                });
            })
        }
    }

    editPostForm = ( title, body ) => (
        <form>
        <div className = "from-group">
            <label className = "text-muted"> Title </label>
            <input 
                type = "text" 
                className = "from-control" 
                onChange = {this.handleChange("title")}
                value = {title}
            />
        </div>
        <div className = "from-group">
            <label className = "text-muted"> Body </label>
            <input 
                type = "text" 
                className = "from-control" 
                onChange = {this.handleChange("body")}
                value = {body}
            />
        </div>
        <div className="form-group">
            <label className="text-muted">Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
        </div>
        <button 
            onClick = {this.clickToSubmit} 
            className = "btn btn-raised btn-primary" >
            Update Post 
        </button>
    </form>
    )

    render() {
        const { id, title, body, redirectToProfile, error,loading } = this.state
        if(redirectToProfile) {
            return <Redirect to = {`/user/${isAuthenticated().user._id}`} />
        }
        return(
            <div>
            <h2>{title}</h2>
            <div 
                    className = "alert data-error"
                    style = {{display : error ? "" : "none"}}>
                {error}
                </div>
                {loading ? (<div className =  'center'>
                    <div class="preloader-wrapper big active">
                        <div class="spinner-layer spinner-blue">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>

                        <div class="spinner-layer spinner-red">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>

                        <div class="spinner-layer spinner-yellow">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>

                        <div class="spinner-layer spinner-green">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div> : </div>):("")
                }
            <img 
                src = {`${process.env.REACT_APP_API_URL}/post/photo/${id}}`}
                onError = {i => (i.target.src = `${DefaultePost}`)}
                alt = {title} 
                style = {{height: "200px", width: 'auto'}}
                className = "img-thumbnali"
            />
            {this.editPostForm(title, body)}
            </div>
        )
    }
}

export default EditPost