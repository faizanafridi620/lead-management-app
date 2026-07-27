import mongoose from "mongoose"
import dotenv from "dotenv"
import app from "./app.js"

dotenv.config()

const port = process.env.PORT || 4000


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(port, () =>{
            console.log(`Server is running on port: ${port}`);
            
        })
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB", error)
    })