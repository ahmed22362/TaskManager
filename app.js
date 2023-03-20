const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const taskRouter = require("./router/taskRouter")
const errorHandler = require("./utils/errorHandler")
const AppError = require("./utils/AppError")
dotenv.config({ path: __dirname + "/.env" })

// Define middleware
const app = express()
app.use(express.json())
app.use(express.static("./public/"))

// Define routers
app.use("/api/v1/tasks", taskRouter)
app.use("/welcome", (req, res) => {
  res.send("hello world")
})
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} in this server`, 404))
})
app.use(errorHandler)

// Define Server connections
const DB = process.env.MONGO_URL.replace(
  "<password>",
  process.env.ATLAS_PASSWORD
)
mongoose.set("strictQuery", false)
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully")
  })
const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}...`)
})
console.log("Task Manager App")
