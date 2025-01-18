import { describe, expect, it, test } from 'vitest'
import axios from "axios"

const BACKEND_URL = "http://localhost:8080"
const NAME = "Vishnu"
const PHONE_NUMBER = "+918681950065";
const PHONE_NUMBER_1 = "+918681950062";

describe("Signup endpoints", () => {
    test('Signup User', async () => {
        const response1 = await axios.post(BACKEND_URL + '/api/v1/user/signup', {
            phoneNumber: PHONE_NUMBER,
            userName: NAME
        })
        expect(response1.status).toBe(200)
        expect(response1.data).not.toBeNull()
    })

    test('Verify after signup', async () => {
        const response2 = await axios.post(BACKEND_URL + '/api/v1/user/signup/verify', {
            phoneNumber: PHONE_NUMBER,
            userName: NAME,
            otp: "000000"
        })

        expect(response2.status).toBe(200);
        expect(response2.data).not.toBeNull();
    })
})

describe("Signin endpoints", () => {
    test('Singin User', async () => {
        const response1 = await axios.post(BACKEND_URL + '/api/v1/user/signin', {
            phoneNumber: PHONE_NUMBER,
        })
        expect(response1.status).toBe(200)
    })
    test('Verify Signin User', async () => {
        const response2 = await axios.post(BACKEND_URL + '/api/v1/user/signin/verify', {
            phoneNumber: PHONE_NUMBER,
            otp: "000000"
        })
        expect(response2.status).toBe(200)
        expect(response2.data).not.toBeNull()
    })


    it('Singin with unregistered number', async () => {
        await expect(async () => {
            await axios.post(BACKEND_URL + '/api/v1/user/signin', {
                phoneNumber: PHONE_NUMBER_1,
            })
        }).rejects.toThrowError()
    })
})