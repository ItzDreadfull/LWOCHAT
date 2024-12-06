import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
    senderId: mongoose.Schema.Types.ObjectId,
    receiverId: mongoose.Schema.Types.ObjectId,
    messageContent: string,
}

const MessagesSchema: Schema<Message> = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    messageContent: {
        type: String,
        required: true
    },
    // createdAt,updatedAt
}, { timestamps: true })

const MessagesModel = (mongoose.models.Message as mongoose.Model<Message>) || mongoose.model<Message>("Message", MessagesSchema)

export default MessagesModel;
