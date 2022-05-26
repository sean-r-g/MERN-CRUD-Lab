const express = require('express')
const router = express.Router()
const Movies = require('../models/movies.js')


////CREATE////
router.post('/', (req, res)=>{
  Movies.create(req.body, (err, createdMovies)=>{
    res.json(createdMovies)
  })
})

////INDEX////
router.get('/', (req, res)=>{
  Movies.find({}, (err, foundMovies)=>{
    res.json(foundMovies)
  })
})

////DELETE////
router.delete('/:id', (req, res)=>{
  Movies.findByIdAndDelete(req.params.id, (err, deletedMovies)=>{
    res.json(deletedMovies)
  })
})

////UPDATE////
router.put('/:id', (req, res)=>{
  Movies.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMovies)=>{
    res.json(updatedMovies)
  })
})



module.exports = router