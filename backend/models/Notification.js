import mongoose from 'mongoose'

const NotificaionSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mesasge: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Notification = mongoose.model("Notification", NotificaionSchema);
module.exports = Notification;