import { StatusCodes } from 'http-status-codes'
import User from '../models/User.js'
import { comparePassword, hashPassword } from '../utils/password.js'
import { uploadImage } from '../utils/image.js'
import { createJWT } from '../utils/token.js'
import { UnauthenticatedError } from '../utils/custom_errors.js'

export const register = async (req, res) => {
    const {fname, lname, description, username, password} = req.body
    const hashedPassword = await hashPassword(password)
    const uploadedImage = await uploadImage(req.file,'tma/users', true)
    const user = await User.create({fname, lname, description, username, password: hashedPassword, image: uploadedImage})
    res.status(StatusCodes.OK).json({user})
}

export const login = async (req, res) => {
    const user = await User.findOne({username: req.body.username})
    const validPassword = await comparePassword(req.body.password, user.password)
    if(!validPassword) throw new UnauthenticatedError('Wrong password!')

    const token = createJWT({id:user._id})
    const oneDay = 1000 * 60 * 60 * 24
    res.cookie('token',token,{
        httpOnly:true,
        expires:new Date(Date.now() + oneDay),
        secure:process.env.NODE_ENV === 'production'
    })
    res.status(StatusCodes.OK).json({user})
}

export const authenticate = async (req, res) => {
    const user = await User.findById(req.user.id)
    res.status(StatusCodes.OK).json({user})
}

export const logout = async (req, res) => {
    res.cookie('token', 'logout' ,{
        httpOnly:true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json('Logged out!')
}