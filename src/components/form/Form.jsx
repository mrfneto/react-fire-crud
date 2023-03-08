import './Form.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export const Form = () => {
  const [document, setDocument] = useState({})
  const params = useParams()

  useEffect(() => {
    const find = async () => {
      if (params.id) {
        const result = await getDoc(doc(db, 'projects', params.id))
        if (result.exists()) {
          setDocument(result.data())
        }
      }
    }

    find()
  }, [])

  const navigate = useNavigate()
  const handleSubmit = async e => {
    e.preventDefault()

    const { title, description } = e.target.elements

    try {
      let formData = {
        createdAt: document.createdAt || new Date(),
        title: title.value,
        description: description.value
      }
      params.id
        ? await setDoc(doc(db, 'projects', params.id), formData)
        : await addDoc(collection(db, 'projects'), formData)
      navigate('/')
      console.log('Saved')
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
        <input
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={document.title}
        />
        <textarea
          name="description"
          rows="10"
          placeholder="Description"
          defaultValue={document.description}
        ></textarea>
      </div>
      <div className="form__actions">
        <button type="submit">Save</button>
        <Link to="/">Back</Link>
      </div>
    </form>
  )
}
