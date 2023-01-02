import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {FillingAdsService} from "../filling-ads/filling-ads.service";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../schemas/users";
import {Model} from "mongoose";
import {MessageService} from "../users/message/message.service";

@Injectable()
export class CrystalService {

    constructor(private readonly usersService: UsersService,
                private readonly fillingAdsService: FillingAdsService,
                private readonly messageService: MessageService,
                @InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async addCrystal(body?: {crystal: string, token: string}){
        let user = await this.usersService.roleUser(body.token);
        let filling = await this.fillingAdsService.getFillings(body.crystal);
        console.log(filling, "body");

        if(filling){
            if(filling.type == "crystal"){
                if(!user.foundСrystals.includes(filling._id)){
                    user.foundСrystals.push(filling._id);
                    await this.userModel.findOneAndUpdate({_id: user.id}, {foundСrystals:  user.foundСrystals});
                    this.messageService.newTransactionHistory("Вы нашли кристал", 5, user.id);
                }
            }
        }
        return user;
    }
}
