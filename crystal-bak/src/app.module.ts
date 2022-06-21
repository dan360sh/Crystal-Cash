import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import {User, UserSchema} from "./schemas/users";
import {join} from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import {Advertisement, AdvertisementSchema} from "./schemas/advertisement";
import { FillingAdsController } from './filling-ads/filling-ads.controller';
import { FillingAdsService } from './filling-ads/filling-ads.service';
import {UrlFilling, UrlFillingSchema} from "./schemas/urlFilling";
import {History, HistorySchema} from "./schemas/history";
import {TransactionHistory, TransactionHistorySchema} from "./schemas/transactionHistory";
import {Message, MessageSchema} from "./schemas/message";
import {MessageService} from "./users/message/message.service";

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost:27017'),
      MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
      MongooseModule.forFeature([{name: Advertisement.name, schema: AdvertisementSchema}]),
      MongooseModule.forFeature([{name: UrlFilling.name, schema: UrlFillingSchema}]),
      MongooseModule.forFeature([{name: History.name, schema: HistorySchema}]),

      MongooseModule.forFeature([{name: TransactionHistory.name, schema: TransactionHistorySchema}]),
      MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}]),
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '../..', 'crystalChrome/dist/crystal-chrome')
    }),
  ],
  controllers: [AppController, UsersController, FillingAdsController],
  providers: [AppService, UsersService, FillingAdsService, MessageService],
})
export class AppModule {
    constructor() {
        console.log('__dirname', __dirname);
    }
}
