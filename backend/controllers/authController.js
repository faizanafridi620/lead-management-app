import bcrypt from "bcryptjs"
import { validationResult } from "express-validator"
import { User } from "../models/user.model.js"
import generateToken from "../utils/generateToken.js"

export const register = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }

        const {name, email, password, role} = req.body;

        const isExistingUser = await User.findOne({ email })

        if(isExistingUser) return res.status(400).json({
            success: false,
            message: "User already exist"
        })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name, email, password: hashedPassword, role
        })

        res.status(201).json({
            success: true,
            token: generateToken(user),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User Not Found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password"
            })
        }

        res.status(200).json({
            success: true,
            token: generateToken(user),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })

    } catch (error) {
        next(error)
    }
}