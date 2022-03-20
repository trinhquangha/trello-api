import { ColumnModel } from '*/models/column.model'

const createNew = async (data) => {
	try {
		const createdColumn = await ColumnModel.createNew(data)
		const getNewColumn = await ColumnModel.findOneById(
			createdColumn.insertedId.toString()
		)
		return getNewColumn
	} catch (error) {
		throw new Error(error)
	}
}

const update = async (id, data) => {
	try {
		const updatedData = {
			...data,
			updatedAt: Date.now(),
		}
		const result = await ColumnModel.update(id, updatedData)
		return result
	} catch (error) {
		throw new Error(error)
	}
}

export const ColumnService = { createNew, update }
