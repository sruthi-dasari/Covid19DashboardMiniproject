import './index.css'

import {Component} from 'react'

const apiTimelineStatusConstants = {
  timelineSuccess: 'TIMELINE_SUCCESS',
  timelineLoading: 'TIMELINE_IN_PROGRESS',
  timelineInitial: 'TIMELINE_INITIAL',
}

class Timelines extends Component {
  state = {
    timelineStatus: apiTimelineStatusConstants.timelineInitial,
    timelinesData: [],
  }

  componentDidMount() {
    console.log('In timelines componentDidMount')
    this.getTimelinesData()
  }

  getTimelinesData = async () => {
    console.log('In getTimelinesData()')
    const {stateCode} = this.props
    this.setState({timelineStatus: apiTimelineStatusConstants.timelineLoading})

    const timelinesUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const response = await fetch(timelinesUrl)
    const timelinesData = await response.json()
    console.log(timelinesData)
    this.setState({
      timelinesData,
      apiStatus: apiStatusConstants.timelineSuccess,
    })
  }

  renderTimelineSuccessView = () => {
    console.log('In renderTimelineSuccessView()')

    return (
      <div className="timeline-success-view-container">
        <div className="bar-graph-container">{}</div>
        <p className="daily-spread-heading">Daily Spread Trends</p>
        <div
          className="line-charts-container"
          // testid="lineChartsContainer"
        >
          {}
        </div>
      </div>
    )
  }

  renderTimelineLoaderView = () => {
    console.log('In renderTimelineLoaderView()')
    return (
      <div
        className="state-details-timeline-loading-container"
        // testid="timelinesDataLoader"
      >
        <Loader type="TailSpin" color="#0467d4" height={70} width={70} />
      </div>
    )
  }

  renderTimelineViewContainer = () => {
    console.log('In renderTimelineViewContainer()')
    const {timelineStatus} = this.state
    console.log(timelineStatus)
    switch (timelineStatus) {
      case apiTimelineStatusConstants.timelineSuccess:
        return this.renderTimelineSuccessView()
      case apiTimelineStatusConstants.timelineLoading:
        return this.renderTimelineLoaderView()
      default:
        return null
    }
  }

  render() {
    console.log('In Timelines render method')

    return <>{this.renderTimelineViewContainer()}</>
  }
}

export default Timelines
