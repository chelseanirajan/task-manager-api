const express = require('express')
const Taskk = require('../models/task')
const User = require('../models/user');
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks',auth, async (req, res) => {
    // const task = new Taskk(req.body)
    const task = new Taskk({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.send(task)
    }catch (e) {
        res.status(400).send(error)
    }

})

// GET /tasks?completed=false
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1] === 'desc'? -1:1;
    }
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    try {
        // const tasks = await Taskk.find({owner: req.user._id})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Taskk.findById(_id)
        const task = await Taskk.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(500).send()
        }
        res.send(task)
    }catch (e) {
        res.status(404).send()
    }
})

router.patch('/tasks/:id',auth, async (req, res) => {
    const updateValue = ['description', 'completed']
    const update = Object.keys(req.body)
    console.log(update)
    const isUpdateValid = update.every(uKey => updateValue.includes(uKey))
    console.log(req.params.id)
    if(!isUpdateValid){
        return res.status(500).send('You entered the wrong key')
    }
    try{
        // const task = await Taskk.findById(req.params.id)
        const task = await Taskk.findOne({_id: req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        update.forEach((upd) => {
            task[upd] = req.body[upd]
        })
        await task.save();
        // const task = await Taskk.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        res.send(task)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth, async (req, res) => {
    try{
        // const task = await User.findByIdAndDelete(req.params.id)
        const task = await Taskk.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
