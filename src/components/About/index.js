import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  success: 'SUCCESS',
  loading: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class About extends Component {
  state = {
    faqData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAboutData()
  }

  getAboutData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    // console.log(response)
    const data = await response.json()
    // console.log(typeof data.faq)

    if (response.ok) {
      const formattedData = data.faq.map(eachItem => ({
        answer: eachItem.answer,
        category: eachItem.category,
        qno: eachItem.qno,
        question: eachItem.question,
      }))
      //   console.log(formattedData)
      this.setState({
        faqData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderSuccessView = () => {
    const {faqData} = this.state
    return (
      <ul className="faqs-container" testid="faqsUnorderedList">
        {faqData.map(eachItem => (
          <Faq faqDetails={eachItem} key={eachItem.qno} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loading-view-container" testid="aboutRouteLoader">
      <Loader type="TailSpin" color="#356dcc" height={70} width={70} />
    </div>
  )

  renderViewContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="about-container">
          <h1 className="about-text">About</h1>
          <p className="about-update-text">Last update on march 28th 2021.</p>
          <h1 className="about-subtitle">
            COVID-19 vaccines be ready for distribution
          </h1>
          {this.renderViewContainer()}
        </div>
        <Footer />
      </>
    )
  }
}

const Faq = props => {
  const {faqDetails} = props
  const {answer, question} = faqDetails
  return (
    <li className="faq-item-container">
      <p className="question-text">{question}</p>
      <p className="answer-text">{answer}</p>
    </li>
  )
}

export default About
