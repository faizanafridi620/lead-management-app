import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"
import {
    createPublicLead, 
    createLead, 
    getLeads,
    getSingleLead,
    updateLead,
    deleteLead,
    updateStatus,
    addNote 
} from "../controllers/leadController.js"

const router = express.Router();

router.post("/public", createPublicLead)

router.use(authMiddleware)

router.post("/", roleMiddleware("admin"), createLead)
router.get("/", getLeads)
router.get("/:id", getSingleLead)
router.put("/:id", roleMiddleware("admin"), updateLead)
router.delete("/:id", roleMiddleware("admin"), deleteLead)
router.put("/:id/status", updateStatus)
router.post("/:id/notes", addNote)

export default router
