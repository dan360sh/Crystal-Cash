import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {Advertisement} from "./advertisement";

export type UserDocument = User & Document;
@Schema()
export class User {

    @Prop({ unique: true})
    name: string;

    @Prop()
    email?: string;

    @Prop()
    status: number;

    @Prop()
    password: string;

    @Prop({ unique: true})
    token: string ;

    @Prop()
    role: string;

    @Prop()
    codeEmail: string;

    @Prop()
    noToken: string;

    //реферальный код
    @Prop()
    ref: string;
    //реферальный код
    @Prop()
    refHe: string;

    @Prop()
    countCristal: number;

    @Prop()
    messageCount: number;

    @Prop()
    transactionHistoryCount: number;

    //Найденые кристалы
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref : 'Advertisement' }]})
    foundСrystals: Advertisement [];
}

export const UserSchema = SchemaFactory.createForClass(User);