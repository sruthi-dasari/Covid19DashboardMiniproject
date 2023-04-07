import './index.css'

import {Component} from 'react'

import Header from '../Header'
import Footer from '../Footer'

class StateDetails extends Component {
  state = {
    stateData: [],
  }

  getStateDetails = () => {
    const {stateCode, covidData} = this.props

    const stateDetails = covidData.map(
      eachItem => eachItem.stateCode === stateCode,
    )
    console.log(stateDetails)
  }

  renderStateDetailsView = () => {
    this.getStateDetails()

    return (
      <>
        <div>
          <div className="state-name-and-last-update-container">
            <div className="state-name-container">{}</div>
            <p className="last-update-text">{}</p>
          </div>
          <div className="tested-container">
            <p>Tested</p>
            <h1>{}</h1>
          </div>
        </div>
        <ul className="select-container">
          {/* { testid = "stateSpecificConfirmedCasesContainer" } */}
          <li
            className="select-card confirmed-card"
            // testid="stateSpecificConfirmedCasesContainer"
          >
            <p className="cases-text">Confirmed</p>
            <img
              src="https://res.cloudinary.com/my-cloud123/image/upload/v1679129023/Covid%20Dashboard/small%20devices/check-mark_1_rwcqbx.png"
              alt="country wide confirmed cases pic"
              className="cases-icon"
            />
            <p className="cases-count">000000</p>
          </li>
          {/* { testid = "stateSpecificActiveCasesContainer" } */}
          <li
            className="select-card active-card"
            // testid="stateSpecificActiveCasesContainer"
          >
            <p className="cases-text">Active</p>
            <img
              src="https://res.cloudinary.com/my-cloud123/image/upload/v1679129023/Covid%20Dashboard/small%20devices/protection_2_a0cb7m.png"
              alt="country wide confirmed cases pic"
              className="cases-icon"
            />
            <p className="cases-count">000000</p>
          </li>
          {/* { testid = "stateSpecificRecoveredCasesContainer" } */}
          <li
            className="select-card recovered-card"
            // testid="stateSpecificRecoveredCasesContainer"
          >
            <p className="cases-text">Recovered</p>
            <img
              src="https://res.cloudinary.com/my-cloud123/image/upload/v1679129023/Covid%20Dashboard/small%20devices/recovered_1_jclri6.png"
              alt="country wide confirmed cases pic"
              className="cases-icon"
            />
            <p className="cases-count">000000</p>
          </li>
          {/* { testid = "stateSpecificDeceasedCasesContainer" } */}
          <li
            className="select-card deceased-card"
            // testid="stateSpecificDeceasedCasesContainer"
          >
            <p className="cases-text">Deceased</p>
            <img
              src="https://res.cloudinary.com/my-cloud123/image/upload/v1679129023/Covid%20Dashboard/small%20devices/breathing_1_fegdvb.png"
              alt="country wide confirmed cases pic"
              className="cases-icon"
            />
            <p className="cases-count">000000</p>
          </li>
        </ul>
        {/* { testid = "lineChartsContainer" } */}
        <div
          className="top-districts-outer-container"
          //   testid="lineChartsContainer"
        >
          <h1 className="top-districts-heading">Top Districts</h1>
          <div className="top-district-container">
            <h1>{}</h1>
            <p>{}</p>
          </div>
        </div>
        <div className="bar-graph-container">{}</div>
        <h1 className="daily-spread-heading">Daily Spread Trends</h1>
      </>
    )
  }

  render() {
    console.log('In StateDetails render method')
    return (
      <>
        <Header />
        {this.renderStateDetailsView()}
        <Footer />
      </>
    )
  }
}

export default StateDetails
