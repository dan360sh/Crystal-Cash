import { Injectable } from '@nestjs/common';

import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model, Schema, Types} from "mongoose";

import {
    TransactionHistory,
    TransactionHistoryDocument,
} from "../../schemas/transactionHistory";
import {Message, MessageDocument} from "../../schemas/message";
import {User, UserDocument} from "../../schemas/users";



@Injectable()
export class MessageService {
    constructor( @InjectModel(TransactionHistory.name) private TransactionHistoryModel: Model<TransactionHistoryDocument>,
                 @InjectModel(User.name) private userModel: Model<UserDocument>,
                 @InjectModel(Message.name) private MessageModel: Model<MessageDocument>) {
    }
    async newMessage(message: string, user: string){
        const userObjectId = new mongoose.Types.ObjectId(user);
        await new this.MessageModel({message, userId: user })?.save();
        let x = await this.userModel.updateOne({_id: userObjectId}, {$inc:{
                messageCount: 1
            }})
        console.log('x', x)
    }

    async newTransactionHistory(message: string, crystalCount: number, user: string){
        console.log("user", user);
        const userObjectId = new mongoose.Types.ObjectId(user);
        let date = Math.round(new Date().getTime()/1000);
        await new this.TransactionHistoryModel({message, userId: user, countCrystal: crystalCount, date})?.save();
        let x = await this.userModel.updateOne({_id: userObjectId}, {$inc:{
                transactionHistoryCount: 1,
                countCristal: crystalCount
        }})
        console.log('x', x)
    }

    async transactionHistory(token?: string){
        let user = await this.userModel.findOne({token});
        if(user){
            return await this.TransactionHistoryModel.find({userId: user._id}, {message: 1, countCrystal: 1, date: 1});
        }
        return 'no';
    }
}
