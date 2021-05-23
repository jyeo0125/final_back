const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()


app.use(require('morgan')('tiny'))
const routesReport = require('rowdy-logger').begin(app)

app.use(express.json())
app.use(require('cors')())

app.use(express.json())
app.use(require('cors')())


const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')



app.use('/user', userRoutes)
app.use('/post', postRoutes)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
    routesReport.print()
})