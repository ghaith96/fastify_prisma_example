import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

/**
 * @param {import('fastify').FastifyInstance} server 
 * @param {Object} options 
 */
const prismaPlugin = fp(async (server, options) => {
    const prisma = new PrismaClient({
        log: ['error', 'warn'],
    });

    await prisma.$connect();

    server
        .decorate('prisma', prisma)
        .addHook('onClose', async (server) => {
            await server.prisma.$disconnect();
        });
});

export default prismaPlugin;
