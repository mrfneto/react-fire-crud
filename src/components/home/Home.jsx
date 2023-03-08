import './Home.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

export const Home = () => {
  const [search, setSearch] = useState('')
  const [projects, setProjects] = useState([])
  const projectCollection = collection(db, 'projects')

  const get = async () => {
    const snapshot = await getDocs(projectCollection)
    setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
  }

  useEffect(() => {
    get()
  }, [])

  const remove = async id => {
    await deleteDoc(doc(db, 'projects', id))
    setProjects(projects.filter(p => p.id !== id))
    console.log('Deleted')
  }

  const searchResult =
    search.length > 0
      ? projects.filter(p =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )
      : []

  return (
    <div className="home">
      <div className="home__header">
        <div className="search">
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Link to="/create">New Project</Link>
      </div>
      <div className="home__content">
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Projects</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {search.length > 0
                ? searchResult.map(project => (
                    <tr key={project.title}>
                      <td>
                        <h2>{project.title}</h2>
                        <p>{project.description.substring(0, 75) + '...'}</p>
                      </td>
                      <td className="table__actions">
                        <Link to={`${project.id}/update`}>Edit</Link>
                        <a type="button" onClick={() => remove(project.id)}>
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))
                : projects.map(project => (
                    <tr key={project.title}>
                      <td>
                        <h2>{project.title}</h2>
                        <p>{project.description.substring(0, 75) + '...'}</p>
                      </td>
                      <td className="table__actions">
                        <Link to={`${project.id}/update`}>Edit</Link>
                        <a type="button" onClick={() => remove(project.id)}>
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
