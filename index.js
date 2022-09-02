import Fastify from 'fastify';
import firstRoute from './src/first-route.js';
import prismaPlugin from './src/prisma-plugin.js';

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = new Fastify({
    logger: true,
});

fastify.register(prismaPlugin);
fastify.register(firstRoute);

const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT ?? 3000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();
