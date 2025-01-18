import { generateToken, verifyToken } from "authenticator";
export const generateTotpToken = (phoneNumber: string, pad: string) => {
    return generateToken(phoneNumber + pad + process.env.TOTP_SECRET)
}

export const verifyTotpToken = (phoneNumber: string, pad: string, totp: string) => {
    return verifyToken(phoneNumber + pad + process.env.TOTP_SECRET, totp)
}