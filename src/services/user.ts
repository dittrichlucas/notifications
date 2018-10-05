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
		const user = await User.findOne({email})

		if (!user || !await bcrypt.compare(password, user.password)){
			throw new Error('User not authenticated!')
		}
		const token = crypto.randomBytes(32).toString('hex')
		const session = { token }

		user.sessions.push(session)
	
		await user.save()		

		return session

	}

	async update( id: string, name: string, email: string, password: string){
		//TODO
	}
}