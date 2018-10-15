import { Query, Resolver, Arg, Mutation, ObjectType, Field, Ctx, Authorized } from 'type-graphql'
import { Inject } from 'typedi'
import NotificationService from '../services/notification';

@ObjectType()
class Session {
	@Field() token: string
}


@Resolver()
export default class NotificationResolver {

	@Inject()
	private readonly service: NotificationService

    @Mutation(_ => Notification)
    async createNotification(
		@Arg('message') message: string,
		@Arg('date') date: Date,
		@Ctx() context: any
	) {
		return this.service.create( message, date, context.user.id )
	}

}