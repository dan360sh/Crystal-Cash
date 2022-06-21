import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {TransactionHistory} from "./transactionHistory";

export type MessageDocument = TransactionHistory & Document;
@Schema()
export class Message {

    @Prop()
    message: string;

    @Prop()
    userId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);