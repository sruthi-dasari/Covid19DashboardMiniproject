import './index.css'

import {RiMenuFoldFill} from 'react-icons/ri'
import {IoMdCloseCircle} from 'react-icons/io'

import {Link} from 'react-router-dom'

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
    return (
      <div className="header-container">
        <div className="top-header-container">
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
        </div>
        {showMenu && (
          <div className="bottom-header-container">
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
          </div>
        )}
      </div>
    )
  }
}

export default Header
