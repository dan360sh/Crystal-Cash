import {Body, Injectable, Post, Response} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/createUserDto";
import {InjectModel, Prop} from "@nestjs/mongoose";
import {Advertisement, AdvertisementDocument, wherePlace} from "../schemas/advertisement";
import {Model} from "mongoose";
import {MetaPlace} from "../dto/crystalDto";
import {UrlFilling, UrlFillingDocument} from "../schemas/urlFilling";

@Injectable()
export class FillingAdsService {
    constructor( @InjectModel(Advertisement.name) private AdvertisementModel: Model<AdvertisementDocument>,
                 @InjectModel(UrlFilling.name) private UrlFillingModel: Model<UrlFillingDocument>) {
    }
    async newFilling(fillingDto: MetaPlace){
        return new this.AdvertisementModel(fillingDto)
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
    async getFillings(){
        return await this.AdvertisementModel.find({}, {id: 1, name: 1})
    }
}
