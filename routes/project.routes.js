const { Router } = require('express')
const express = require('express')
const router = express.Router()

const Project = require('../models/Project.model')
const Task = require('../models/Task.model')

router.post('/projects', (req,res,next) => {
    console.log(req.body)
    const {title, description} = req.body
    Project.create({
        title,
        description
    })
    .then(createdProject => {
        res.json({message:'POST projects worked', project: createdProject})
    })
    .catch(err => console.log('Error posting data', err))
})

router.get('/projects', (req,res,next) => {
    Project.find()
        .populate('task')
    .then(foundProjectArray => {
        console.log(foundProjectArray)
        res.json({message: 'GET projects worked', projects: foundProjectArray})
    })
    .catch(err => console.log('Error getting data:', err))
})

router.get('/projects/:projectId', (req,res,next) => {
    const {projectId} = req.params
    Project.findById(projectId)
        .populate('task')
        .then(foundProject => {
            res.json({message: 'GET projects/:projectId worked', projectId, project: foundProject})
        })
        .catch(err => console.log(err))
})

router.put('/projects/:projectId', (req,res,next) => {
    const {projectId} = req.params
        .populate('task')
    Project.findByIdAndUpdate(projectId, req.body, {new: true})
    .then(updatedProject => {
        console.log(updatedProject)
        res.json({message: 'PUT projects/:projectId worked', projectId, project: updatedProject})
    })
    .catch(err => console.log(err))
})

router.delete('/projects/:projectId', (req,res,next) => {
    const {projectId} = req.params
    Project.findByIdAndRemove(projectId)
    .then(deletedProject => {
        console.log(deletedProject)
        Task.deleteMany({project: projectId}).then(() => {})
        res.json({message: 'DELETE projects/:projectId worked', projectId, project: deletedProject})
    })
    .catch(err => console.log(err))
})


module.exports = router