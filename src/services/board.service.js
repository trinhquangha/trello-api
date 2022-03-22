import { BoardModel } from '*/models/board.model';
import { cloneDeep } from 'lodash';

const createNew = async (data) => {
	try {
		const createdBoard = await BoardModel.createNew(data);
		const getNewBoard = await BoardModel.findOneById(
			createdBoard.insertedId.toString()
		);
		return getNewBoard;
	} catch (error) {
		throw new Error(error);
	}
};

const getFullBoard = async (boardId) => {
	try {
		const board = await BoardModel.getFullBoard(boardId);

		if (!board || !board.columns) {
			throw new Error('Board not found!');
		}

		const transformBoard = cloneDeep(board);
    
		//Filter deleted column
		transformBoard.columns = transformBoard.columns.filter(
			(column) => !column._destroy
		);

		//Add cards to each column
		transformBoard.columns.forEach((column) => {
			column.cards = board.cards.filter(
				(card) => card.columnId.toString() === column._id.toString()
			);
		});

		//Sort columns by column order, sort cards by card order (FE)

		//Remove cards in board
		delete transformBoard.cards;

		return transformBoard;
	} catch (error) {
		throw new Error(error);
	}
};

export const BoardService = { createNew, getFullBoard };
