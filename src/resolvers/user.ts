import { Query, Resolver } from 'type-graphql'


@Resolver()
export default class UserResolver {
    @Query(_ => String)
    async user() {
        return 'Hello word'
    }
}