import User from '../models/user'
import { Service } from 'typedi'
import { Query } from 'mongoose'
import bcrypt, { hash } from 'bcrypt'
import crypto from 'crypto'

@Service()
export default class NotificationService{

    async create( message: string, date: Date, id: string ){
        return
    }
}