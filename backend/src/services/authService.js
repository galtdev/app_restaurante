import prisma from '../config/prisma.js';

export async function query(consulta) {
    try {
        return await prisma.auth.findFirst({ where: consulta });       
    } catch (error) {
        console.error("Error en authService query:", error);
        return null; 
    }
}

// NUEVA: Para guardar específicamente en la tabla Auth
export async function saveAuth(data) {
    return await prisma.auth.upsert({
        where: { id: Number(data.id) },
        update: {
            correo: data.correo,
            password: data.password,
            rol: data.rol || 'admin'
        },
        create: {
            id: Number(data.id),
            correo: data.correo,
            password: data.password,
            rol: data.rol || 'admin'
        }
    });
}