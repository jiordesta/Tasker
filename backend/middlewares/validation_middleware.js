import {body, validationResult, param} from 'express-validator'
import { BadRequestError, NotFoundError } from '../utils/custom_errors.js'
import User from '../models/User.js'
import mongoose from 'mongoose'

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                const errorMessages = errors.array().map((error) => error.msg)
                throw new BadRequestError(errorMessages)
            }
            next()
        }
    ]
}

export const validateRegisterInput = withValidationErrors(
    [
        body('fname').notEmpty().withMessage('fname is required'),
        body('lname').notEmpty().withMessage('lname is required'),
        body('description').notEmpty().withMessage('description is required'),
        body('username').notEmpty().withMessage('username is required').custom( async (username) => {
            const user = await User.findOne({username})
            if(user) throw new BadRequestError('username already exist')
        }),
        body('password').notEmpty().withMessage('password is required'),
    ]
)

export const validateLoginInput = withValidationErrors(
    [
        body('username').notEmpty().withMessage('Username is Required!').custom(async (username) => {
            const user = await User.findOne({username})
            if(!user) throw new NotFoundError('The username you provided does not exist!')
        }),
        body('password').notEmpty().withMessage('Password is Required!')
    ]
)

export const validateCreateProjectInput = withValidationErrors(
    [
        body('title').notEmpty().withMessage('Title is Required!'),
        body('description').notEmpty().withMessage('Description is Required!'),
        body('start').notEmpty().withMessage('Start Date is Required!'),
        body('end').notEmpty().withMessage('End Date is Required!'),
    ]
)