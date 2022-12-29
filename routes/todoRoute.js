import express from 'express'
import ToDo from '../models/listTodoModel.js'

const router = express.Router()

router.post('/add', async (req, res, next) => {
    const newTodo = new ToDo(req.body)
    try {
        const addTodo = await newTodo.save()
        res.status(200).json(addTodo)
    } catch (error) {
        next (error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const getList = await ToDo.find()
        res.status(200).json(getList)
    } catch (error) {
        next (error)
    }
})
router.get('/:id', async (req, res, next) => {
    const todoId = req.params.id
    try {
        const getList = await ToDo.findById(todoId)
        res.status(200).json(getList)
    } catch (error) {
        next (error)
    }
})

router.delete('/:id', async (req, res, next) => {
    const todoId = req.params.id
    try {
        await ToDo.findByIdAndDelete(todoId)
        res.status(200).json("todo sudah di delete")
    } catch (error) {
        next (error)
    }
})

router.put('/update/:id', async (req, res, next) => {
    const todoId = req.params.id
    try {
        await ToDo.findByIdAndUpdate(todoId, {$set: req.body}, {new: true})
        res.status(200).json("todo sudah di UPDATE")
    } catch (error) {
        next (error)
    }
})

export default router