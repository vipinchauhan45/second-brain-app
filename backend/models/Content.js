import mongoose from 'mongoose'

const ContentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ["link", 'video', 'image', 'note'],
        required: true
    },
    url: {
        type: String
    },
    file: {
        type: String // For cloudinary image or screenshot
    },
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Content = mongoose.model("Content",ContentSchema);
export default Content;