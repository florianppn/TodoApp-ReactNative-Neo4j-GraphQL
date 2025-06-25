import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { JWT_KEY } from './config.js';

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const resolvers = {
    Mutation: {
        signIn: async (root, args, context) => {
            const session = context.driver.session();
            try {
                const res = await session.run(
                    `MATCH (user:User {
                        username: $username
                    })
                    RETURN user
                    `,
                    {username: args.username}
                );
                if (!res.records[0]) {
                    throw new Error('Invalid username or password.');
                }
                const user = res.records[0].get('user');
                const passwordMatch = await bcrypt.compare(args.password, user.properties.password);
                if (!passwordMatch) {
                    throw new Error('Invalid username or password.');
                }
                const token = jwt.sign({sub: user.properties.id, roles: user.properties.roles}, JWT_KEY, {expiresIn: '1h'});
                return token;
            } catch (err) {
                throw new Error('Invalid username or password.');
            } finally {
                session.close();
            }
        },
        signUp: async (root, args, context) => {
            const session = context.driver.session();
            try {
                const newId = uuidv4();
                const hashedPassword = await hashPassword(args.password);
                const res = await session.run(
                    `CREATE (user:User {
                        id: $id,
                        username: $username,
                        password: $password,
                        roles: $roles
                    })
                    RETURN user
                    `,
                    {
                        id: newId,
                        username: args.username,
                        password: hashedPassword,
                        roles: ["user"]}
                );
                const user = res.records[0].get('user');
                const token = jwt.sign({sub: user.properties.id, roles: user.properties.roles}, JWT_KEY, {expiresIn: '1h'});
                return token;
            } catch (err) {
                throw new Error('Registration failed.');
            } finally {
                session.close();
            }
        },
    }
}

export default resolvers;