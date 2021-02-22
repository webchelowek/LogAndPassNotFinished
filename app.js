const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const routes = require('./routes/auth.routes')

const app = express()

app.use(express.json({ extended: true }))

app.use('api/auth', routes)

const PORT = config.get('port') || 5000

async function start (){
    try {
      await mongoose.connect(config.get('mongoUri'),{
        useCreateIndex: true,
          useUnifiedTopology:true,
          useNewUrlParser:true
      })
    app.listen(PORT, () => {
        console.log('Server has been started, port:' + PORT)
    })
    } catch(e){
        console.log('Ooops, something went wrong, error:' + e);
        process.exit(1)
    }
}

start()