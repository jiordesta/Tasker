import {Router} from 'express'
import { createProject } from '../controllers/project_controller.js'
import { upload } from '../middlewares/multer_middleware.js'
import { authenticateUser } from '../middlewares/authentication_middleware.js'
import { validateCreateProjectInput } from '../middlewares/validation_middleware.js'

const router = Router()

router.route('/create').post(authenticateUser,upload.single('image'),validateCreateProjectInput,createProject)

export default router