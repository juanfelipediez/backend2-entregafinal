import dotenv from "dotenv"

dotenv.config()
export const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    PERSISTANCE: "mongo",
    mailer: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    }
}