import './index.css'

import {BiChevronRightSquare} from 'react-icons/bi'

import {Link} from 'react-router-dom'

import StateDetails from '../StateDetails'

const SuggestionItem = props => {
  const {suggestionDetails, covidData} = props

  const {name, stateCode} = suggestionDetails

  //   const onClickSuggestionItem = () => (
  //     //   console.log('In onClickSuggestionItem()')
  //     <StateDetails stateCode={stateCode} covidData={covidData} />
  //   )

  return (
    <Link to="/stateCode" className="link-item">
      <button
        type="button"
        className="suggestion-item-container"
        //   onClick={onClickSuggestionItem}
      >
        <p className="state-name-text">{name}</p>
        <div className="state-code-container">
          <p className="state-code-text">{stateCode}</p>
          <BiChevronRightSquare className="state-code-btn-icon" />
        </div>
      </button>
    </Link>
  )
}

export default SuggestionItem
