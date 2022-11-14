import {Body, Injectable, Post} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Advertisement, AdvertisementDocument} from "../schemas/advertisement";
import {Model} from "mongoose";
import {UrlFilling, UrlFillingDocument} from "../schemas/urlFilling";
import {MetaPlace} from "../dto/crystalDto";

@Injectable()
export class UrlFillingService {
    constructor(@InjectModel(UrlFilling.name) private UrlFillingModel: Model<UrlFillingDocument>) {
    }

    async urlFilling(fillingUrl: any){
        let filling = new this.UrlFillingModel(fillingUrl);
        let save;
        try{
            save = await filling.save();
        }catch (e){
            return e
        }
        return save;
    }
    async deleteUrlFilling(id: string){
        return await this.UrlFillingModel.findOneAndDelete({_id: id});
    }
    async editUrlFilling(id: string, fillingUrl: any){
        return await this.UrlFillingModel.findOneAndUpdate({_id: id}, fillingUrl)
    }

    async getUrlFilling (){
        return await this.UrlFillingModel.find({})
    }


}
