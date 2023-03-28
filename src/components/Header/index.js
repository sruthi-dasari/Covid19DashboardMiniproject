import './index.css'

import {RiMenuFoldFill} from 'react-icons/ri'
import {IoMdCloseCircle} from 'react-icons/io'

import {Link, withRouter} from 'react-router-dom'

import {Component} from 'react'

class Header extends Component {
  state = {
    showMenu: false,
  }

  onClickMenu = () => {
    this.setState({showMenu: true})
  }

  onClickClose = () => {
    this.setState({showMenu: false})
  }

  render() {
    const {showMenu} = this.state

    const {location} = this.props

    const activeHome = location.pathname === '/' ? 'active-home' : ''
    const activeAbout = location.pathname === '/about' ? 'active-about' : ''

    return (
      <ul className="header-container">
        <li className="top-header-container">
          <Link to="/" className="link-item">
            <h1 className="logo-heading">
              COVID19<span className="india-text">INDIA</span>
            </h1>
          </Link>

          <button
            type="button"
            className="menu-button"
            onClick={this.onClickMenu}
          >
            <RiMenuFoldFill className="menu-icon" />
          </button>
          <div className="home-about-container">
            <Link to="/" className="link-item">
              <button type="button" className={`home-about-btn ${activeHome}`}>
                Home
              </button>
            </Link>
            <Link to="/about" className="link-item">
              <button type="button" className={`home-about-btn ${activeAbout}`}>
                About
              </button>
            </Link>
          </div>
        </li>
        {showMenu && (
          <li className="bottom-header-container">
            <div>
              <Link to="/" className="home-and-about-link">
                Home
              </Link>
              <Link to="/about" className="home-and-about-link">
                About
              </Link>
            </div>
            <button
              type="button"
              className="close-button"
              onClick={this.onClickClose}
            >
              <IoMdCloseCircle className="close-icon" />
            </button>
          </li>
        )}
      </ul>
    )
  }
}

export default withRouter(Header)
