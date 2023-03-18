import './index.css'

import {Component} from 'react'

class About extends Component {
  componentDidMount() {
    this.getAboutData()
  }

  getAboutData = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    // console.log(response)
    const data = await response.json()
    console.log(data)
  }

  render() {
    return (
      <div className="about-container">
        <h1 className="about-text">About</h1>
      </div>
    )
  }
}

export default About
