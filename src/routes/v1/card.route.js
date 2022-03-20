import express from 'express'
import { CardController } from '*/controllers/card.controller'
import { CardValidation } from '*/validations/card.validation'

const router = express.Router()

// Create new card
router.post('/', CardValidation.createNew, CardController.createNew)

export const CardRoutes = router
