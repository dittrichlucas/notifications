import { prop, Typegoose } from 'typegoose'

class Notification extends Typegoose {
    @prop() message: string
    @prop() date: Date
    @prop() userId: string
}

export default new Notification().getModelForClass(Notification)