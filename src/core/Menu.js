import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { signout, isAuthenticated } from "../auth"

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#FFFFFF' }
    else return { color: '#263238' }
}

const Menu = ({ history }) => (
    <div className="navbar-fixed">
        <nav>
            <div className="nav-wrapper">
                <Link className="brand-logo blue-black" style={isActive(history, '/')} to="/"> Home </Link>  
                {/* <a href="#!" className="brand-logo">Logo</a> */}
                <ul className="right hide-on-med-and-down">
                    <li className="nav-item  blue-black"><Link style={isActive(history, '/users')} to="/Users"> Users </Link></li>
                    <li 
                        className="nav-item">
                        <Link
                            to={`/post/create`}
                            className="nav-link blue-black"
                            style={isActive(history, `/post/create`)}>
                            New Post
                        </Link>
                    </li>
                    {!isAuthenticated() && (
                        <>
                            <li className="nav-item blue-black"><Link style={isActive(history, '/signin')} to="/signin"> Sign In </Link></li>
                            <li className="nav-item"><Link style={isActive(history, '/signup')} to="/signup"> Sign Up </Link></li>
                        </>
                    )}
                    {isAuthenticated() && (
                        <>
                            <li className="nav-item blue-black">
                                <Link
                                    to={`/findpeople`}
                                    style={isActive(history, `/findpeople`)}>
                                    FindPeople
                                </Link>
                            </li>
                            <li className="nav-item blue-black">
                                <Link
                                    to={`/user/${isAuthenticated().user._id}`}
                                    style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
                                    {`${isAuthenticated().user.name}'s Profile`}
                                </Link>
                            </li>
                            <li className="nav-item blue-black ">
                                <Link to="" style={isActive(history, 'signout'), 
                                    { cursor: 'pointer', color: 'black' }} 
                                    onClick={() => 
                                        signout(() => 
                                            history.push('/')
                                            )}
                                > 
                                Sign out 
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    </div>
)

export default withRouter(Menu)

