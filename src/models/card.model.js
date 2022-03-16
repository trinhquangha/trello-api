import Joi from 'joi'
import { getDB } from '*/config/mongodb'
//Define Card collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
	boardId: Joi.string().required(),
  columnId: Joi.string().required(),
	title: Joi.string().min(3).max(20).required(),
	cover: Joi.string().default(null),
	createdAt: Joi.date().timestamp().default(Date.now()),
	uodatedAt: Joi.date().timestamp().default(null),
	_destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
	return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
	try {
		const value = await validateSchema(data)
		const result = await getDB()
			.collection(cardCollectionName)
			.insertOne(value)
		console.log(result)
	} catch (error) {
		console.log(error)
	}
}

export const CardModel = { createNew }