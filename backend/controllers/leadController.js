import { Lead } from "../models/lead.model.js"

export const createPublicLead = async (req, res, next) => {
    try {
        const lead = await Lead.create({
            ...req.body, 
            activities: [{
                action: "Lead Created",
        }]
        })

        res.status(201).json({
            success: true,
            message: "Public Lead Created",
            lead
        })
    } catch (error) {
        next(error)
    }
}

export const createLead = async (req, res, next) => {
    try {
        const lead = await Lead.create({
            ...req.body,
            createdBy: req.user.id,
            activities: [{
                action: "Lead Created",
                performedBy: req.user.id
            }]
        })

        res.status(201).json({
            success: true,
            message: "Authenticated Lead Created",
            lead
        })

    } catch (error) {
        next(error)
    }
}

export const getLeads = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const search = req.query.search || ""
        const status = req.query.status
        const assignedTo =req.query.assignedTo

        const query = {}

        if(search) {
            query.$or = [
                {name: {
                    $regex: search,
                    $options: "i"
                }},
                {email: {
                    $regex: search,
                    $options: "i"
                }}
            ]
        }

        if(status) {
            query.status = status
        }

        if(assignedTo) {
            query.assignedTo = assignedTo
        }

        if(req.user.role === "member") {
            query.assignedTo = req.user.id
        }

        const total = await Lead.countDocuments(query)

  
        const leads = await Lead.find(query)
        .populate("assignedTo", "name email")
        .populate("createdBy", "name")
        .skip((page -1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            message: "Leads Fetched",
            total,
            page,
            totalPages: Math.ceil(total/limit),
            leads
        })
    } catch (error) {
        next(error)
    }
}

export const getSingleLead = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id)
        .populate("assignedTo", "name email")
        .populate("notes.createdBy", "name")

        if(!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead Not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Lead Fetched",
            lead
        })
    } catch (error) {
        next(error)
    }
}

export const updateLead = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id)

        if(!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            })
        }

        Object.assign(lead, req.body)

        lead.activities.push({
            action: "Lead Updated",
            performedBy: req.user.id
        })

        await lead.save()
        res.status(200).json({
            success: true,
            message: "Lead Updated",
            lead
        })
    } catch (error) {
        next(error)
    }
}

export const deleteLead = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id)

        if(!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            })
        }

        await Lead.deleteOne()

        res.status(200).json({
            success: true,
            message: "Lead Deleted"
        })
    } catch (error) {
        next(error)
    }
}

export const updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        const lead = await Lead.findById(req.params.id)

        if(!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            })
        }

        if(req.user.role === "member" && lead.assignedTo.toString() !== req.user.id) {
            return res.status(404).json({
                success: false,
                message: "Access Denied"
            })
        }

        lead.status = status

        lead.activities.push({
            action: `Status changed to${status}`,
            performedBy: req.user.id
        })

        await lead.save()

        // console.log(lead.status);
        
        res.status(200).json({
            success: true,
            message: "Lead Status Updated",
            lead
        })

    } catch (error) {
        next(error)
    }
}

export const addNote = async (req, res, next) => {
    try {
        const {note} = req.body;

        const lead = await Lead.findById(req.params.id)

        if(!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            })
        }

        lead.notes.push({
            text: note,
            createdBy: req.user.id
        })

        lead.activities.push({
            action: "Note Added",
            performedBy: req.user.id
        })

        await lead.save()

        res.status(200).json({
            success: true,
            message: "Note Added",
            lead
        })

    } catch (error) {
        next(error)
    }
}