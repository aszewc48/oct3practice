const express = require('express')
const Project = require('../models/Project.model')
const router = express.Router()
const Task = require('../models/Task.model')

router.post('/tasks', (req,res,next) => {
    const {title,description,projectId} = req.body
    let newTask
    Task.create({
        title,
        description,
        project: projectId
    })
    .then(createdTask => {
        console.log(newTask)
        newTask=createdTask
        return Project.findByIdAndUpdate(projectId, {
            $push: {task: createdTask._id}
        }, {new: true })
    })
            .then(updatedProject => {
                res.json({message: 'POST tasks works', task: newTask, project: updatedProject})
            })
    .catch(err => console.log(err))

})

module.exports = router