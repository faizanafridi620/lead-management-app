import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"

const router = express.Router()

router.get("/dashboard", authMiddleware, roleMiddleware("admin"), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Admin"
    })
})

export default router