import {Body, Controller, Get, Post} from '@nestjs/common';
import {FillingAdsService} from "./filling-ads.service";
import {MetaPlace} from "../dto/crystalDto";

@Controller('filling-ads')
export class FillingAdsController {
    constructor(private readonly fillingAdsService: FillingAdsService) {
    }
    @Post()
    async newFilling(@Body() fillingDto: MetaPlace){
        let filling = await this.fillingAdsService.newFilling(fillingDto);
        filling.save();
        return filling;
    }

    @Post('urlFilling')
    async urlFilling(@Body() fillingDto: any){
        return await this.fillingAdsService.urlFilling(fillingDto);

    }
    @Get('getFillings')
    getFillings(){
        return this.fillingAdsService.getFillings();
    }
}
