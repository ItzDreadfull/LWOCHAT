import mongoose, { Document, Schema } from "mongoose";


export interface Conversation extends Document {
    participants: [],
    messages: []
}

const ConversationSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
    }
    ],
}, { timestamps: true })


const ConversationModel = (mongoose.models.Conversation as mongoose.Model<Conversation>) || mongoose.model<Conversation>("Conversation", ConversationSchema)

export default ConversationModel;