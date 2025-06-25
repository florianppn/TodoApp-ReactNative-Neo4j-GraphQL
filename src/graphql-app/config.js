import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({path:__dirname + '/.env'});

export const typeDefs = fs.readFileSync(join(__dirname, 'schema.graphql'), 'utf-8');

export const NEO4J_URI = process.env.NEO4J_URI
export const NEO4J_USER = process.env.NEO4J_USER
export const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD
export const JWT_KEY = process.env.JWT_KEY