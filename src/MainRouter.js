import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from "./core/Home"
import Signup from './User/Signup'
import Signin from './User/Signin'
import Menu from './core/Menu'
import Profile from './User/Profile'
import Users from './User/Users'
import EditProfile from './User/EditProfile'
import PrivateRoute from './auth/PrivateRoute'
import FindPeople from './User/FindPeople'
import Newpost from './posts/Newpost'
import DeleteUser from './User/DeleteUser'
import SinglePost from './posts/SinglePost'
import EditPost from './posts/Editpost'
import ForgotPassword from './User/ForgotPassword'
import ResetPassword from './User/ResetPassword'

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path = "/" component = {Home} />
            <PrivateRoute exact path = "/post/create" component = {Newpost} />
            <Route exact path = "/post/:postId" component = {SinglePost} />
            <PrivateRoute exact path = "/post/edit/:postId" component = {EditPost} />
            <Route exact path = "/users" component = {Users} />
            <Route exact path = "/signup" component = {Signup} />
            <Route exact path = "/signin" component = {Signin} />
            <Route exact path = "/forgotpassword" component = {ForgotPassword} />
            <Route exact path = "/resetpassword/:resetPasswordToken" component = {ResetPassword} />
            <PrivateRoute exact path = "/user/:userId" component = {Profile} />
            <PrivateRoute exact path = "/findpeople" component = {FindPeople} />
            <PrivateRoute exact path = "/user/edit/:userId" component = {EditProfile} />
            <PrivateRoute exact path = "/user/deleete/:userId" component = {DeleteUser} />
        </Switch>
    </div>
)

export default MainRouter