import { Query, Resolver, Arg, Mutation, ObjectType, Field, Ctx, Authorized } from 'type-graphql'
import { Inject } from 'typedi'
import UserService from '../services/user'

@ObjectType()
class User {
	@Field() id: string
	@Field() name: string
	@Field() email: string
}

@ObjectType()
class Session {
	@Field() token: string
}


@Resolver()
export default class UserResolver {

	@Inject()
	private readonly service: UserService

	@Query()
	status(): string {
		return 'Está rodando'
	}

    @Mutation(_ => User)
    async createUser(
		@Arg('name') name: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	) {
		return this.service.create( name, email, password )
	}

	@Mutation(_=> Session)
	async createSession(
		@Arg('email') email: string,
		@Arg('password') password: string
	) {
		return this.service.createSession( email, password )
	}

	@Authorized()
	@Mutation(_ => User)
	async updateUser(
		@Ctx() context: any,
		@Arg('name') name: string,
		@Arg('password') password: string
	) {
		return this.service.update( context.user.id, name, password )
	}

	@Authorized()
	@Mutation(_ => Boolean)
	async removeUser(
		@Ctx() context: any,
	) {
		await this.service.remove( context.user.id,)

		return true
	}

}
