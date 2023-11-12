import {Router} from 'express'
import { authenticate, login, logout, register } from '../controllers/auth_controller.js'
import { upload } from '../middlewares/multer_middleware.js'
import { validateLoginInput, validateRegisterInput } from '../middlewares/validation_middleware.js'
import { authenticateUser } from '../middlewares/authentication_middleware.js'

const router = Router()

router.route('/register').post(upload.single('image'),validateRegisterInput,register)
router.route('/login').post(upload.single(''),validateLoginInput, login)
router.route('/authenticate').get(authenticateUser, authenticate)
router.route('/logout').post(authenticateUser, logout)

export default router