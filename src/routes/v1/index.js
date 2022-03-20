import express from 'express'
import { HttpStatusCode } from '*/utilities/constants'
import { BoardRoutes } from './board.route'
import { ColumnRoutes } from './column.route'
import { CardRoutes } from './card.route'

const router = express.Router()

// Get v1/status
router.get('/status', (req, res) =>
	res.status(HttpStatusCode.OK).json({ status: 'OK!' })
)

// Boards APIs
router.use('/boards', BoardRoutes)

// Columns APIs
router.use('/columns', ColumnRoutes)

// Cards APIs
router.use('/cards', CardRoutes)

export const apiV1 = router
