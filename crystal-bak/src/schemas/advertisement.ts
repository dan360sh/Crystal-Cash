import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {User} from "./users";

export interface countMaxMin{max: number, min: number}
export enum wherePlace {
    // вместо
    instead = 'instead',
    // Внутри до
    insideFront = 'insideFront',
    // Внутри после
    insideAfter = 'insideAfter',
    //после
    after = 'after',
    // до
    before = 'before',
    //удалить
    remove = 'remove'

}
export type AdvertisementDocument = User & Document;
@Schema()
export class Advertisement {

    @Prop()
    selector: string;

    @Prop()
    maxCount: number;

    @Prop()
    minCount: number;

    @Prop()
    wherePlace: wherePlace;

    @Prop()
    name: string;

    @Prop()
    priority: number;

    @Prop()
    html: string;

    @Prop()
    type: string;

}
export const AdvertisementSchema = SchemaFactory.createForClass(Advertisement);