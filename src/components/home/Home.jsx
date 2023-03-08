import './Home.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

export const Home = () => {
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
          <button className="tab__item active">All</button>
          <button className="tab__item">Pending</button>
          <button className="tab__item">Conpleted</button>
        </div>
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.title}>
                  <td>{project.title}</td>
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
