import User from '../models/user'
import { Service } from 'typedi';
import { Query } from 'mongoose';

@Service()
export default class UserService{
	async create( name: string, email: string, password: string ){
		const user = new User({ name, email, password})

		return user.save()
	}

	async update( id: string, name: string, email: string, password: string){
		//TODO
	}
}