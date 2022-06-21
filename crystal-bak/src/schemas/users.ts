import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {TransactionHistorySchema} from "./transactionHistory";

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
}

export const UserSchema = SchemaFactory.createForClass(User);