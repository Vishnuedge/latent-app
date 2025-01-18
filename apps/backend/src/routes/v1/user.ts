import { Router } from "express";
import { client } from '@repo/db/client'
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";
import { createMessage } from "../../utils/twilio";
import { generateTotpToken, verifyTotpToken } from "../../utils/totp";
const router = Router();

router.post('/signup', async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const userName = req.body.userName;

    const user = await client.user.upsert({
        where: {
            phoneNumber: phoneNumber,
        },
        create: {
            phoneNumber: phoneNumber,
            userName: userName
        },
        update: {

        }
    })
    const totp = generateTotpToken(phoneNumber, "AUTH")
    if (process.env.NODE_ENV === "production") {
        await createMessage(`This your OTP ${totp}`, phoneNumber)
    }
    res.json({
        id: user.id
    })

})

router.post("/signup/verify", async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const userName = req.body.userName;
    const otp = req.body.otp

    if (process.env.NODE_ENV === "production" && !verifyTotpToken(phoneNumber, "AUTH", otp)) {
        res.json({
            message: "Invalid Token"
        })
        return
    }
    const user = await client.user.update({
        where: {
            phoneNumber: phoneNumber
        },
        data: {
            userName: userName,
            verified: true,
        }
    })

    const token = jwt.sign({
        userId: user.id
    }, JWT_PASSWORD)
    res.json({
        token
    })

})

router.post('/signin', async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    try {
        const user = await client.user.findFirstOrThrow({
            where: {
                phoneNumber: phoneNumber
            },
        })
        console.log(user)
    } catch (error) {
        console.log(error)
        throw new Error("Some errror")
    }
    const totp = generateTotpToken(phoneNumber, "AUTH")
    if (process.env.NODE_ENV === "production") {
        await createMessage(`This your OTP ${totp}`, phoneNumber)
    }
    res.json({
        message: "OTP Sent!"
    })
})

router.post('/signin/verify', async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const otp = req.body.otp;
    if (process.env.NODE_ENV === "production" && !verifyTotpToken(phoneNumber, "AUTH", otp)) {
        res.json({
            message: "Invalid Token"
        })
        return
    }

    const user = await client.user.findFirstOrThrow({
        where: {
            phoneNumber: phoneNumber
        },
    })

    const token = jwt.sign({
        userId: user.id
    }, JWT_PASSWORD)
    res.json({
        token
    })
})

export default router;