import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../schemas/users";
import {Model} from "mongoose";
import {AuthDto, CreateUserDto, ErrorMessage, GetUsers, MailСonfirmDto} from "./dto/createUserDto";
import {createTransport} from "nodemailer";
import {Advertisement, AdvertisementDocument, wherePlace} from "../schemas/advertisement";
import {HistoryDocument, History} from "../schemas/history";
import {UrlFilling, UrlFillingDocument} from "../schemas/urlFilling";
import {MessageService} from "./message/message.service";
import {TransactionHistorySchema} from "../schemas/transactionHistory";
import {
    advertisementParse,
    parseQuery,
    responsePreparation,
    searchParse,
    searchСompare,
    urlParams
} from "../function/parseUrl";

export function reformatorUser(save: any, token?: string): GetUsers {
    return {
        name: save.name,
        status: save.status,
        role: save.role,
        email: save.email,
        token: token ?? save.token,
        ref: save.ref,
        countCristal: save.countCristal,
        messageCount: save.messageCount,
        transactionHistoryCount: save.transactionHistoryCount
    }
}

export function transformAdvertisement(advertisement: any): advertisementParse {
    return {
        selector: advertisement.selector,
        maxCount: advertisement.maxCount,
        minCount: advertisement.minCount,
        priority: advertisement.priority,
        html: advertisement.html,
        wherePlace: advertisement. wherePlace
    }
}

export interface ErrorStringLength {
    value?: string;
    lengthMin?: number;
    lengthMax?: number;
    name?: string;
    nameUser?: string;
}

export function errorRequired(stringLength: ErrorStringLength[]) {
    const errors: ErrorMessage[] = [];
    for (let el of stringLength) {
        if (el.value && el.value?.length > 0) {
            if (el.lengthMin) {
                if (el.value.length < el.lengthMin) {
                    errors.push({
                        message: `Длина поля '${el.nameUser}' должна быть не меньше ${el.lengthMin} символов.`,
                        errorField: el.name
                    })
                }
            }
            if (el.lengthMax) {
                if (el.value.length > el.lengthMax) {
                    errors.push({
                        message: `Длина поля '${el.nameUser}' не должна превышать ${el.lengthMax} символов.`,
                        errorField: el.name
                    })
                }
            }
        } else {
            errors.push({
                message: `Поле '${el.nameUser}' недолжно быть пустым.`,
                errorField: el.name
            })
        }

    }
    if (errors.length > 0) {
        throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
}

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Advertisement.name) private AdvertisementModel: Model<AdvertisementDocument>,
        @InjectModel(History.name) private HistoryModel: Model<HistoryDocument>,
        @InjectModel(UrlFilling.name) private UrlFillingModel: Model<UrlFillingDocument>,
        readonly messageService: MessageService
    ) {
    }

    async newUsers(userDto: CreateUserDto, res: any) {
        errorRequired([
            {value: userDto.name, nameUser: "имя пользователя", name: "name", lengthMin: 3, lengthMax: 12},
            {value: userDto.password, nameUser: "пароль", name: "password", lengthMin: 6, lengthMax: 16},
            {value: userDto.email, nameUser: "электронная почта", name: "email", lengthMin: 4, lengthMax: 45}
        ]);
        const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        const emailCod = Math.random().toString(36).substring(9);
        const ref = Math.random().toString(36).substring(9);
        const countCristal = 2;
        const newUser = new this.userModel({
            ...userDto, status: 1, token: token, role: 'none', codeEmail: emailCod, ref, countCristal, messageCount: 0,
            transactionHistoryCount: 0
        });
        let save;
        try {
            save = await newUser.save();
        } catch (e) {
            res.status(400);
            return res.send([{message: "Пользователь уже существует", errorField: "name"}]);
        }
        await this.sendEmail('Код активации: ' + emailCod, userDto.email);
        this.messageService.newMessage("Спасибо за регистрацию регистацию !", newUser.id);
        this.messageService.newTransactionHistory("За регистацию", 3, newUser.id);
        res.cookie('lol', token);
        return res.send(reformatorUser(save, token));
    }

    async getUser(token?: string) {
        console.log('getUser', token);
        let o = await this.userModel.findOne({token});
        console.log(o);

        if (!o) {
            throw new HttpException([{message: "не авторизован"}], HttpStatus.BAD_REQUEST);
        }
        this.messageService.newTransactionHistory("За посещение ресурса", -1, o.id);
        return o;
    }

    async mailСonfirm(mailСonfirmDto: MailСonfirmDto) {
        if (mailСonfirmDto.email.length > 3 && mailСonfirmDto.cod.length > 2) {
            let newStatus: any = await this.userModel.findOneAndUpdate({
                email: mailСonfirmDto.email,
                codeEmail: mailСonfirmDto.cod,
                status: 1
            }, {status: 2});
            console.log("newStatus", newStatus);
            if (newStatus) {
                newStatus = reformatorUser({...newStatus, status: 2});
                return newStatus;
            }
            throw new HttpException([{message: "Пользователь не найден", errorField: "cod"}], HttpStatus.BAD_REQUEST);
        } else {
            throw new HttpException([{message: "код не верен", errorField: "cod"}], HttpStatus.BAD_REQUEST);
        }
    }

    async auth(authDto: AuthDto, res: any) {
        //const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        const user = await this.userModel.findOne({name: authDto.name});
        if (user) {
            if (user.password === authDto.password) {
                res.cookie('lol', user.token);
                return res.send(reformatorUser(user, user.token));
            } else {
                res.status(400);
                return res.send([{message: "Пароль не верен", errorField: "password"}]);
            }
        }
        res.status(400);
        return res.send([{message: "Такого пользователя не существует", errorField: "name"}]);
    }

    async out(token: string, res: any) {
        //let newToken = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        let user = await this.userModel.findOne({token});
        if (user) {
            res.cookie('lol', '');
            return res.send('');
        }
        return res.send('');
    }

    async crystalSearch(brouser: any, res: any, ip: string) {
        // console.log(brouser.token)
        // console.log(brouser);
        // console.log(ip);

        let user;
        user = await this.userModel.findOne({token: brouser.token});
        // console.log('', user)
        if (!user) {
            user = new this.userModel({noToken: brouser.noToken});
            if (!user) {
                user = await new this.userModel({noToken: brouser.noToken});
                user = await user.save();
            }
        }

        new this.HistoryModel({user: user.id, domen: brouser.domen, url: brouser.history}).save();

        //распаршенный урл
        let parseUrl = parseQuery(brouser.history);
        let domenData = await this.UrlFillingModel.find({$or: [{domen: brouser.domen}, {url: parseUrl.path}]},
            {search: 1, advertisement: 1, url: 1, domen: 1,});

        //Массив урлов
        let urlFilling = [];
        if (domenData) {
            for (let data of domenData) {
                if (data.domen === brouser.domen && data.url == "*") {
                    console.log('data', data);
                    urlFilling.push(data);
                }
                if (data.domen === "*" && data.url == parseUrl.path) {
                    console.log('path_data', data);
                    urlFilling.push(data);
                }
            }
        }

        if (parseUrl.query?.q) {
            urlFilling = urlFilling.filter(i => {
                if (i.search != null) {
                    if (searchСompare(i.search.split('+'), parseUrl.query.q.split('+'))) {
                        return true;
                    }
                } else {
                    return true;
                }
            })
        }

        urlFilling = urlFilling.map(e =>  e.advertisement);
        let mass2 = [];
        for(let i of urlFilling){
            mass2.push(...i);
        }
        urlFilling = mass2;
        console.log(' urlFilling', urlFilling)
        let otvet: any = [];
        if (urlFilling.length > 0) {
            let a = await this.AdvertisementModel.find({_id: {$in: urlFilling}}, {
                selector: 1,
                maxCount: 1,
                minCount: 1,
                priority: 1,
                html: 1,
                wherePlace: 1
            });
            console.log('a', a);
            if (a) {
                let ad: advertisementParse[] = [];
                for (let j of a) {
                    ad.push(transformAdvertisement(j));
                }
                otvet = responsePreparation(ad);
                console.log('otvet', otvet);
            }
        }
        return res.send(otvet);
    }


    async restorePassword() {

    }

    async sendCodRestorePassword(email: string) {
        const emailCod = Math.random().toString(36).substring(9);
        let codBd = await this.userModel.findOneAndUpdate({email: email, status: 2}, {cod: emailCod});
        // console.log(codBd);
        await this.sendEmail('Код для смены пароля: ' + emailCod, email);
    }

    async sendEmail(message: string, emailTo: string) {
        const transporter = createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'danil.shilov.2023@mail.ru',
                pass: 'dkBpJy8D47SaFy2uRTEs'
            }
        });
        try {
            await transporter.sendMail({
                from: 'danil.shilov.2023@mail.ru',
                to: emailTo,
                subject: 'Активация аккаунта',
                text: message
            });
            return 'ok';
        } catch (e) {
            throw new HttpException([{
                message: 'Неудалось отправить сообщение, проверьте правильность написания почты',
                errorField: "email"
            }], HttpStatus.BAD_REQUEST);
        }
    }
}
