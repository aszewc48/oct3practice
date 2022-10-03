const mongoose = require('mongoose')

const Project = require('./models/Project.model')
const Task = require('./models/Task.model')

mongoose.connect('mongodb://localhost:27017/projectManagement')
    .then(connectObject => {
        console.log(`Connected to db:${connectObject.connections[0].name}`)
        return Project.create({
            title: 'First Test Project',
            description: 'Hey it worked'
        })
    })
    .then(createdProject => {
        console.log(createdProject)
        return Task.create({
            title: 'Test a task',
            description: 'heyyy',
            project: createdProject._id
        })
    })
    .then(createdTask => {
        console.log(createdTask);
    return mongoose.concection.close()
    })
    .then(() => console.log('Connection successfully closed'))
    .catch(err => console.log('Error connecting to database:', err))

// mongoose.connection.close()
//     .then(() => console.log('connection closed'))
//     .catch(err => console.log('Error closing connection', err))
