import React from "react"
import { NavLink } from "react-router-dom"
import Wrapper from "../styles/Navbar"
import GoogleAuth from "./GoogleAuth"
import { AppsIcon, HamburgerIcon, LogoIcon, SettingsIcon } from "./Icons"
import { useAuth } from "../context/auth-context"

function Navbar({ toggleSidebarOpen }) {
  const user = useAuth()

  return (
    <Wrapper>
      <div className="logo flex-row">
        <HamburgerIcon onClick={toggleSidebarOpen} className="toggle-navhandler" />
        <span>
          <NavLink to="/">
            <LogoIcon
              style={{
                width: 80,
                height: 24,
              }}
            />
          </NavLink>
        </span>
      </div>

      <ul>
        <li>{user ? <AppsIcon /> : <SettingsIcon />}</li>
        <li>
          <GoogleAuth />
        </li>
      </ul>
    </Wrapper>
  )
}

export default Navbar
