import nodemailer from "nodemailer";
import { config } from "../config/config.js";

export class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.mailer.host,
            port: config.mailer.port,
            auth: config.mailer.auth,
        });
        this.from = "emi.perez997@gmail.com";
    }


    async sendMail({ to, subject, html }) {
        try {
            const result = await this.transporter.sendMail({
                from: this.from,
                to,
                subject,
                html,
                attachments: [],
            });
            console.log(result);
        }   catch (error) {
            console.log(error);
        }
    }
}
