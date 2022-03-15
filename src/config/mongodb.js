import { MongoClient } from 'mongodb'
import { env } from '*/config/environment'

export const connectDB = async () => {
	const client = new MongoClient(env.MONGODB_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	try {
		//The client connect to the server
		await client.connect()

		console.log('Connected successfully to server')

		// List databases
		await listDatabases(client)
	} catch (error) {
		console.log(error)
	} finally {
		// Ensure that the client will close when finish/error
		await client.close()
		console.log('Closed')
	}
}

const listDatabases = async (client) => {
	const databaseList = await client.db().admin().listDatabases()
	console.log(databaseList)
	console.log('Your databases: ')
	databaseList.databases.forEach((db) => console.log(`- ${db.name}`))
}
