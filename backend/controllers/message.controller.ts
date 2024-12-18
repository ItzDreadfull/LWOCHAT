import { Request, Response } from "express";
import responseMsg from "../helpers/responseMsg";
import ConversationModel from "../models/conversationModel";
import MessagesModel from "../models/MessageModel";
import { Types } from "mongoose";
import { User } from "../models/User";
import { getReceiverSocketId, io } from "../socket/socket";



interface CustomRequest extends Request {
    user?: User;
}

export const sendMessage = async (req: CustomRequest, res: Response) => {
    try {
        const { msg: message } = req.body;
        const { id: receiverId } = req.params;
        const sender = req.user;
        if (!sender) {
            return responseMsg(res, false, "Not Authentcated User.", 401);
        }

        let conversation = await ConversationModel.findOne({
            participants: { $all: [sender._id, receiverId] }
        })

        if (!conversation) {
            conversation = await ConversationModel.create({
                participants: [sender._id, receiverId]
            })
        }

        const newMessage = new MessagesModel({
            senderId: sender._id,
            receiverId,
            messageContent: message
        })

        if (newMessage) {
            const mId: any = newMessage._id;
            (conversation.messages as Types.ObjectId[]).push(mId);


            // await conversation.save();
            // await newMessage.save();
            // shorthand of upper two commants
            await Promise.all([conversation.save(), newMessage.save()]);


            //socate-Io for real time conversations
            const receiverSocketId = getReceiverSocketId(receiverId);

            // io.to(<socket_id>).emit() used to send events to specific clients
            io.to(receiverSocketId).emit("newMessage", newMessage)


            return responseMsg(res, true, newMessage, 200);
        }
        else {
            return responseMsg(res, false, "Internul server Error", 500);

        }
    } catch (error) {
        console.log("some error in message controller", error)
        return responseMsg(res, false, "Internal server error", 500);

    }
}

export const getMessage = async (req: CustomRequest, res: Response) => {
    try {
        const { id: userToChatId } = req.params;
        const sender = req.user;
        if (!sender) {
            return responseMsg(res, false, "Not Authentcated User.", 401);
        }

        let conversation = await ConversationModel.findOne({
            participants: { $all: [sender._id, userToChatId] }
        }).populate("messages");

        if (!conversation) {
            return responseMsg(res, false, [], 200);
        }

        return responseMsg(res, true, conversation.messages, 200);


    } catch (error) {
        console.log("some error in message controller", error)
        return responseMsg(res, false, "Cannot get messages.Internal server error", 500);

    }
}