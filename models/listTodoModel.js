import mongoose from "mongoose";

const listTodoSchema = mongoose.Schema({
    todo: {
        type: String,
        require: true
    },
    dateline: {
        type: String,
        require: true
    },
    priority: {
        type: Boolean,
        default: false
    }
})

const listTodo = mongoose.model('todos', listTodoSchema)  // todos harus jamak pakai s
export default listTodo;