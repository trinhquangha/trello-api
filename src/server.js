import express from 'express'
import { mapOrder } from './utilities/sorts.js'

const app = express()

const hostname = 'localhost'
const port = 8080

app.get('/', (req, res) => {
	res.send('Hello world')
})

app.listen(port, hostname, () => {
	console.log(`Server is listening on ${hostname}:${port}`)
})
