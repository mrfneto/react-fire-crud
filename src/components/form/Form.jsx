import './Form.css'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { addDoc, collection } from 'firebase/firestore'

export const Form = () => {
  const navigate = useNavigate()
  const handleSubmit = async e => {
    e.preventDefault()

    const { title, description } = e.target.elements

    console.log(title.value)
    try {
      await addDoc(collection(db, 'projects'), {
        id: new Date(),
        createdAt: new Date(),
        title: title.value,
        description: description.value
      })
      navigate('/')
      console.log('Created')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__title">
        <h1>Create Project</h1>
      </div>
      <div className="form__content">
        <input type="text" name="title" placeholder="Title" />
        <textarea
          name="description"
          rows="5"
          placeholder="Description"
        ></textarea>
      </div>
      <div className="form__actions">
        <button type="submit">Save</button>
        <Link to="/">Back</Link>
      </div>
    </form>
  )
}
