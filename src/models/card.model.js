import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'
//Define Card collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
	boardId: Joi.string().required(),
	columnId: Joi.string().required(),
	title: Joi.string().min(3).max(30).required().trim(),
	cover: Joi.string().default(null),
	createdAt: Joi.date().timestamp().default(Date.now()),
	updatedAt: Joi.date().timestamp().default(null),
	_destroy: Joi.boolean().default(false),
})

const findOneById = async (id) => {
	try {
		const result = await getDB()
			.collection(cardCollectionName)
			.findOne({ _id: ObjectId(id) })
		return result
	} catch (error) {
		throw new Error(error)
	}
}

const validateSchema = async (data) => {
	return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
	try {
		const validateValue = await validateSchema(data)
		const insertValue = {
			...validateValue,
			boardId: ObjectId(validateValue.boardId),
			columnId: ObjectId(validateValue.columnId),
		}

		const result = await getDB()
			.collection(cardCollectionName)
			.insertOne(insertValue)
		return result
	} catch (error) {
		throw new Error(error)
	}
}

export const CardModel = { cardCollectionName, findOneById, createNew }
