import { PrismaClient } from "@prisma/client";

import { properties } from "./properties";

const prisma = new PrismaClient();

async function main() {
    for (let property of properties) {
        await prisma.property.create({
            data: property,
        });
    }
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
