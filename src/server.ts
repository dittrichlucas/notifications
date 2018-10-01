import { ApolloServer } from 'apollo-server'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import UserResolver from './resolvers/user'

async function run() {
    const schema = await buildSchema({ resolvers: [ UserResolver] })
    const server = new ApolloServer({ schema })

    return server.listen(3000)
}

run().then(() => {
    console.log('Servidor GraphQL rodando...')
}).catch(() => {
    console.log('Não foi possível conectar-se ao servidor...')
})
