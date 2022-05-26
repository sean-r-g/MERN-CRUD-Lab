import {useState} from 'react'
import axios from 'axios'

const Movies = (props) =>{

  const [movies, setMovies] = useState([])
  
  const handleDeleteMovie = (movieData) =>{
    axios.delete(`http://localhost:3000/movies/${movieData._id}`).then(()=>{
      axios.get('http://localhost:3000/movies').then((response)=>{
        setMovies(response.data)
      })
    })
  }

  return (
    <div className="movie-div">
      <img src={props.movie.image}/>
      <h4>{props.movie.title}</h4>
      <h4>Run Time: {props.movie.runTime}</h4>
      <h4>Director: {props.movie.director}</h4>
      <h4>Genre: {props.movie.genre}</h4>
      <h4>Year: {props.movie.year}</h4>
      <button onClick={ (event) => {handleDeleteMovie(props.movie)}}>Delete</button>
    </div>
  )
}

export default Movies