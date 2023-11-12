import { StatusCodes } from 'http-status-codes'
import User from '../models/User.js'
import { BadRequestError } from '../utils/custom_errors.js'

export const fetchAllUsers = async (req, res) => {
    const users = await User.find({})
    if(!users) throw new BadRequestError('There was an error occured!')
    res.status(StatusCodes.OK).json({users})
}