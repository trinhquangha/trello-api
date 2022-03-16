import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'
import { BoardModel } from '*/models/board.model'

connectDB()
	.then(() => console.log('Connected successfully to database first!'))
	.then(() => bootServer())
	.catch((error) => {
		console.log(error)
		process.exit(1)
	})

const bootServer = () => {
	const app = express()

	app.get('/test', async (req, res) => {
		res.send('Hello world')
	})

	app.listen(env.APP_PORT, env.APP_HOST, () => {
		console.log(`Server is listening on ${env.APP_HOST}:${env.APP_PORT}/`)
	})
}
