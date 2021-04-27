import express from 'express'
import api from './routes/api.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/',api)

app.listen("8888", () => console.log("Running"))