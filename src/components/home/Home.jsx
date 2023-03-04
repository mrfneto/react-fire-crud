import './Home.css'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="home">
      <div className="home__header">
        <div className="search">
          <input type="search" placeholder="Search..." />
        </div>
        <Link to="/create">New Project</Link>
      </div>
      <div className="home__content">
        <div className="tab">
          <button className="tab__item">All</button>
          <button className="tab__item">Pending</button>
          <button className="tab__item">Conpleted</button>
        </div>

        <div className="card">
          <div className="card__title">
            <h2>Title</h2>
            <p>Description</p>
          </div>
          <div className="card__status">
            <span>status</span>
          </div>
          <div className="card__actions">
            <Link to="/1/update">Edit</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
