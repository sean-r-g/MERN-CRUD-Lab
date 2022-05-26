import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Movies from './components/movielist'

function App() {
  
  const [movies, setMovies] = useState([])
  const [newTitle, setNewTitle] = useState()
  const [newRunTime, setNewRunTime] = useState()
  const [newDirector, setNewDirector] = useState()
  const [newGenre, setNewGenre] = useState()
  const [newYear, setNewYear] = useState()
  const [newImage, setNewImage] = useState()
  const [showEdit, setShowEdit] = useState(false)
  const [showNew, setShowNew] = useState(false)

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
      image: newImage,
    }).then(()=>{
      axios.get('http://localhost:3000/movies').then((response)=>{
        setMovies(response.data)
      })
    })
  }
  const handleMovieUpdate = (event, movieData) =>{
    event.preventDefault()
    axios.put(`http://localhost:3000/movies/${movieData._id}`, {
      title: newTitle,
      runTime: newRunTime,
      director: newDirector,
      genre: newGenre,
      year: newYear
    }).then(()=>{
      axios.get('http://localhost:3000/movies').then((response)=>{
      console.log(response.data);  
      setMovies(response.data)
      })
    })
  }

  const toggleEditMovie = () =>{
    showEdit ? setShowEdit(false) : setShowEdit(true)
  }
  const toggleNewMovie = () =>{
    showNew ? setShowNew(false) : setShowNew(true)
  }
  
  useEffect(()=>{
    axios.get('http://localhost:3000/movies').then((response)=>{
      setMovies(response.data)
    })
  })
  
  
  return (
    <>
      <h1>Movie World</h1>
      <button id='edit-btn' onClick={toggleNewMovie}>Add Movie</button>
      {showNew ? <div id='new-form-div'>
        <form onSubmit={handleNewMovieSubmit}>
          Title: <input type='text' onChange={handleNewTitle}/><br/>
          Run Time: <input type='number' onChange={handleNewRunTime}/><br/>
          Director: <input type='text' onChange={handleNewDirector}/><br/>
          Genre: <input type='text' onChange={handleNewGenre}/><br/>
          Year: <input type='number' onChange={handleNewYear}/><br/>
          Image: <input type='url' onChange={handleNewImage}/><br/>
          <input type='submit' value="Save New Movie"/>
        </form>
      </div> : null}
      <button id='edit-btn' onClick={toggleEditMovie}>Edit Movies</button>
      <div className='container'>
        {movies.map((movie)=>{
          return (
            <div className='movie-container'>
            <Movies movie={movie}/>
            {showEdit ? <form onSubmit={(event) => {handleMovieUpdate(event, movie)}}>
              Title:<br/> <input type='text' name='title' placeholder={movie.title} onChange={handleNewTitle}/><br/>
              Run Time: <br/><input type='number' name='runTime' placeholder={movie.runTime} onChange={handleNewRunTime}/><br/>
              Director: <br/><input type='text' name='director' placeholder={movie.director} onChange={handleNewDirector}/><br/>
              Genre: <br/><input type='text' name='genre' placeholder={movie.genre} onChange={handleNewGenre}/><br/>
              Year: <br/><input type='number' name='year' placeholder={movie.year} onChange={handleNewYear}/><br/>
              <input type='submit' value='Submit'/>
            </form> : null}
            </div>
          )
        })}
      </div>
      <footer>
        <h5>©Holmes, Gillis, and Co.</h5>
      </footer>
    </>
  );
}

export default App;
