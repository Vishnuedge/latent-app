import { Router } from "express";
import { generateKey, generateToken, verifyToken } from "authenticator"
const router = Router();

router.post('/signup', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const userName = req.body.userName;
    const totp = generateToken(phoneNumber + "SIGNUP")
    res.json({
        id: "1"
    })

})

router.post("/signup/verify", (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const otp = req.body.otp
    const verified = verifyToken(phoneNumber + "SIGNUP", otp);
    console.log(verified)
    if (!verified) {
        res.json({
            message: "Invalid Token"
        })
        return
    }

    res.json({
        id: "1"
    })

})

export default router;