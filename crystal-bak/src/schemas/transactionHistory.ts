import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type TransactionHistoryDocument = TransactionHistory & Document;
@Schema()
export class TransactionHistory {

    @Prop()
    message: string;

    @Prop()
    countCrystal: number;

    @Prop()
    userId: string;

    @Prop()
    date: number;

}
export const TransactionHistorySchema = SchemaFactory.createForClass(TransactionHistory);