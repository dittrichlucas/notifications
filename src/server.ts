import { ApolloServer } from 'apollo-server'
import User from './models/user'
import 'reflect-metadata'
import dbConnection from './database'
import { buildSchema, useContainer } from 'type-graphql'
import UserResolver from './resolvers/user'
import { Container } from 'typedi'
import NotificationResolver from './resolvers/notification'

useContainer(Container)

async function context(ctx: any) {
    const token = ctx.req.headers.authorization || ''

    const user = await User.findOne({ 'sessions.token': { $eq: token } })

    return { ...ctx, user }
}

function authChecker(resolverData: any) {
    return resolverData.context.user !== null
}

async function server() {
    const schema = await buildSchema({ resolvers: [UserResolver, NotificationResolver], authChecker })
    const server = new ApolloServer({ schema, context })

    return server.listen(3001)
}
dbConnection.then(() => {
    return server()
}).then(() => {
    console.log('Servidor GraphQL rodando...')
}).catch(err => {
    console.log(err)
    console.log('Não foi possível subir o servidor...')
})
