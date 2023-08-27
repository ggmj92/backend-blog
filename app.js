const express = require('express')
const cors = require('cors')
const { dbConnect } = require('./helpers/connection')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

//SERVER
const app = express()

dotenv.config()

//DATABASE CONNECTION
dbConnect()

//PORT
const port = process.env.PORT || 5001

//PARSE APPLICATION/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}))

//PARSE APPLICATION/JSON
app.use(express.json())

//CORS
app.use(cors())

//COOKIE PARSER
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//ROUTES
app.use('/api/v1/users', require('./routers/authRouter'))

app.use('/api/v1/posts', require('./routers/backRouter'))


//SERVER 'LISTENING'
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})