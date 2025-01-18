import { describe, expect, test } from 'vitest'
import axios from "axios"

const BACKEND_URL = "http://localhost:8080"
const PHONE_NUMBER = 8681950065;
const NAME = "Vishnu"
describe("Signup endpoints", () => {
    test('Double signup doesnt works', async () => {
        const response1 = await axios.post(BACKEND_URL + '/api/v1/user/signup', {
            phoneNumber: PHONE_NUMBER,
            userName: NAME
        })

        const response2 = await axios.post(BACKEND_URL + '/api/v1/user/signup/verify', {
            phoneNumber: PHONE_NUMBER,
            otp: "000000"
        })

        expect(response1.status).toBe(200)
        expect(response1.data).not.toBeNull()
        expect(response2.status).toBe(200)

        // expect(async () => {
        //     await axios.post(BACKEND_URL + '/api/v1/user/signup', {
        //         phoneNumber: PHONE_NUMBER,
        //         userName: NAME
        //     })
        // }).toThrow();
    })
})