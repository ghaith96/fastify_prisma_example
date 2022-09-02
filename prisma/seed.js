import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const seedData = [
    { name: 'owl' },
    { name: 'dog' },
    { name: 'cat' },
    { name: 'ant' },
];


async function main() {
    console.log('Seeding...');

    for (const a of seedData) {
        const animal = await prisma.animal.create({ data: a });
        console.log(`Created animal with Id: ${animal.id}`);
    }

    console.log('Finished seeding.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.log(err);
        await prisma.$disconnect();
        process.exit(1);
    });
