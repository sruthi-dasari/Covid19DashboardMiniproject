import './index.css'

import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/my-cloud123/image/upload/v1679118605/Covid%20Dashboard/small%20devices/notfound_img_jbnvm1.png"
      alt="not found"
      className="notfound-img"
    />
    <h1 className="notfound-heading">Page Not Found</h1>
    <p className="notfound-para">
      we&apos;re sorry, the page you requested could not be found
      <br />
      Please go back to the homepage
    </p>
    <Link to="/" className="link-item">
      <button className="home-btn" type="button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
