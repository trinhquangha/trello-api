import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'

const app = express()

connectDB()

app.get('/', (req, res) => {
	res.send('Hello world')
})

app.listen(env.PORT, env.HOST, () => {
	console.log(`Server is listening on ${env.HOST}:${env.PORT}/`)
})
