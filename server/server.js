const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const connectDB = require('./config/db')
const quizzes = require("./routes/quizzes")
const questions = require("./routes/questions")

const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:5173"
}))

connectDB()

app.use("/quizzes", quizzes)
app.use("/questions", questions)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});