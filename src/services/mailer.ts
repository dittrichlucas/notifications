import nodemailer, { Transporter } from 'nodemailer'
import { Service } from 'typedi'

type Email = {
    from: string
    to: string[]
    subject: string
    text: string
}

@Service()
export class Mailer {

    private readonly transport: Transporter

    constructor() {
        this.transport = nodemailer.createTransport({
            host: 'localhost',
            port: 1026,
            connectionTimeout: 5000,
            ignoreTLS: true
        })
    }

    async mail(email: Email) {
        try {
            await this.transport.sendMail(email)
        } catch (err) {
            console.error(`Local mail server seems to be offline: ${err.message}`)
        }
    }
}
