import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

export default function Navbar(props) {

  
  return (
    <>
    <nav className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-light">
            <li className="nav-item text-light">
              <Link className={`nav-link ${props.fnt}`} aria-current="page" to="/">{props.nav1}</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${props.fnt}`} to="/theme">{props.nav2}</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${props.fnt}`} to="/news">
                {props.nav3}
              </Link>
              </li>
              <li className="nav-item">
              <Link className={`nav-link ${props.fnt}`} to="/business">Business</Link></li>
              <li className="nav-item">
              <Link className={`nav-link ${props.fnt}`} to="/entertainment">Entertainment</Link></li>
              <li className="nav-item">
              <Link className={`nav-link ${props.fnt}`} to="/health">Health</Link></li>
              <li className="nav-item">
              <Link className={`nav-link ${props.fnt}`} to="/science">Science</Link></li>
              <li className="nav-item">
              <Link className={`nav-link ${props.fnt}`} to="/sports">Sports</Link></li>
              <li className="nav-item">
              <Link className={`nav-link ${props.fnt}`} to="/technology">Technology</Link></li>
          </ul>
          <button type='button' className='btn btn-primary mx-1' onClick={props.setColorP}></button>
          <button type='button' className='btn btn-success mx-1' onClick={props.setColorG}></button>
          <button type='button' className='btn btn-danger mx-1' onClick={props.setColorR}></button>
          <button type='button' className='btn btn-warning mx-1' onClick={props.setColorY}></button>
          
          <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
            <input className="form-check-input" type="checkbox" onClick={props.modeChanged} role="switch" id="flexSwitchCheckDefault"/>
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode Enabled</label>
          </div>         
        </div>
      </div>
    </nav>
    
    </>
  )
}

//Restrictions for your properties
Navbar.prototype = {
  nav1: PropTypes.string,
  nav2: PropTypes.string,
  nav3: PropTypes.string
}

Navbar.defaultProps = {
  nav1: "Nav1",
  nav2: "Nav2",
  nav3: "Nav3"
}