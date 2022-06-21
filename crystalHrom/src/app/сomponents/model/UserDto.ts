export class CreateUserDto {
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
}
export class MailСonfirmDto{
  readonly email?: string;
  readonly cod?: string;
}
export class AuthDto{
  readonly name?: string;
  readonly password?: string;
}
export interface GetUsers{
  name?: string;
  email?: string;
  status?: number;
  role?: string;
  token?: string;
  ref?: string;
  countCristal?: number;
  messageCount?: number;
  transactionHistoryCount?: number;
}
export interface ErrorDto {
  message?: string;
  errorField? : string
  errorCod?: number;
}
export interface errorFields{

}
