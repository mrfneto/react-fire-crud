import { Link } from 'react-router-dom'
import './Form.css'

export const Form = () => {
  return (
    <form className="form">
      <div className="form__title">
        <h1>Create Project</h1>
      </div>
      <div className="form__content">
        <input type="text" name="title" />
        <textarea name="descripton" rows="5"></textarea>
      </div>
      <div className="form__actions">
        <button type="submit">Save</button>
        <Link to="/">Back</Link>
      </div>
    </form>
  )
}
