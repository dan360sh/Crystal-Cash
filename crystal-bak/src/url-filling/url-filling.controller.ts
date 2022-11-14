import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UrlFillingService} from "./url-filling.service";

@Controller('url-filling')
export class UrlFillingController {
    constructor(private readonly urlFillingService: UrlFillingService) {
    }
    @Post()
    async urlFilling(@Body() fillingDto: any){
        return await this.urlFillingService.urlFilling(fillingDto);
    }
    @Get()
    async getUrlFilling(){
        return await this.urlFillingService.getUrlFilling();
    }
    @Patch(':id')
    async editUrlFilling(@Param('id') id: string, @Body() fillingDto: any){
        return await this.urlFillingService.editUrlFilling(id, fillingDto);
    }

    @Delete(':id')
    async deleteUrlFilling(@Param('id') id: string){
        return await this.urlFillingService.deleteUrlFilling(id);
    }
}
