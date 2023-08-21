import { Jwt } from "jsonwebtoken"

export type SendMailProps = {
    userEmail:string,
    subject:string,
    content:string
}

export type RenewAccessTokenProps = {
    oldToken:Jwt,
    duration:string
}

export type ValidateTokenProps = {
    token:string,
    secretKey:string
}

export type TokenPayload = {
    email:string,
    name:string,
    id:string,
    refreshToken:string
}