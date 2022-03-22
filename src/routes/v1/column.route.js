import express from 'express';
import { ColumnController } from '*/controllers/column.controller';
import { ColumnValidation } from '*/validations/column.validation';

const router = express.Router();

//Create new column
router.post('/', ColumnValidation.createNew, ColumnController.createNew);

//Update column
router.put('/:id', ColumnValidation.update, ColumnController.update);

export const ColumnRoutes = router;
