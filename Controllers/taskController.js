const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/AppError")
const Task = require("../Models/TaskModel")
exports.getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

exports.addTask = catchAsync(async (req, res, next) => {
  const { name } = req.body
  const newTask = await Task.create({ name })
  if (!newTask) return next(new AppError("Can't create new task!", 400))
  res.status(200).json({ newTask })
})

exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id)
  if (!task) return next(new AppError("Cant find task with this id", 404))
  res.status(200).json({ task })
})
exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      completed: req.body.completed,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  if (!task)
    return next(createCustomError(`No task with id : ${req.params.id}`, 404))

  res.status(200).json({ task })
})
exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id)
  if (!task)
    return next(createCustomError(`No task with id : ${req.params.id}`, 404))

  res.status(200).json({ task })
})

exports.deleteAll = catchAsync(async (req, res, next) => {
  const tasks = await Task.deleteMany({})
  res.status(200).json({ status: "success" })
})
