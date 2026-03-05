import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';

export async function all() {
    return await prisma.usuario.findMany({
        include: {
            auth: true
        }
    });
}

export async function one(id) {
    return await prisma.usuario.findUnique({
        where: { id: Number(id) } 
    });
}



export async function save(data, authData) {
    
    const { id, ...rest } = data;

    if (id) {
        return await prisma.usuario.update({
            where: { id: Number(id) },
            data: rest 
        });
    } 


    return await prisma.$transaction(async (tx) => {

        let passwordHasheada = null;
        if (authData && authData.password) {
            passwordHasheada = await bcrypt.hash(authData.password.toString(), 10);
        }

        const newUser = await tx.usuario.create({
            data: {
                ...rest,
                auth: authData ? {
                    create: {
                        correo: authData.correo,
                        password: passwordHasheada,
                        rol: authData.rol
                    }
                } : undefined
            }
        });

        if (authData?.rol === 'cocina'){
            await tx.cocina.create({
                data: {usuarioId : newUser.id}
            });

        } else if (authData?.rol === 'caja'){
            await tx.caja.create({
                data: {usuarioId: newUser.id}
            });
        }
        return newUser;
    });
}


export async function delet(id) {
    return await prisma.usuario.delete({
        where: { id: Number(id) }
    });
}

