import './index.css'

import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    covidData: [],
    data: '',
  }

  componentDidMount() {
    this.getCovidData()
  }

  getCovidData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    // console.log(response)
    const data = await response.json()
    // console.log(data)

    if (response.ok) {
      //   const {covidData} = this.state
      this.setState({data})

      const resultList = this.convertObjectsDataIntoListItemsUsingForInMethod()
      this.setState({covidData: resultList})

      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  convertObjectsDataIntoListItemsUsingForInMethod() {
    const {data} = this.state
    const resultList = []
    // getting keys of an object object
    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      //   console.log(keyName)
      if (data[keyName]) {
        const {total} = data[keyName]
        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        resultList.push({
          stateCode: keyName,
          name: statesList.find(state => state.state_code === keyName)
            .state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    // console.log(resultList)

    return resultList
  }

  renderSuccessView = () => (
    <>
      <div className="select-container">
        <div className="select-card confirmed-card">
          <p className="cases-text">Confirmed</p>
          <img
            src="https://res.cloudinary.com/my-cloud123/image/upload/v1679129023/Covid%20Dashboard/small%20devices/check-mark_1_rwcqbx.png"
            alt="country wide confirmed cases pic"
            className="cases-icon"
          />
          <h1 className="cases-count">000000</h1>
        </div>
        <div className="select-card active-card">
          <p className="cases-text">Active</p>
          <img
            src="https://res.cloudinary.com/my-cloud123/image/upload/v1679129023/Covid%20Dashboard/small%20devices/protection_2_a0cb7m.png"
            alt="country wide confirmed cases pic"
            className="cases-icon"
          />
          <h1 className="cases-count">000000</h1>
        </div>
        <div className="select-card recovered-card">
          <p className="cases-text">Recovered</p>
          <img
            src="https://res.cloudinary.com/my-cloud123/image/upload/v1679129023/Covid%20Dashboard/small%20devices/recovered_1_jclri6.png"
            alt="country wide confirmed cases pic"
            className="cases-icon"
          />
          <h1 className="cases-count">000000</h1>
        </div>
        <div className="select-card deceased-card">
          <p className="cases-text">Deceased</p>
          <img
            src="https://res.cloudinary.com/my-cloud123/image/upload/v1679129023/Covid%20Dashboard/small%20devices/breathing_1_fegdvb.png"
            alt="country wide confirmed cases pic"
            className="cases-icon"
          />
          <h1 className="cases-count">000000</h1>
        </div>
      </div>
      <div className="covid-cases-container">
        <div className="heading-row">
          <div className="states-heading-container">
            <h1 className="heading-text">States/UT</h1>
            <div className="asc-dec-btn-container">
              <button type="button" className="asc-des-btn">
                <FcGenericSortingAsc className="asc-des-icon" />
              </button>
              <button type="button" className="asc-des-btn">
                <FcGenericSortingDesc className="asc-des-icon" />
              </button>
            </div>
          </div>
          <h1 className="heading-text">Confirmed</h1>
          <h1 className="heading-text">Active</h1>
          <h1 className="heading-text">Recovered</h1>
          <h1 className="heading-text">Deceased</h1>
          <h1 className="heading-text">Population</h1>
        </div>
        <div className="content-row">
          <p className="state-name">{}</p>
          <p className="confirmed-count">{}</p>
          <p className="active-count">{}</p>
          <p className="recovered-count">{}</p>
          <p className="deceased-count">{}</p>
          <p className="population-count">{}</p>
        </div>
      </div>
    </>
  )

  renderLoadingView = () => (
    // testid = "homeRouteLoader"
    <div className="loading-container">
      <Loader type="TailSpin" color="#0467d4" height={70} width={70} />
    </div>
  )

  renderViewContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="search-box-container">
            <BsSearch className="search-icon" />
            <input
              type="search"
              className="search-input-container"
              placeholder="Enter the State"
            />
          </div>
          {this.renderViewContainer()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
