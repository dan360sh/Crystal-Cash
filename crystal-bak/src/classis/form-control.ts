import {Model} from "mongoose";

export class formControl<T>{
    constructor(private readonly model: Model<T>) {
    }

    setModel(){
        this.model
    }
}
