import { ApolloServer } from 'apollo-server'
import 'reflect-metadata'
import dbConnection from './database'
import { buildSchema, useContainer } from 'type-graphql'
import UserResolver from './resolvers/user'
import { Container } from 'typedi';

useContainer(Container)

async function server() {
    const schema = await buildSchema({ resolvers: [ UserResolver] })
    const server = new ApolloServer({ schema })

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
