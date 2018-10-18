import { Query, Resolver, Arg, Mutation, ObjectType, Field, Ctx, Authorized } from 'type-graphql'
import { Inject } from 'typedi'
import NotificationService from '../services/notification';

@ObjectType()
class Notification {
	@Field() id: string
	@Field() message: string
	@Field() date: Date
}


@Resolver()
export default class NotificationResolver {

	@Inject()
	private readonly service: NotificationService

	@Authorized()
    @Mutation(_ => Notification)
    async createNotification(
		@Arg('message') message: string,
		@Arg('date') date: Date,
		@Ctx() context: any
	){
		return this.service.create( message, date, context.user.id )
	}

	@Authorized()
	@Mutation(_ => Notification)
	async updateNotification(
		@Arg('id') id: string,
		@Arg('message') message: string,
		@Arg('date') date: Date,
		@Ctx() context: any
	){
		return this.service.update( id, message, date, context.user.id )
	}
}