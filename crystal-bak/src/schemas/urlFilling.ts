import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";

import {Advertisement} from "./advertisement";


export type UrlFillingDocument = UrlFilling & Document;
@Schema()
export class UrlFilling {

    @Prop()
    url: string;

    @Prop()
    domen: string;

    @Prop()
    search: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref : 'Advertisement' }]})
    advertisement: Advertisement [];
}
export const UrlFillingSchema = SchemaFactory.createForClass(UrlFilling);