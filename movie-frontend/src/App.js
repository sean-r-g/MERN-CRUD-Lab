import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Movies from './components/movielist'

function App() {
  
  const [movies, setMovies] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newRunTime, setNewRunTime] = useState()
  const [newDirector, setNewDirector] = useState('')
  const [newGenre, setNewGenre] = useState('')
  const [newYear, setNewYear] = useState()
  const [newImage, setNewImage] = useState('')

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }
  const handleNewRunTime = (event) => {
    setNewRunTime(event.target.value)
  }
  const handleNewDirector = (event) => {
    setNewDirector(event.target.value)
  }
  const handleNewGenre = (event) => {
    setNewGenre(event.target.value)
  }
  const handleNewYear = (event) => {
    setNewYear(event.target.value)
  }
  const handleNewImage = (event) => {
    setNewImage(event.target.value)
  }

  
  const handleNewMovieSubmit = (event) =>{
    event.preventDefault()
    axios.post('http://localhost:3000/movies', {
      title: newTitle,
      runTime: newRunTime,
      director: newDirector,
      genre: newGenre,
      year: newYear,
      image: newImage
    }).then(()=>{
      axios.get('http://localhost:3000/movies').then((response)=>{
        setMovies(response.data)
      })
    })
  }
  
  const handleDeleteMovie = (movieData) =>{
    axios.delete(`http://localhost:3000/${movieData._id}`).then(()=>{
      axios.get('http://localhost:3000/movies').then((response)=>{
        setMovies(response.data)
      })
    })
  }
  
  
  useEffect(()=>{
    axios.get('http://localhost:3000/movies').then((response)=>{
      setMovies(response.data)
    })
  })
  
  
  return (
    <>
      <h1>Movie World</h1>
      <div>
        <form onSubmit={handleNewMovieSubmit}>
          Title: <input type='text' onChange={handleNewTitle}/><br/>
          Run Time: <input type='number' onChange={handleNewRunTime}/><br/>
          Director: <input type='text' onChange={handleNewDirector}/><br/>
          Genre: <input type='text' onChange={handleNewGenre}/><br/>
          Year: <input type='number' onChange={handleNewYear}/><br/>
          Image: <input type='url' onChange={handleNewImage}/><br/>
          <input type='submit' value="Add Movie"/>
        </form>
      </div>
      <div className='container'>
        {movies.map((movie)=>{
          return (
            <Movies movie={movie}/>
          )
        })}
      </div>
    </>
  );
}

export default App;
