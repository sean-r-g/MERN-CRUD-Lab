const express = require('express')
const app = express()
const mongoose = require ('mongoose')
const cors = require('cors')
const movieController = require('./controllers/moviecontroller.js')




app.use(express.json())
app.use(cors())

app.use('/movies', movieController)


app.get('/', (req, res)=>{
  res.send('hello world')
})




mongoose.connect('mongodb://localhost:27017/movies')
mongoose.connection.once('open', ()=>{
    console.log('connected to mongod...');
});
app.listen(3000, ()=>{
  console.log('listening...');
});