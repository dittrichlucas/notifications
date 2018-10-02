import { ApolloServer } from 'apollo-server'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import UserResolver from './resolvers/user'

async function server() {
    const schema = await buildSchema({ resolvers: [ UserResolver] })
    const server = new ApolloServer({ schema })

    return server.listen(3000)
}

server().then(() => {
    console.log('Servidor GraphQL rodando...')
}).catch(() => {
    console.log('Não foi possível conectar-se ao servidor...')
})
