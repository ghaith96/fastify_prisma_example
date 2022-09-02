/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {Object} optinos 
 */
async function routes(fastify, optinos) {
    fastify.get('/animals', async (req, res) => {
        return fastify.prisma.animal.findMany()
    });

    fastify.get('/animals/:animalId', async (req, res) => {
        const { animalId } = req.params;
        return fastify.prisma.animal.findUnique({ where: { id: Number(animalId) } })
    });

    const postBodyJsonSchema = {
        type: 'object',
        required: ['animal'],
        properties: {
            animal: { type: 'string' },
        }
    };

    fastify.post('/animals', { body: postBodyJsonSchema }, async (req, res) => {
        const { animal } = req.body;
        return fastify.prisma.animal.create({ data: { name: animal } });
    });
}

export default routes;
