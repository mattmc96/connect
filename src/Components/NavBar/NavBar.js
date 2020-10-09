import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from '../../Components/Auth/LoginButton'
import LogoutButton from '../../Components/Auth/LogoutButton'
import JSONPretty from 'react-json-pretty'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import GithubRepoFetch from '../Data/githubRepoFetch'
import Logo from '../../assets/connect_logo.png'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { SidebarData } from './SidebarData'
import './Navbar.scss'
import { IconContext } from 'react-icons'

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  const { user, isAuthenticated } = useAuth0()
  return (
    isAuthenticated && (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <>
              <h1 className="header">Connect</h1>
              <img src={Logo} class="img-responsive" alt="responsive image" />
              <h1>Welcome! {user.email}</h1>
              <Avatar src={user.picture} alt={user.name} className="avatar" />
            </>
            <span className="Auth-box"></span>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <di className="Auth-box">
              <LoginButton />
              <LogoutButton />
            </di>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </IconContext.Provider>
        {/* return ( isAuthenticated && (
      <p>
        <Avatar src={user.picture} alt={user.name} />
        <p>{user.email}</p>

        <JSONPretty data={user} />
      </p>
      ) ) */}
        {/* <di className="GithubRepoFetch">
        <GithubRepoFetch />
      </di> */}
      </>
    )
  )
}

export default Navbar
