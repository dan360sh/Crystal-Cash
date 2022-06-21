export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}
export class MailСonfirmDto{
    readonly email: string;
    readonly cod: string;
}
export class AuthDto{
    readonly name: string;
    readonly password: string;
}
export class GetUsers{
    name: string;
    email: string;
    status: number;
    role: string;
    token: string;
    ref?: string;
    countCristal?: number;
    messageCount?: number;
    transactionHistoryCount?: number;
}

export class ErrorMessage{
    errorField?: string;
    message: string;
}