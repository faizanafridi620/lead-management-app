import express from "express"
import cors from "cors"
import errorHandler from "./middlewares/errorMiddleware.js"


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    credentials: true
}))

import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import leadRoutes from "./routes/leadRoutes.js"

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/leads", leadRoutes)

app.use(errorHandler)

export default app