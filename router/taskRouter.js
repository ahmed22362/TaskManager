const express = require("express")
const TaskController = require("../Controllers/taskController")
const router = express.Router()

router
  .route("/")
  .get(TaskController.getAllTasks)
  .post(TaskController.addTask)
  .delete(TaskController.deleteAll)
router
  .route("/:id")
  .get(TaskController.getTask)
  .patch(TaskController.updateTask)
  .delete(TaskController.deleteTask)

module.exports = router
