import express from 'express';
import { BoardController } from '*/controllers/board.controller';
import { BoardValidation } from '*/validations/board.validation';

const router = express.Router();

// Create new board
router.post('/', BoardValidation.createNew, BoardController.createNew);

//Get full a board
router.get('/:id', BoardController.getFullBoard);

export const BoardRoutes = router;
