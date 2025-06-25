import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Neo4jGraphQL } from '@neo4j/graphql';
import jwt from 'jsonwebtoken';

import driver,{ initializeDatabaseConstraints, closeNeo4jDriver } from './db.js';
import { JWT_KEY, typeDefs } from './config.js';
import resolvers from './resolvers.js';

const neoSchema = new Neo4jGraphQL({
    typeDefs,
    driver,
    resolvers: resolvers,
    features: {
        authorization: {
            key: JWT_KEY,
        },
    },
});

async function main() {
    try {
        await initializeDatabaseConstraints();
        const schema = await neoSchema.getSchema();
        const server = new ApolloServer({ schema });

        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000},
            context: async ({ req }) => ({
                token: req.headers.authorization,
                driver: driver,
            }),
        });
        console.log(`🚀 GraphQL server ready at: ${url}`);
    } catch (err) {
        closeNeo4jDriver();
        console.error(err.stack);
        process.exit(1);
    }
}

await main();