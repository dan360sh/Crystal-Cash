import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
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
    @Patch(':id')
    async editFilling(@Param('id') id: string, @Body() fillingDto: MetaPlace){
        let filling = await this.fillingAdsService.editFilling(id, fillingDto);
        return filling;
    }

    @Delete(':id')
    async deleteFilling(@Param('id') id: string){
        let filling = await this.fillingAdsService.deleteFilling(id);
        return filling;
    }

    @Get('getFillings')
    getFillings(){
        return this.fillingAdsService.getFillings();
    }
}
