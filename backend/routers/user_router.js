import {Router} from 'express'
import { fetchAllUsers } from '../controllers/user_controller.js'
import { authenticateUser } from '../middlewares/authentication_middleware.js'

const router = Router()

router.route('/fetch_all').get(authenticateUser,fetchAllUsers)

export default router