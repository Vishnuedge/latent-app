import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const createMessage = async (body: string, to: string) => {
    await client.messages.create({
        from: "+1 567 587 1481",
        body,
        to,
    });
}
