import prisma from '../config/prisma.js';

export async function procesarPedido(data){

    return await prisma.$transaction(async (tx) => {
        
        const nuevoPedido = await tx.pedido.create({
            data: {
                mesa: data.mesa,
                tipo_pedido: data.tipo_pedido,
                status: "pendiente",
                status_pago: data.status_pago,
                clienteId: Number(data.clienteId),
                cajaId: Number(data.cajaId)
            }
        });

    


        const detalles = data.platillo.map(p => {
            
            return tx.detalle_pedido.create({
                data: {
                    nombre_platillo: p.nombre_platillo,
                    precio: Number(p.precio),
                    status: 'Preparacion',
                    platilloId: Number(p.id),
                    pedidoId: nuevoPedido.id,
                    cocinaId: Number(data.cocinaId)
                }
            });

        });

        await Promise.all(detalles);

        if (data.pago){
            await tx.pago.create({
                data: {
                    monto: Number(data.pago.monto),
                    metodo_pago: data.pago.metodo,
                    referencia: data.pago.referencia,
                    pedidoId: nuevoPedido.id
                }
            });
        }

        return nuevoPedido;

    });
}