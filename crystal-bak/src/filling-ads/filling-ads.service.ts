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
    async editFilling(id: string, fillingDto: MetaPlace){
        return await this.AdvertisementModel.findOneAndUpdate({_id: id}, fillingDto)
    }
    async deleteFilling(id: string){
        return await this.AdvertisementModel.findOneAndDelete({_id: id});
    }

    async getFillings(advertisement?: string): Promise<any>{
        if(advertisement){
            return await this.AdvertisementModel.findOne({_id: {$in: advertisement}});
        }
        return await this.AdvertisementModel.find({})
    }
}
