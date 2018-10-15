import User from '../models/user'
import { Service } from 'typedi'
import { Query } from 'mongoose'
import bcrypt, { hash } from 'bcrypt'
import crypto from 'crypto'

@Service()
export default class UserService{

    async create( name: string, email: string, password: string ){
        const user = new User({ name, email, password, sessions: [] })
        user.password = await bcrypt.hash(password, 10)

        const createdUser = await user.save()
        console.log(createdUser)

        return createdUser
    }

    async createSession(email: string, password: string) {
        const user = await User.findOne({ email })

        if (!user || !await bcrypt.compare( password, user.password )){
            throw new Error('User not authenticated!')
        }

        const token = crypto.randomBytes(32).toString('hex')
        const session = { token }

        await User.findOneAndUpdate({ _id: user.id }, { $push: { sessions: session } })

        return session

    }

    async update( _id: string, name: string, password: string ){

        return await User.findOneAndUpdate(
            { _id },
            { $set: { name, password: await bcrypt.hash(password, 10)}}
        )
    }

    async remove( _id: string ){

        return await User.findByIdAndRemove({ _id })
    }

}