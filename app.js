const express = require('express')
const app = express()
const port = 4000
const http = require('http').Server(app)
const io = require('socket.io')(http,{
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

app.get('/', (req, res) => {
  res.sendfile('index.html')
})

//Whenever someone connects this gets executed
io.on('connection', (socket) => {
  let data = 'hi'

  socket.on('hello', (arg) => {
    console.log(arg)
    data = arg
    socket.broadcast.emit('hello', data)
  })

})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
*/
