import { MongoClient } from 'mongodb'
import { env } from '*/config/environment'

let dbInstance = null

export const connectDB = async () => {
	const client = new MongoClient(env.MONGODB_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	//The client connect to the server
	await client.connect()

	//Assign clientDB to dbInstance
	dbInstance = client.db(env.DATABASE_NAME)
}

//Get database instance
export const getDB = () => {
	if (!dbInstance) {
		throw Error('Must connect to database first!')
	}
	return dbInstance
}

// const listDatabases = async (client) => {
// 	const databaseList = await client.db().admin().listDatabases()
// 	console.log(databaseList)
// 	console.log('Your databases: ')
// 	databaseList.databases.forEach((db) => console.log(`- ${db.name}`))
// }
