import neo4j from 'neo4j-driver';
import { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } from './config.js';

const driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
);

export async function initializeDatabaseConstraints() {
    const session = driver.session();
    try {
        await session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE");
        await session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (u:User) REQUIRE u.username IS UNIQUE");
        await session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (t:Todo) REQUIRE t.id IS UNIQUE");
        await session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (tl:TodoList) REQUIRE tl.id IS UNIQUE");
    } catch (err) {
        process.exit(1);
    } finally {
        session.close();
    }
}

export function closeNeo4jDriver() {
    driver.close();
}

export default driver;