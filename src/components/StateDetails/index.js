import './index.css'

import {format} from 'date-fns'

import {Component} from 'react'

import TimeLines from '../Timelines'

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

const apiStateStatusConstants = {
  stateSuccess: 'STATE_SUCCESS',
  stateLoading: 'STATE_IN_PROGRESS',
  stateInitial: 'STATE_INITIAL',
}

class StateDetails extends Component {
  state = {
    data: [],
    stateData: [],
    countryWideData: [],
    apiStateStatus: apiStateStatusConstants.stateInitial,
  }

  componentDidMount() {
    console.log('In componentDidMount()')
    this.getCountryWideData()
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    console.log('In convertObjectsDataIntoListItemsUsingForInMethod()')
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
        // const population = data[keyName].meta.population
        //   ? data[keyName].meta.population
        //   : 0
        const {meta} = data[keyName]
        const lastUpdated = meta.last_updated ? meta.last_updated : 0
        // const {districts} = data[keyName]
        // const districtKeyNames = Object.keys(districts)
        // districtKeyNames.forEach(districtKeyName => {
        //   if (districts[districtKeyName]) {
        //     const {meta} = districts[keyName]
        //   }
        // })

        resultList.push({
          stateCode: keyName,
          name: statesList.find(state => state.state_code === keyName)
            ? statesList.find(state => state.state_code === keyName).state_name
            : 'undefined',
          confirmed,
          deceased,
          recovered,
          tested,
          //   population,
          active: confirmed - (deceased + recovered),
          lastUpdated,
          //   districts: {
          //     population: districts.map(eachItem => {
          //       const {meta} = eachItem
          //       const {population} = meta
          //       return population
          //     }),
          //   },
        })
      }
    })
    // console.log(resultList)

    return resultList
  }

  renderTimelinesView = () => <TimeLines />

  getStateDetails = () => {
    console.log('In getStateDetails()')
    // this.setState({apiStateStatus: apiStateStatusConstants.stateLoading})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    // this.setState({stateCode})

    const {countryWideData} = this.state

    const stateDetails = countryWideData.find(
      eachItem => eachItem.stateCode === stateCode,
    )

    console.log(stateDetails)

    this.setState(
      {
        stateData: stateDetails,
        apiStateStatus: apiStateStatusConstants.stateSuccess,
      },
      //   this.getTimelinesData,
      this.renderTimelinesView,
    )
  }

  getCountryWideData = async () => {
    console.log('In getCountryWideData()')
    this.setState({apiStateStatus: apiStateStatusConstants.stateLoading})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(response)
    this.setState({data})

    if (response.ok) {
      const requiredCountryWideData = this.convertObjectsDataIntoListItemsUsingForInMethod()
      console.log(requiredCountryWideData)
      this.setState(
        {countryWideData: requiredCountryWideData},
        this.getStateDetails,
      )
    }
  }

  renderStateSuccessView = () => {
    console.log('In renderStateSuccessView()')
    const {stateData} = this.state
    const {
      active,
      confirmed,
      deceased,
      recovered,
      lastUpdated,
      name,
      tested,
    } = stateData

    const modifiedLastUpdated = format(new Date(lastUpdated), 'PPP')
    return (
      <div className="state-success-view-container">
        <div className="state-name-and-tested-container">
          <div className="state-name-and-last-update-container">
            <div className="state-name-container">
              <p className="state-name-text">{name}</p>
            </div>
            <p className="last-update-text">
              Last update on {modifiedLastUpdated}
            </p>
          </div>
          <div className="tested-container">
            <p className="tested-text">Tested</p>
            <p className="tested-count-text">{tested}</p>
          </div>
        </div>
        <ul className="state-specific-cases-container">
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
            <p className="cases-count">{confirmed}</p>
          </li>

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
            <p className="cases-count">{active}</p>
          </li>

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
            <p className="cases-count">{recovered}</p>
          </li>

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
            <p className="cases-count">{deceased}</p>
          </li>
        </ul>

        <p className="top-districts-heading">Top Districts</p>

        <ul
          className="top-districts-outer-container"
          //   testid="topDistrictsUnorderedList"
        >
          <li className="district-container">
            <h1>{}</h1>
            <p>{}</p>
          </li>
        </ul>
      </div>
    )
  }

  renderStateLoaderView = () => {
    console.log('In renderStateLoaderView()')
    return (
      <div
        className="state-details-loading-container"
        // testid="stateDetailsLoader"
      >
        <Loader type="TailSpin" color="#0467d4" height={70} width={70} />
      </div>
    )
  }

  renderStateViewContainer = () => {
    console.log('In renderStateViewContainer()')
    const {apiStateStatus} = this.state
    console.log(apiStateStatus)
    switch (apiStateStatus) {
      case apiStateStatusConstants.stateSuccess:
        return this.renderStateSuccessView()
      case apiStateStatusConstants.stateLoading:
        return this.renderStateLoaderView()
      //   case apiStatusConstants.timelineSuccess:
      //     return this.renderTimelineSuccessView()
      //   case apiStatusConstants.timelineLoading:
      //     return this.renderTimelineLoaderView()
      default:
        return null
    }
  }

  render() {
    console.log('In StateDetails render method')
    return (
      <>
        <Header />
        {this.renderStateViewContainer()}
        <Footer />
      </>
    )
  }
}

export default StateDetails
