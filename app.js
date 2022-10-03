
const Express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

mongoose.connect('mongodb://localhost:27017/projectManagement')
    .then(connectObject => {
        console.log(`Connected to db:${connectObject.connections[0].name}`)})
    .catch(err => console.log('Error connecting to database', err))
    

const app = Express()
app.use(morgan('dev'))
app.use(cors({
    origin: ['http://localhost:3000']
}))
app.use(Express.json())
const projectRoutes = require('./routes/project.routes')
const taskRoutes = require('./routes/task.routes')
app.use('/api', taskRoutes)
app.use('/api', projectRoutes)


app.get('/', (req,res,next) => {
    res.send('hi')
})

app.listen('3001', () => {
    console.log('hey we are listening on port 3001')
})