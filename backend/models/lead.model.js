import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true})

const activitySchema = new mongoose.Schema({
    actions: String,
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    }
})

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["New" , "Contacted", "Qualified","Proposal Sent", "Closed"],
        default: "New",
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    notes: [notesSchema],
    activities: [activitySchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    }
}, {timestamps: true})

export const Lead = mongoose.model("Lead", leadSchema)