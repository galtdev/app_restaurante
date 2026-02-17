
import prisma from '../config/prisma.js';


export async function all(){
    return await prisma.platillo.findMany({
        orderBy: {
            nombre_platillo: 'asc'
        }
    });
}

export async function upsertPlatillo(data) {
    
    const platillo = {
        nombre_platillo: data.nombre_platillo,
        precio: Number(data.precio),
        contenido: data.contenido,
        status: data.status ?? 1
    }

    const idSearch = data.id ? Number(data.id) : 0;

    return await prisma.platillo.upsert({
        where: { id: idSearch },
        update: platillo,
        create: platillo
    });

}


export async function delet(table, data){

    const idBorrar = Number(id);

    return await prisma.platillo.delete({
        where: { id: idBorrar }
    })
    
}

