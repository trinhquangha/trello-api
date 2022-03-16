import Joi from 'joi'
import { getDB } from '*/config/mongodb'
//Define Column collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
	title: Joi.string().min(3).max(20).required(),
	cardOrder: Joi.array().items(Joi.string()).default([]),
	createdAt: Joi.date().timestamp().default(Date.now()),
	uodatedAt: Joi.date().timestamp().default(null),
	_destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
	return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
	try {
		const value = await validateSchema(data)
		const result = await getDB()
			.collection(columnCollectionName)
			.insertOne(value)
		console.log(result)
	} catch (error) {
		console.log(error)
	}
}

export const ColumnModel = { createNew }
