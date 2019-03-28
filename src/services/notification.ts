import { Service, Inject } from 'typedi'
import Notification from '../models/notification'
import { Mailer } from './mailer'
import UserService from './user'

@Service()
export default class NotificationService{

    private readonly TEN_SECONDS = 10 * 1000

    @Inject()
    private readonly mailer: Mailer

    @Inject()
    private readonly userService: UserService

    constructor() {
        setInterval(async () => {
            console.log('Verificando notificações para enviar...')
            const notifications = await Notification
                .find({ date: { $lt: new Date() } })

            for (const notification of notifications) {
                console.log(`Enviando notificação "${notification.message}"`)

                const user = await this.userService.find(notification.userId)

                if (!user) {
                    return notification.remove()
                }

                await this.mailer.mail({
                    from: 'meuapp@meuapp.com',
                    to: [user.email],
                    subject: "Nova mensagem",
                    text: notification.message
                })

                await notification.remove()
            }
        }, this.TEN_SECONDS)
    }

    async create( message: string, date: Date, id: string ){
        return new Notification({ message, date, userId: id }).save()
    }

    async update( id: string, message: string, date: Date, userId: string ){
        return await Notification.findOneAndUpdate(
            { _id: id },
            { $set: { message, date } }
        )
    }

}
