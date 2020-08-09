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
            <div className="nav-wrapper white">
                <Link className="brand-logo blue-black" style={isActive(history, '/')} to="/"> instagram </Link> 
                <ul className="right hide-on-med-and-down">
                    <li 
                        className="nav-item  blue-black">
                        <Link 
                            style={isActive(history, '/users')} 
                            to="/Users"> 
                            <i class="material-icons">person</i>
                        </Link>
                    </li>
                    <li 
                        className="nav-item">
                        <Link
                            to={`/post/create`}
                            className="nav-link blue-black"
                            style={isActive(history, `/post/create`)}>
                            <i class="material-icons">fiber_new</i>
                        </Link>
                    </li>
                    {!isAuthenticated() && (
                        <>
                            <li className="nav-item blue-black"><Link style={isActive(history, '/signin')} to="/signin"><i class="material-icons">mood</i></Link></li>
                            <li className="nav-item"><Link style={isActive(history, '/signup')} to="/signup"><i class="material-icons">person_add</i></Link></li>
                        </>
                    )}
                    {isAuthenticated() && (
                        <>
                            <li className="nav-item blue-black">
                                <Link
                                    to={`/findpeople`}
                                    style={isActive(history, `/findpeople`)}>
                                    <i class="material-icons">near_me</i>
                                </Link>
                            </li>
                            <li className="nav-item blue-black">
                                <Link
                                    to={`/user/${isAuthenticated().user._id}`}
                                    style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
                                    {`${isAuthenticated().user.name}`}
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
                                <i class="material-icons">mood_bad</i>
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

