const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async-wrapper");
const {createCustomError}= require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res)=> {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
});

const createTask = asyncWrapper(async (req, res)=> {
        const task = await Task.create(req.body);
        res.status(201).json({task});
})

const getSingleTask = asyncWrapper(async(req, res, next)=> {
        const task = await Task.findById(req.params.id);
        if(!task){
            return next(createCustomError(` no task with given id ${req.params.id} found`, 404))
        }
        res.status(200).json(task);
})

const updateTask = asyncWrapper(async(req, res, next)=> {
        let task = await Task.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        });
        if(!task){
            return next(createCustomError(` no task with given id ${req.params.id} found`, 404))
        }
        res.status(200).json({message: "ok"})
})

const deleteTask = asyncWrapper(async(req, res)=> {
        const task = await Task.findOneAndDelete({_id: req.params.id});
        if(!task){
            return next(createCustomError(` no task with given id ${req.params.id} found`, 404))
        }
        res.status(200).json({message: "ok"});
})



module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
};