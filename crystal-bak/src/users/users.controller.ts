import {Body, Controller, Get, Post, Req, Response, Ip} from '@nestjs/common';
import {UsersService} from "./users.service";
import {AuthDto, CreateUserDto, MailСonfirmDto} from "./dto/createUserDto";
import {MessageService} from "./message/message.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
                private readonly messageService: MessageService) {
    }
    @Post()
    async newUsers(@Body() userDto: CreateUserDto, @Response() res){
        return await this.usersService.newUsers(userDto, res);
    }
    @Get('getUser')
    async getUser(@Req() req: any){
        console.log(req.headers, 'headers1');
        console.log(req.headers.authorization, 'headers');
        return await this.usersService.getUser(req.headers.authorization);
    }
    @Post('mailConfirm')
    async mailСonfirm(@Body() mailСonfirmDto: MailСonfirmDto){
        return await this.usersService.mailСonfirm(mailСonfirmDto);
    }
    @Post('auth')
    async auth(@Body() authDto: AuthDto,  @Response() res){
        return await this.usersService.auth(authDto, res);
    }
    @Post('restorePassword')
    async restorePassword(){
        return await this.usersService.restorePassword();
    }
    @Post('out')
    async out(@Req() req: any, @Response() res){
        return await this.usersService.out(req.headers.authorization, res);
    }

    @Post('crystalSearch')
    async crystalSearch(@Body() body: any, @Response() res, @Ip() ip){
        return await this.usersService.crystalSearch(body, res, ip);
    }

    @Get('transaction-history')
    async transactionHistory(@Req() req: any){
        return await this.messageService.transactionHistory(req.headers.authorization);
    }
}
