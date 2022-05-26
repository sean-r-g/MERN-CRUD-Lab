import {useState} from 'react'
import axios from 'axios'

const Movies = (props) =>{

  const [movies, setMovies] = useState([])




  return (
    <div className="movie-div">
      <img src={props.movie.image}/>
      <div>
        <h4>{props.movie.title}</h4>
        <h4>Run Time: {props.movie.runTime}</h4>
        <h4>Director: {props.movie.director}</h4>
        <h4>Genre: {props.movie.genre}</h4>
        <h4>Year: {props.movie.year}</h4>
      </div>
    </div>

  )
}

export default Movies