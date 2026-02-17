import prisma from '../config/prisma.js';

export async function all() {
    return await prisma.usuario.findMany();
}

export async function one(id) {
    return await prisma.usuario.findUnique({
        where: { id: Number(id) } // Number es un poco más limpio que parseInt
    });
}

export async function save(data) {
    // Extraemos el id y el resto de los campos por separado
    const { id, ...rest } = data;

    if (id) {
        return await prisma.usuario.update({
            where: { id: Number(id) },
            data: rest 
        });
    } else {
        return await prisma.usuario.create({
            data: rest
        });
    }
}

export async function delet(id) {
    return await prisma.usuario.delete({
        where: { id: Number(id) }
    });
}

