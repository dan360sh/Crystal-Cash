import {Body, Controller, Post, Req} from '@nestjs/common';
import {CrystalService} from "./crystal.service";

@Controller('crystal')
export class CrystalController {
    constructor(private readonly crystalService: CrystalService){

    }
    @Post()
    async addCrystal(@Body() body: {crystal: string, token: string}){
        return await this.crystalService.addCrystal(body);
    }
}
