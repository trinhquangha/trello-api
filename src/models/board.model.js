import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'
//Define Board collection
const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
	title: Joi.string().min(3).max(20).required().trim(),
	columnOrder: Joi.array().items(Joi.string()).default([]),
	createdAt: Joi.date().timestamp().default(Date.now()),
	updatedAt: Joi.date().timestamp().default(null),
	_destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
	return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
	try {
		const result = await getDB()
			.collection(boardCollectionName)
			.findOne({ _id: ObjectId(id) })
		return result
	} catch (error) {
		throw new Error(error)
	}
}

const createNew = async (data) => {
	try {
		const value = await validateSchema(data)
		const result = await getDB()
			.collection(boardCollectionName)
			.insertOne(value)
		return result
	} catch (error) {
		throw new Error(error)
	}
}

export const BoardModel = { createNew, findOneById }
