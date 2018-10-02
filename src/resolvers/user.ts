import { Query, Resolver, Arg, Mutation, ObjectType, Field } from 'type-graphql'
import { Inject } from 'typedi'
import UserService from '../services/user';

@ObjectType()
class User {
	@Field() id: string
	@Field() name: string
	@Field() email: string
}

@Resolver()
export default class UserResolver {

	@Inject()
	private readonly service: UserService

    @Mutation(_ => User)
    async createUser(
		@Arg('name') name: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	) {

		return this.service.create( name, email, password )
    }
}