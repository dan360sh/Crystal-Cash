import mongoose, {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {User} from "./users";

export type HistoryDocument = History & Document;
@Schema()
export class History {

    @Prop()
    url: string;

    @Prop()
    domen: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

}
export const HistorySchema = SchemaFactory.createForClass(History);